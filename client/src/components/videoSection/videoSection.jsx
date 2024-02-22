import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import styles from './videoSection.module.scss';
import ReactViewer from 'react-viewer';
import PDFReader from "../../components/pdfReader/pdfReader";

const VideoSection = ({ headings, contents, all_slide_contents, avatar, file}) => {
  
  const videoId = 'NzZXz3fJf6o';
  const [player, setPlayer] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioData, setAudioData] = useState(null);
  const [loading, setLoading] = useState(false);
  const audioRef = useRef(new Audio());

  const viewerRef = useRef(null);

  const [currentFile, setCurrentFile] = useState(file); // Initial file from props

  useEffect(() => {

    console.log("fileeeee")
    if(file){
      console.log('File hain')
    }
    setCurrentFile(file); // Update state when props change
  }, [file]);


  console.log("model")
  console.log(avatar)
  console.log(file)

  // function that gets the audio from backend
  const handleGenerateAudio = async () => {
    try {

      setLoading(true);
      console.log("Post request to generate audio using the script");
      const response = await axios.post(
        'http://127.0.0.1:5000/api/generate_audio',
        {
          text: all_slide_contents,
        },
        {
          responseType: 'blob',  // Tell Axios to expect a binary response
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log("Generating audio using the script");
      // Read the binary response and store it in the state
      const reader = new FileReader();
      reader.onloadend = () => {
        setAudioData(reader.result);
        setLoading(false);
      };
      reader.readAsDataURL(response.data);

    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };



  const onReady = (event) => {
    setPlayer(event.target);
  };

  const toggleVideo = () => {

    //* MP4 video play pause 
    const teacherVideo = document.getElementById('teacherVideo');
    if (teacherVideo) {
      if (teacherVideo.paused) {
        teacherVideo.play();
        setIsPlaying(true);
        audioRef.current.play(); // Start playing the audio when the video starts
      } else {
        teacherVideo.pause();
        audioRef.current.pause(); // Pause the audio when the video is paused
        setIsPlaying(false);
      }
    }
  };

  const handleVideoEnded = () => {
    // Restart the HTML5 video when it ends
    const teacherVideo = document.getElementById('teacherVideo');
    if (teacherVideo) {
      teacherVideo.currentTime = 0; // Reset the video to the beginning
      teacherVideo.play();
    }
  };


  useEffect(() => {
    // Set up an event listener to stop the audio when the component unmounts
    return () => {
      setIsPlaying(false);
    };
  }, []);


  return (
    <div className={styles.video_section}>
      <div className={styles.presentation}>
        <div className={styles.video_container}>
          <video 
            controls 
            src="/assets/AIteacher.mp4" 
            width="640px" 
            height="360px"
            type="video/mp4"
            id="teacherVideo"
            onEnded={handleVideoEnded}
          >
            Your browser does not support the video tag.
          </video>
        </div>
        <div>
          <ReactViewer
            fileType={['ppt', 'pptx']}
            useZoom={true}
            useThumbnails={true}
            showToolbar={true}
            showDownloadButton={true}
            file={currentFile} // Pass state value as file
          />
          <PDFReader/>
        </div>
      </div>


      <div className={styles.button_section}>

        {
            audioData && 
          <button className={styles.button} disabled={loading} onClick={toggleVideo}>
            {isPlaying ? 'Pause Presentation' : 'Start Presentation'}
          </button>

        }
          
          {
          !audioData && 
          <button className={styles.button} onClick={handleGenerateAudio} disabled={loading || isPlaying}>
            Generate Audio
          </button>
          }
          

          {loading && <p>Generating.....      please wait a bit !</p>}
          
          {audioData && (
            <div>
              <div className={styles.button_section}>
                <h2>Generated Audio</h2>
                <audio ref={audioRef} controls>
                  <source src={audioData} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            </div>
          )}
      </div>

      
    </div>
  );
};

export default VideoSection;
