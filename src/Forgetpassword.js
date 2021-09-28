import React, { useState} from "react";
import * as firebase from "firebase/app";



import swal from 'sweetalert';
import { useHistory } from "react-router-dom";
import './config/firestore';

function Forgetpassword() {
  const [forgetPassword, setForgetPassword] = useState("");
  const history = useHistory();

  const alreadyExist = () => {
    history.push('/Login');
};
  const forgetPasswordChangehandler = (e) => {
    setForgetPassword(e.target.value);
  };

  const clickForgetHandeler = () => {
    if (forgetPassword !== "") {
    
      firebase
        .auth()
        .sendPasswordResetEmail(forgetPassword)
        .then(() => {
          swal({
            text: "Email has been sent please resset password",
            icon: "info",
          });
        })
        .catch((error) => {
          swal("Something went wrong!", error.message, "error");
        });
    } else {
      swal({
        text: "Please fill email",
        icon: "warning",
      });
    }

  alreadyExist();

  };



    return (
        <>
        <div className="container">
        <div className="card"></div>
        <div className="card">
          <h1 className="title">Forget Password</h1>
          <form onSubmit={clickForgetHandeler}>
          <div className="input-container">
          <input type="#{type}"    name="email" required="required" onChange={(e) => {
            forgetPasswordChangehandler(e);
          }}
          id="forgetpassword-field"
          value={forgetPassword}
         />
        <label for="#{label}">Email ID</label>
        <div className="bar"></div>
</div>

<div className="button-container">
              <button type="submit" id= "forgetpassword-btn"   ><span>Submit</span></button>
            </div>
          </form>
          </div></div>
        </>
    )
}

export default Forgetpassword

