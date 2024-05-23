import React, { useState } from 'react';
import axios from 'axios';

const PresentationViewer = () => {
  const [file, setFile] = useState(null);
  const [pdfUrl, setPdfUrl] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post('http://127.0.0.1:5000/upload', formData, {
        responseType: 'blob' // Force to receive data in a Blob Format
      });

      // Create a Blob from the PDF Stream
      const pdfBlob = new Blob([response.data], { type: 'application/pdf' });

      // Build a URL from the blob
      const fileURL = URL.createObjectURL(pdfBlob);

      console.log("PDF url")
      console.log(fileURL)
      setPdfUrl(fileURL);

    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleSubmit}>Upload</button>
      {pdfUrl && (
        <iframe src={pdfUrl} style={{ width: '100%', height: '800px' }} />
      )}
    </div>
  );
};

export default PresentationViewer;
