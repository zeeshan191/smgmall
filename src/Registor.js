import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { useHistory } from "react-router";
import * as firebase from "firebase";
import swal from 'sweetalert';
import './config/firestore';
function Registor( props ) {

  const history = useHistory();
    const [signInvalue, setsigninvalue] = useState({
        signUpname: "",
        signUpPhone: "",
        signUpAddress: "",
        signinput: "",
        signpassword: "",
        confirmsignpassword: "",
      });

      const signUpChangehandler = (e) => {
        setsigninvalue({
          ...signInvalue,
          [e.target.name]: e.target.value,
        });
      };

      const signInInput = () => {
        if (
          signInvalue.signUpname !== "" &&
          signInvalue.signUpPhone !== "" &&
          signInvalue.signUpAddress !== "" &&
          signInvalue.signinput !== "" &&
          signInvalue.signpassword !== "" &&
          signInvalue.confirmsignpassword !== "" &&
          signInvalue.signpassword === signInvalue.confirmsignpassword
        ) {
          firebase
            .auth()
            .createUserWithEmailAndPassword(
              signInvalue.signinput,
              signInvalue.signpassword
            )
            .then((u) => {
              return u.user
                .updateProfile({
                  displayName: signInvalue.signUpname,
                })
                .then(() => {
                  swal("Great!", "You have successfully signed up", "success");
               
                  history.push("/login");
                });
            })
            .catch((error) => {
              swal("Something went wrong!", error.message, "error");
            });
        } else {
          swal("Something went wrong!", "Please fill data correctly", "error");
        }
      };

    return (
        <>
            <div className="container">
                <div className="card"></div>
                <div className="card">
                    <h1 className="title">Registor</h1>
                  
                        <div className="input-container">
                            <input type="#{type}" id="name"  required="required" 
                            onChange={(e) => {
                              signUpChangehandler(e);
                            }}
                           
                            name="signUpname"
                            value={signInvalue.signUpname}
                           
                            
                            
                            />
                            <label for="#{label}">Username</label>
                            <div className="bar"></div>
                        </div>
                        <div className="input-container">
                            <input type="#{email}" id="email" 
                             required="required" 
                             onChange={(e) => {
                              signUpChangehandler(e);
                            }}
                            
                            name="signinput"
                            value={signInvalue.signinput}
                            
                            />
                            <label for="#{label}">EMAIL ID</label>
                            <div className="bar"></div>
                        </div>

                        <div className="input-container">
                            <input type="#{type}" id="phone" required="required"
                            
                            onChange={(e) => {
                              signUpChangehandler(e);
                            }}
                         
                            name="signUpPhone"
                            value={signInvalue.signUpPhone}
                            
                            />
                            <label for="#{label}">Phone Number</label>
                            <div className="bar"></div>
                        </div>
                        <div className="input-container">
                            <input type="#{type}" required="required" 
                                id="address"
                                onChange={(e) => {
                                  signUpChangehandler(e);
                                }}
                             
                                name="signUpAddress"
                                value={signInvalue.signUpAddress}
                                 />
                            <label for="#{label}">ADDRESS</label>
                            <div className="bar"></div>
                        </div>
                        <div className="input-container">
                            <input type="#{type}" id="password"  onChange={(e) => {
                              signUpChangehandler(e);
                            }}
                          
                            name="signpassword"
                            value={signInvalue.signpassword} required="required"/>
                            <label for="#{label}">Password</label>
                            <div className="bar"></div>
                        </div>
                        <div className="input-container">
                            <input type="#{type}" id="password"  onChange={(e) => {
                              signUpChangehandler(e);
                            }}
                          
                            name="confirmsignpassword"
                            value={signInvalue.signconfirmpassword} required="required"/>
                            <label for="#{label}">Confirm Password</label>
                            <div className="bar"></div>
                        </div>
                        <div className="button-container">
                            <button onClick={signInInput}><span>Sign Up</span></button>
                        </div>

                  
                </div>
               
            </div>
        </>
    )
}

export default Registor;
