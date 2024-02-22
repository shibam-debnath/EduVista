
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Signup.module.scss";


const Signup = () => {

  const [data, setData] = useState({
		name: "",
		email: "",
		password: "",
	});


	const navigate = useNavigate();
  const [error, setError] = useState("");
  
  
  const handleChange = ({ currentTarget: input }) => {
    console.log("on change")
    console.log(data)
    setData({ ...data, [input.name]: input.value });
	};
  
  
  const handleSubmit = async (e) => {
    
    e.preventDefault();

    console.log("Form data")
    console.log(data)
    
    axios({
      method: "POST",
      url:"http://127.0.0.1:5000/signup",
      data:{
        name: data.name,
        email: data.email,
        password: data.password
      }
    })
    .then((response) => {
        console.log("Response data")
        console.log(response.data)
        alert("Successfull Signup");
        navigate('/login');
        
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

    e.preventDefault()
	};

  return (
		<div className={styles.signup_container}>
			<div className={styles.signup_form_container}>
				<div className={styles.left}>
					<h1>Welcome Back</h1>
					<Link to="/login">
						<button type="button" className={styles.white_btn}>
							Sign in
						</button>
					</Link>
				</div>
				<div className={styles.right}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Create Account</h1>
						<input
							type="text"
							placeholder="Name"
							name="name"
							onChange={handleChange}
							value={data.name}
							required
							className={styles.input}
						/>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className={styles.input}
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className={styles.input}
						/>
						{error && <div className={styles.error_msg}>{error}</div>}
						<button type="submit" className={styles.green_btn}>
							Sing Up
						</button>
					</form>
				</div>
			</div>
		</div>
   
	);
};

export default Signup;