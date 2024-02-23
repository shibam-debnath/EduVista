/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react";
import VideoSection from "../../components/videoSection/videoSection";
import PDFReader from "../../components/pdfReader/pdfReader";
import styles from './presentation.module.scss'
import { useLocation, useParams } from 'react-router-dom';


const presentation = () =>{

  const location = useLocation();
  const stateData = location.state;
  const model = stateData.model;
  const file = stateData.file;
  const headings = stateData.headings;
  const all_slide_contents = stateData.all_slide_contents;
  const pdfUrl = stateData.pdfUrl;
  
  // Access state data
  console.log("printing props data inside /presentation route");
  console.log(stateData.all_slide_contents);

  return (
    <div className={styles.viewerContainer}>
      <div className={styles.container}>
        <h1 className={styles.header}> PPT Presentation using GenAI </h1>
      </div>
      <div className={styles.presentation}>
        <VideoSection 
          headings={headings} 
          contents={stateData.contents} 
          all_slide_contents={all_slide_contents} 
          avatar={model}
          pdfUrl={pdfUrl} 
        />
      </div>  
    </div>
  );
}

export default presentation;