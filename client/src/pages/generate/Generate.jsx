import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Generate.module.scss'
import { Link } from 'react-router-dom';

const Generate = () => {
    const [voice, setVoice] = useState('default');
    const [audio, setAudio] = useState('');
    const [prompt, updatePrompt] = useState('')
    const [state, setstate] = useState({ advice: '', response: '', loading: false })

    
    console.log("URL : ")
    console.log("https://57c7-34-75-242-27.ngrok.io/generate_audio")
  
    const generateAudio = async () => {
      try {
        const response = await axios.post('https://57c7-34-75-242-27.ngrok.io/generate_audio', {
            prompt,
            voice,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
        });

        console.log(audio);
        console.log(voice);
        console.log(response.data);
  
        setAudio(response.data.audio);
      } catch (error) {
        console.error('Error generating audio:', error);
      }
    };
  
    return (
    //   <div>
    //     <textarea value={text} onChange={(e) => setText(e.target.value)} />
    //     <select value={voice} onChange={(e) => setVoice(e.target.value)}>
    //       <option value="default">Default</option>
    //       <option value="Amy">Amy</option>
    //     </select>
    //     <button onClick={generateAudio}>Generate Audio</button>
    //   </div>
        <div className={styles.prompt}>
            <div className={styles.prompt_container}>
                <div className={styles.spotlight__wrapper}>
                    <input
                        type="text"
                        className={styles.spotlight__input}
                        placeholder="Write down your prompt..."
                        onChange={(e) => updatePrompt(e.target.value)}
                        disabled={state.loading || state.response !== ''}
                        onKeyDown={(e) => sendPrompt(e)}
                    />
                    {
                        state.loading ?
                            <div className={styles.spotlight__answer}>
                                <span className={styles.loading}></span>
                                <span className={styles.loading}></span>
                                <span className={styles.loading}></span>
                            </div>
                            :
                            <div>Data</div>
                    }
                </div>
            </div>
            <div className={styles.voice_div}>
                <div>Choose Voice</div>
                <select className={styles.voice_choice} value={voice} onChange={(e) => setVoice(e.target.value)}>
                    <option value="default">Default</option>
                    <option value="Amy">Amy</option>
                </select>
            </div>
            <br />
            <button className={styles.transparent_button} state={{ prompt: state.response }} onClick={generateAudio}>Generate Audio</button>
            {audio && <audio controls src={`data:audio/wav;base64,${audio}`} />}
        </div>
    );
}

export default Generate