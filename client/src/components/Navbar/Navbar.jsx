import Rescrollact, { useEffect, useState } from "react";
import { Link, animateScroll as scroll } from "react-scroll";
import { useLocation } from "react-router-dom";

import styles from './Navbar.module.scss'

const Navbar = () => {

  const [navbar, setNavbar] = useState(false);
  const user = true;

  const location = useLocation();
  const help = location.state;

  const clickButton = () => {
    document.getElementById("contactUs").click();
  };
  useEffect(() => {
    if (help) {
      clickButton();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <nav className={styles.navbar_container}>
      <div className={styles.navbar_container2}>
        <div>
          <div className={styles.navbar}>
            <a href="/">
              <h1 className={styles.logo}>
                Edu<span className={styles.primary}>Vista</span>
              </h1>
            </a>
            <div className={styles.hamburger_display}>
              <button
                className={styles.button}
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? (
                  <img
                    h-2
                    src="./images/maki_cross.svg"
                    alt="hamburger-1"
                  ></img>
                ) : (
                  <img src="./images/hamburger.svg" alt="hamburger-2"></img>
                )}
              </button>
            </div>
          </div>
        </div>
        <div className={styles.hamburgerMenu}>
          <div>
            <ul>
              <li>
                <Link
                  activeClass="active"
                  to="Hero"
                  spy={true}
                  smooth={true}
                  offset={-50}
                  duration={500}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  activeClass="active"
                  to="Feature"
                  spy={true}
                  smooth={true}
                  offset={-50}
                  duration={500}
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  activeClass="active"
                  to="Contact"
                  spy={true}
                  smooth={true}
                  offset={-50}
                  duration={1000}
                  id="contactUs"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <a href="/team">Our Team</a>
              </li>
              {!user && (
                <li>
                  <a
                    href="/login"
                    className={styles.loginButton}
                  >
                    LogIn
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
