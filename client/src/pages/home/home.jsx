import React, { useState, useEffect, useRef } from 'react';
import styles from './home.module.scss'
// Sectionsimport TopNavbar from "../../components/TopNavBar/TopNavBar";
import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import About from "../../components/About/About";
import Contact from "../../components/Contact/Contact";
import Footer from "../../components/Footer/Footer";

function home(props) {
  
  return (
    <div className={styles.container}>
      < Navbar token={props.removeToken} />
      <Hero />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}

export default home;
