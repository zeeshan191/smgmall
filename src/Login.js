import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import './Login.scss';


import 'react-toastify/dist/ReactToastify.css';



import * as firebase from "firebase";
import swal from 'sweetalert';
import './config/firestore';



function Login(props) {
 
  
  const history = useHistory();
  const [logInvalue, setLoginvalue] = useState({
    logInInput: "",
    logInPassword: "",
  });
  const changeLogInhandler = (e) => {
    setLoginvalue({
      ...logInvalue,
      [e.target.name]: e.target.value,
    });
  };

  const authListener = () => {
    firebase.auth().onAuthStateChanged((user) => {
      alert('login')
      if (user) {
        swal({
          text: "You have successfully loged in",
          icon: "success",
        });
        
        history.push("/");
      }
    });
  };

  const logininput = () => {
   alert('nai')
    firebase
      .auth()
      .signInWithEmailAndPassword(
        logInvalue.logInInput,
        logInvalue.logInPassword
      )
      .then(() => {
        authListener();
      })
      .catch((error) => {
        swal("Something went wrong!", error.message, "error");
      });
  };


  return (

    <>

      <div className="container">
        <div className="card"></div>
        <div className="card">
          <h1 className="title">Login</h1>
        
            <div className="input-container">
              <input type="#{type}"   required="required" 
              onChange={(e) => {
                changeLogInhandler(e);
              }}
              name="logInInput"
              
              value={logInvalue.logInInput}
              />
              <label for="#{label}">UserEmail</label>
              <div className="bar"></div>
            </div>
            <div className="input-container">
              <input type="#{type}"  onChange={(e) => {
                changeLogInhandler(e);
              }}
              name="logInPassword"
            
              value={logInvalue.logInPassword} required="required" />
              <label for="#{label}">Password</label>
              <div className="bar"></div>
            </div>
            <div className="button-container">
              <button onClick={logininput}  ><span>Login</span></button>
            </div>
            <div className="footer"><a href="/Forgetpassword">Forgot your password?</a></div>
    
        </div>
   
      </div>

    </>
  )
}

export default Login
