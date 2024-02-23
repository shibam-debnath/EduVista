import React, { useState } from 'react';
import controlPanel from '../controlPanel/controlPanel';
import styles from './pdfReader.module.scss'

const pdfReader = ( {pdfUrl} ) => {

    console.log("pdf Url inside pdfReader")
    console.log(pdfUrl)

    return (
        <div>
            <div className={styles.viewer_container}>
                <iframe
                    className={styles.frame}
                    title="PDF-Viewer"
                    src={pdfUrl}
                ></iframe>
            </div>
        </div>
    );
};

export default pdfReader;