import os
import io
import base64
from gtts import gTTS
from io import BytesIO
from pptx import Presentation
from dotenv import load_dotenv
import google.generativeai as genai

from flask_bcrypt import Bcrypt
from flask_cors import CORS, cross_origin
from flask import Flask, request, jsonify, send_file, request, make_response
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, unset_jwt_cookies, jwt_required, JWTManager

from models import db, User

# Create a Flask app
app = Flask(__name__)
CORS(app)
load_dotenv()

app.config['SECRET_KEY'] = 'h4saki-secret-key'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///flaskdb.db'

SQLALCHEMY_TRACK_MODIFICATIONS = False
SQLALCHEMY_ECHO = True


jwt = JWTManager(app)
bcrypt = Bcrypt(app)   
db.init_app(app) 

with app.app_context():
    db.create_all()



GOOGLE_API_KEY = "AIzaSyAa7UYKqvP_17wdthjVwgz4RPbJIRnro8M"
genai.configure(api_key = GOOGLE_API_KEY)
model = genai.GenerativeModel('gemini-pro')





@app.route('/logintoken', methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    user = User.query.filter_by(email=email).first()

    if user is None:
        return jsonify({"error": "Wrong email or passwords"}), 401
    
    # compare passwords
    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Unauthorized"}), 401

    access_token = create_access_token(identity=email)
    return jsonify({
        "email": email,
        "access_token": access_token
    })



@app.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response



@app.route('/signup', methods=["POST"])
def signup():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    user_exists = User.query.filter_by(email=email).first() is not None
   
    if user_exists:
        return jsonify({"error": "Email already exists"}), 409
    
    hashed_password = bcrypt.generate_password_hash(password)
    new_user = User(name="Shibam Debnath", email=email, password=hashed_password, about="sample about me")
    db.session.add(new_user)
    db.session.commit()
   
    return jsonify({
        "id": new_user.id,
        "email": new_user.email,
    })


@app.route("/")
@cross_origin(supports_credentials=True)
def home():
    return jsonify("Hello Shibam! Flask Server is running properly")


# Define the directory where you want to store uploaded PPTX files
UPLOAD_FOLDER = 'static/pptx_files'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# function that extracts file information from the ppt using python-pptx
def read_ppt(file_path):

    presentation = Presentation(file_path)

    slide_headings = {}
    slide_contents = {}
    all_slide_contents = ""

    for slide_number, slide in enumerate(presentation.slides):
        heading = f"Slide {slide_number + 1}"

        text = ""
        heading_text = ""

        for shape_number, shape in enumerate(slide.shapes):
            if hasattr(shape, "text"):
                if heading_text == "" and shape.text.strip() != "":
                    heading_text = shape.text.strip()
                else:
                    text += shape.text + " "
                    all_slide_contents += shape.text + " "

        slide_headings[heading] = heading_text
        slide_contents[heading] = text.strip()


    return slide_headings, slide_contents, all_slide_contents.strip()



@app.route('/upload', methods=['POST', "OPTIONS"])
def upload_file():
    pass


# API 0 : model 0 ( base model ) : reads the ppt 
@app.route("/api/generate_content", methods=["POST", "OPTIONS"])
def generate_content():
    if request.method == "OPTIONS":
        return _build_cors_preflight_response()
    if request.method == "POST":
        if 'file' not in request.files:
            return jsonify({'error': 'No file part'})

        file = request.files['file']
        avatar = request.form.get('avatar')

        if file and file.filename.endswith('.pptx'):
            
            os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

            file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
            file.save(file_path)

            headings, contents, all_slide_contents = read_ppt(file_path)
            all_slide_contents = all_slide_contents.replace('*', '').strip()
            
            print(f"All slide contents : {all_slide_contents}")

            return jsonify({
                            
                'message': 'Content generated Successfully', 
                'headings': headings, 
                'contents': contents,
                'all_slide_contents': all_slide_contents, 
                'avatar': avatar

            })

        else: 
            return jsonify({'error': 'Invalid file'})
    else:
        raise RuntimeError("Weird - don't know how to handle method {}".format(request.method))




@app.route('/api/generate_content_gemini', methods=["POST", "OPTIONS"])
def generate_content_gemini():

    if request.method == "OPTIONS":
        return _build_cors_preflight_response()

    if request.method == "POST":

        if 'file' not in request.files:
            return jsonify({'error': 'No file part'})

        file = request.files['file']
        avatar = request.form.get('avatar')

        if file and file.filename.endswith('.pptx'):
            
            os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

            file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
            file.save(file_path)

            headings, contents, all_slide_contents = read_ppt(file_path)

            prompt = f"Hey gemini I am giving you the contens of a ppt and you need to Generate a content/script from the prospective of a teacher that descripes the ppt contents within 200 words. Here is the ppt content : {all_slide_contents}"
            res = model.generate_content(prompt)
            res = res.text
            formatted_response = res.replace('*', '').strip()

            return jsonify({
                            
                'message': 'Content generated Successfully', 
                'headings': headings, 
                'contents': contents,
                'all_slide_contents': formatted_response, 
                'avatar': avatar
                
            })


    else:
        raise RuntimeError("Weird - don't know how to handle method {}".format(request.method))


# API 4 : generate text to audio
@app.route("/api/generate_audio", methods=["POST", "OPTIONS"])
def generate_audio():
    if request.method == "OPTIONS":
        return _build_cors_preflight_response()

    if request.method == "POST":
        data = request.get_json()
        text = data['text']
        voice = data.get('voice', 'en')  # default to English

        tts = gTTS(text=text, lang=voice, slow=False)
        audio_file = io.BytesIO()
        tts.write_to_fp(audio_file)

        # Reset file pointer to the beginning
        audio_file.seek(0)

        return send_file(audio_file, mimetype='audio/mpeg', as_attachment=True, download_name='generated_audio.mp3')
    else:
        raise RuntimeError("Weird - don't know how to handle method {}".format(request.method))



# handling CORS preflight 
def _build_cors_preflight_response():
    response = make_response()
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add('Access-Control-Allow-Headers', "*")
    response.headers.add('Access-Control-Allow-Methods', "*")
    return response


# main 
if __name__ == "__main__":
    app.run(debug=True)