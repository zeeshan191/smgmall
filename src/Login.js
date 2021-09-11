import React from 'react'
import './Login.scss';
function Login() {
   

  
      
    return (
       
        <>
        
        <div className="container">
        <div className="card"></div>
        <div className="card">
          <h1 className="title">Login</h1>
          <form>
            <div className="input-container">
              <input type="#{type}" id="#{label}" required="required"/>
              <label for="#{label}">Username</label>
              <div className="bar"></div>
            </div>
            <div className="input-container">
              <input type="#{type}" id="#{label}" required="required"/>
              <label for="#{label}">Password</label>
              <div className="bar"></div>
            </div>
            <div className="button-container">
              <button><span>Login</span></button>
            </div>
            <div className="footer"><a href="/">Forgot your password?</a></div>
          </form>
        </div>
     
      </div>
     
        </>
    )
}

export default Login
