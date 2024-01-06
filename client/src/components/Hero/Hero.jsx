import React from "react";
import styles from './Hero.module.scss'
import Typewriter from "typewriter-effect";
import heroImage from './aiImage.jpeg';

const Hero = () => {
  return (
    <div id="Hero">
      <section >
        <div className={styles.A}>
          <div className="container mx-auto xl:px-32">
            <div className={styles.hero}>
              <div className={styles.heroTextDiv}>
                <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold tracking-tight text-black mt-16 mb-16">
                  Let's make learning<br />

                  {/* <span className="text-primary">among</span> */}
                  <span className="text-primary">
                    <Typewriter
                      options={{
                        autoStart: true,
                        loop: true,
                        delay: 100,
                        strings: [
                          "fun",
                          "exciting",
                          "enjoyable",
                          "personalized"
                        ],
                      }} />
                  </span>
                  <span>using generative AI</span>
                </h1>

                <a
                  href="/upload"
                  className={styles.button1}
                >
                  Get started
                </a>
              </div>
              <div className={styles.heroDiv}>
                <img
                  className={styles.heroImage}
                  src={heroImage}
                  alt="hau Logo"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
