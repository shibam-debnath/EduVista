import axios from "axios";
import Rescrollact, { useEffect, useState } from "react";
import { Link, animateScroll as scroll } from "react-scroll";
import { useLocation } from "react-router-dom";
import {useNavigate} from "react-router-dom";
import styles from './Navbar.module.scss'

const Navbar = (props) => {

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


  const navigate = useNavigate();

     
  function handle_logout() {

    console.log("called logout")
    const token = localStorage.getItem('token');
    console.log(token)

      axios({
          method: "POST",
          url:"http://127.0.0.1:5000/logout",
      })
      .then((response) => {
          props.token()
          console.log('logout successfull')
          localStorage.removeItem('email')
          localStorage.removeItem('token')

          navigate("/login");
      }).catch((error) => {
          if (error.response) {
              console.log(error.response)
              console.log(error.response.status)
              console.log(error.response.headers)
          }
      })
  }


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
              <li>
                  <button
                    className={styles.button}
                    onClick={handle_logout}
                  >
                    logout
                  </button>
                </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
