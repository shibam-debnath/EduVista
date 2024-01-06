import React, { useState, useEffect, useRef } from 'react';
import styles from './home.module.scss'
// Sectionsimport TopNavbar from "../../components/TopNavBar/TopNavBar";
import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import Contact from "../../components/Contact/Contact";
import Footer from "../../components/Footer/Footer";

function home() {
  return (
    <div className={styles.container}>
      <Navbar />
      <Hero />
      {/* <Contact /> */}
      {/* <Footer /> */}
    </div>
  );
}

export default home;
