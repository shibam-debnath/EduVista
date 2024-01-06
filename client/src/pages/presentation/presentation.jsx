/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react";
import VideoSection from "../../components/videoSection/videoSection";
import PDFReader from "../../components/pdfReader/pdfReader";
import styles from './presentation.module.scss'
import { useLocation, useParams } from 'react-router-dom';


const presentation = () =>{

  const location = useLocation();
  const stateData = location.state;
  
  // Access state data
  console.log("id aana chahiye");
  console.log(stateData.all_slide_contents);

  return (
    <div className={styles.viewerContainer}>
      <h1 className={styles.header}> PPT Presentation using GenAI </h1>
      <div className={styles.presentation}>
        <VideoSection 
          headings={stateData.headings} 
          contents={stateData.contents} 
          all_slide_contents={stateData.all_slide_contents} 
          avatar={stateData.avatar} 
        />
      </div>  
    </div>
  );
}

export default presentation;