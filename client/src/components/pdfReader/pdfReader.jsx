import React, { useState } from 'react';
import controlPanel from '../controlPanel/controlPanel';
import styles from './pdfReader.module.scss'

const pdfReader = () => {
    const ppt_path = "/assets/sample2.pdf";
    return (
        <div>
            <div className={styles.viewer_container}>
                <iframe
                    className={styles.frame}
                    title="PDF-Viewer"
                    src={ppt_path}
                ></iframe>
            </div>
        </div>
    );
};

export default pdfReader;