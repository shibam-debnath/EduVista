# Project Setup Guide

## Prerequisites

1. **Node.js installed on your system** 
   
    - Version: NODE.js 18.17.1
2. **Python installed on your system** 
   - Version: Python 3.11.1 (IMPORTANT)

## Installation Steps

### 1. Setup Frontend:

1. Navigate to the frontend directory:
    ```bash
    cd frontend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Run the development server:
    ```bash
    npm run dev
    ```

    Your React app should now be running at [http://localhost:5173](http://localhost:5173)

### 2. Setup Backend:

1. Navigate to the backend directory:
    ```bash
    cd ../backend
    ```

2. Create a virtual environment (optional but recommended):
    ```bash
    python -m venv venv
    ```

3. Activate the virtual environment:

    On Windows:
    ```bash
    venv\Scripts\activate
    ```

    On macOS and Linux:
    ```bash
    source venv/bin/activate
    ```

4. Install Flask and other dependencies:
    ```bash
    pip install -r requirements.txt
    pip install -r requirements2.txt
    ```

5. Set up environment variables (if required) in a `.env` file.

6. Note: We are using Wav2Lip model implementation from here: [https://github.com/Rudrabha/Wav2Lip](https://github.com/Rudrabha/Wav2Lip)
    - Please see the README file of this project if you are integrating the model for the first time.

7. Run the Flask development server:
    ```bash
    python app.py
    ```


    Your Flask backend should now be running at [http://localhost:5000](http://localhost:5000)