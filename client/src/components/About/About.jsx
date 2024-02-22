import React, {useState} from 'react'
import styles from '../About/About.module.scss'
const About = () => {

    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAnswer = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const faqData = [
        {
            question: 'What is EduVista?',
            answer:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla mattis vulputate nulla, a fermentum est suscipit eget. Pellentesque congue lacinia nisi, a dignissim magna facilisis non. Nullam non nibh tellus. Suspendisse at nisi eu sem posuere rhoncus. Cras nisi lectus, fermentum vitae odio ac, ultricies lobortis justo. Praesent pellentesque id risus id vestibulum. Morbi tellus nisl, sollicitudin ac convallis vitae, tempor sed ligula. Proin nulla orci, sollicitudin a accumsan non, volutpat non elit.',
        },
        {
            question: 'How to use Eduvista ?',
            answer:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla mattis vulputate nulla, a fermentum est suscipit eget. Pellentesque congue lacinia nisi, a dignissim magna facilisis non. Nullam non nibh tellus. Suspendisse at nisi eu sem posuere rhoncus. Cras nisi lectus, fermentum vitae odio ac, ultricies lobortis justo. Praesent pellentesque id risus id vestibulum. Morbi tellus nisl, sollicitudin ac convallis vitae, tempor sed ligula. Proin nulla orci, sollicitudin a accumsan non, volutpat non elit.",
        },
        {
            question: 'What kind of files can I upload ?',
            answer:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla mattis vulputate nulla, a fermentum est suscipit eget. Pellentesque congue lacinia nisi, a dignissim magna facilisis non. Nullam non nibh tellus. Suspendisse at nisi eu sem posuere rhoncus. Cras nisi lectus, fermentum vitae odio ac, ultricies lobortis justo. Praesent pellentesque id risus id vestibulum. Morbi tellus nisl, sollicitudin ac convallis vitae, tempor sed ligula. Proin nulla orci, sollicitudin a accumsan non, volutpat non elit.',
        },
        {
            question: 'How much time it may take to prepare the script ?',
            answer:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla mattis vulputate nulla, a fermentum est suscipit eget. Pellentesque congue lacinia nisi, a dignissim magna facilisis non. Nullam non nibh tellus. Suspendisse at nisi eu sem posuere rhoncus. Cras nisi lectus, fermentum vitae odio ac, ultricies lobortis justo. Praesent pellentesque id risus id vestibulum. Morbi tellus nisl, sollicitudin ac convallis vitae, tempor sed ligula. Proin nulla orci, sollicitudin a accumsan non, volutpat non elit.',
        },
    ];

    return (
        <div className={styles.container}>
            {faqData.map((faq, index) => (
                <div className={styles.faqSection} key={index}>
                    <div className={styles.question} onClick={() => toggleAnswer(index)}>
                        {faq.question}
                        <span className={styles.arrow}>{activeIndex === index ? '▲' : '▼'}</span>
                    </div>
                    {activeIndex === index && (
                        <div className={styles.answer}>{faq.answer}</div>
                    )}
                </div>
            ))}
        </div>
    );

}

export default About