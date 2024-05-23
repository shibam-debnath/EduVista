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
                'EduVista is an AI-driven educational platform aimed at revolutionizing traditional learning methods by automating PowerPoint explanations. It offers personalized, round-the-clock assistance to students, catering to diverse learning styles and addressing the needs of visually impaired individuals and those in economically challenged rural areas. By blending traditional teaching with modern AI technology, EduVista strives to make quality education accessible to a broader audience at almost no cost.',
        },
        {
            question: 'How to use Eduvista ?',
            answer:
                "Using EduVista is simple and user-friendly. Users can upload PowerPoint presentations containing educational content to the platform. The AI-driven system then extracts text from the presentations and generates clear and engaging content for presentation. Students can access this content anytime, anywhere, and receive auditory explanations in real-time, making learning more interactive and accessible.",
        },
        {
            question: 'What kind of files can I upload ?',
            answer:
                'EduVista allows users to upload PowerPoint files (.ppt or .pptx) containing educational content. These files can include text, images, and multimedia elements such as audio or video. The system extracts information from these presentations to generate clear and concise summaries, enhancing the learning experience for students.',
        },
        {
            question: 'How much time it may take to prepare the script ?',
            answer:
                "The time taken to prepare the script depends on the complexity and length of the PowerPoint presentation. EduVista's AI-driven system efficiently processes the content to extract key information and generate summaries, reducing the time required for manual scripting. However, factors such as the amount of text, number of images, and complexity of multimedia elements may influence the processing time. Generally, the system strives to provide quick and efficient script preparation to ensure timely delivery of educational content.",
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