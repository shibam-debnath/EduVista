import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from './Upload.module.scss'

const Upload = () => {

  const [file, setFile] = useState(null);
  const [model, setModel] = useState('');
  const [headings, setHeadings] = useState({});
  const [contents, setContents] = useState({});
  const [all_slide_contents, setAllSlideContents] = useState("");
  const navigateTo = useNavigate();

  const modelOptions = ['model 1', 'model 2'];

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };



  const handleModelChange = (event) => {
    setModel(event.target.value);
  };
  
  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (file && model) uploadPPT(file);
    else alert('Please select a file and an model before submitting.');
  };

  
  // function that uploads the ppt, stores and retreives the response from backend  
  const uploadPPT = async () => {
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('model', model);
    
    try {

      var MODEL_ENDPOINT = 'http://localhost:5000/upload';
      if(model == 'model 1'){
          MODEL_ENDPOINT = 'http://localhost:5000/api/generate_content';
      }
      else if(model == 'model 2'){
          MODEL_ENDPOINT = 'http://localhost:5000/api/generate_content_gemini';
      }


      console.log("Model ye hein")
      console.log(MODEL_ENDPOINT)


      const response = await fetch( MODEL_ENDPOINT , {
        method: 'POST',
        body: formData,
      });
      
      // Optionally, you can handle the server's response here
      const result = await response.json();
      
      console.log('Form submitted successfully to the server! and redirecting to presentation');
      console.log(result)
      // alert("Form submitted successfully to the server! and redirecting to presentation");
      
      // Check if the response contains headings and contents
      if (result.headings && result.contents && result.all_slide_contents) {
        navigateTo('/presentation', {
          state : {
            headings: result.headings,
            contents: result.contents,
            all_slide_contents: result.all_slide_contents,
            model: model,
            file:file
          }
        });
      }

    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className={styles.section}>
      <div className={styles.form_style}>
          <h1 >Upload your<span>PPT/PPTX</span></h1>
          <form onSubmit={handleFormSubmit}>
              <div className={styles.inner_wrap}>
                  <label>
                      <input className={styles.file_input} type="file" accept=".pdf, .ppt, .pptx" onChange={handleFileChange} />
                  </label>
                  <label>
                      Choose Model : 
                      <select value={model} onChange={handleModelChange}>
                      <option value=""> Select Model </option>
                      {modelOptions.map((option) => (
                          <option key={option} value={option}>
                          {option}
                          </option>
                      ))}
                      </select>
                  </label>
              </div>
              <button type="submit">Submit</button>
          </form>

          {Object.keys(headings).length > 0 && (
            <div>
              <h2>Extracted Headings</h2>
              <ul>
                {Object.entries(headings).map(([slide, heading]) => (
                  <li key={slide}>{`${slide}: ${heading}`}</li>
                ))}
              </ul>
            </div>
          )}
          {Object.keys(contents).length > 0 && (
            <div>
              <h2>Extracted Contents</h2>
              <ul>
                {Object.entries(contents).map(([slide, content]) => (
                  <li key={slide}>{`${slide}: ${content}`}</li>
                ))}
              </ul>
              <button onClick={handleGenerateAudio}>Generate Audio</button>
            </div>
          )}
      </div>
    </div>
  );
}

export default Upload