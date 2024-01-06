// import React, { useState, useEffect } from 'react';
// import { Presentation, Slide } from 'react-pptx';


// const PptxViewer = () => {
//   const [slideIndex, setSlideIndex] = useState(0);

//   const handleNextSlide = () => {
//     setSlideIndex((prevIndex) => prevIndex + 1);
//   };

//   const handlePreviousSlide = () => {
//     setSlideIndex((prevIndex) => Math.max(prevIndex - 1, 0));
//   };

//   useEffect(() => {
//     setSlideIndex(0); // Reset slide index when a new presentation is loaded
//   }, []); // Empty dependency array to run this effect only once

//     return (
//         <div>
//             <h1>PPTX Viewer</h1>
//             <button onClick={handlePreviousSlide} disabled={slideIndex === 0}>
//                 Previous Slide
//             </button>
//             <button onClick={handleNextSlide} disabled={slideIndex === slides.length - 1}>
//                 Next Slide
//             </button>
//             <Presentation>
//                 <Slide key={slideIndex} index={slideIndex}>
//                 Import the PPTX file dynamically
//                 {require(`../public/assets/sample.pptx`)}
//                 </Slide>
//             </Presentation>
//         </div>
//     );
// };

// export default PptxViewer;

// // import React from 'react'
// // import styles from './PptxViewer.module.scss'

// // const PptxViewer = () => {
// //   return (
// //     <div className={styles.css}>
// //         PptxViewer
// //         <h1>Hello</h1>
// //     </div>
// //   )
// // }

// // export default PptxViewer
import React, { useState } from 'react';
import { Presentation, Slide, Image } from 'react-pptx';

const PptxViewer = () => {
  const [slideIndex, setSlideIndex] = useState(0);
//   const slides = require('./sample.pptx').slides;

    const handleNextSlide = () => setSlideIndex(slideIndex + 1);
    const handlePreviousSlide = () => setSlideIndex(Math.max(slideIndex - 1, 0));
    const linkToPPTFile = "../public/assets/sample.pptx";
    return (
        <div>
            <iframe
                src={`https://view.officeapps.live.com/op/embed.aspx?src=${linkToPPTFile}`}
                width="100%"
                height="600px"
                frameBorder="0"
            >
            </iframe>
            {/* <Presentation> */}
                {/* <Slide key={slideIndex} index={slideIndex}> */}
                    {/* {require(`../public/assets/sample.pptx`).slides[slideIndex]} */}
                    {/* {(`../public/assets/sample.pptx`)[slideIndex].content} */}
                {/* </Slide> */}
                <button onClick={handlePreviousSlide}>Previous</button>
                <button onClick={handleNextSlide}>Next</button>
            {/* </Presentation> */}
        </div>
    );
};

export default PptxViewer;


