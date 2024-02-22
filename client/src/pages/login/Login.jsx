import React, { useState } from "react";
import axios from "axios";
import styles from "./Login.module.scss";
import { Link,useNavigate } from "react-router-dom";

const Login = (props) => {

    const navigate = useNavigate();
    const [error, setError] = useState("");

    const [loginForm, setloginForm] = useState({
        email: "",
        password: ""
    })

    function handleChange(event) { 
    const {value, name} = event.target
    setloginForm(prevNote => ({
        ...prevNote, [name]: value})
    )}


    const handlesubmit = ()=>{
      navigate('/signup');
    }


    function btnlogin(event) {
        axios({
            method: "POST",
            url:"http://127.0.0.1:5000/logintoken",
            data:{
              email: loginForm.email,
              password: loginForm.password
            }
        })
        .then((response) => {
            console.log(response)
            props.setToken(response.data.access_token)

            console.log("token mil gaya")
            console.log(response.data.access_token)


            alert("Successfully Login");
            localStorage.setItem('email', loginForm.email)
            navigate('/');
            
        }).catch((error) => {
            if (error.response) {
              console.log(error.response)
              console.log(error.response.status)
              console.log(error.response.headers)
                if (error.response.status === 401) {
                    alert("Invalid credentials");
                }
            }
        })
 
        setloginForm(({
            email: "",
            password: ""}))
 
        event.preventDefault()
    }

  return (
      <div>
        <div className={styles.login_container}>
          <div className={styles.login_form_container}>
            <div className={styles.left}>
              <form className={styles.form_container} onSubmit={btnlogin}>
                <h1>Login to Your Account</h1>
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={handleChange}
                  text={loginForm.email}
                  value={loginForm.email}
                  required
                  className={styles.input}
                />

                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={handleChange}
                  text={loginForm.password}
                  value={loginForm.password}
                  required
                  className={styles.input}
                />

                {error && <div className={styles.error_msg}>{error}</div>}
                <button type="submit" className={styles.green_btn}>
                  Sign In
                </button>
              </form>
            </div>
            <div className={styles.right}>
              <h1>New Here ?</h1>
              <Link to="/signup">
                  <button type="button" className={styles.white_btn} onClick={handlesubmit}>
                      Sign Up
                  </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Login