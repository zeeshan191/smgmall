import React from 'react'

function Registor() {
    return (
        <>
        <div className="container">
        <div className="card"></div>
        <div className="card">
          <h1 className="title">Registor</h1>
          <form>
            <div className="input-container">
              <input type="#{type}" id="#{label}" required="required"/>
              <label for="#{label}">Username</label>
              <div className="bar"></div>
            </div>
            <div className="input-container">
              <input type="#{type}" id="#{label}" required="required"/>
              <label for="#{label}">EMAIL ID</label>
              <div className="bar"></div>
            </div>
            <div className="input-container">
              <input type="#{type}" id="#{label}" required="required"/>
              <label for="#{label}">ADDRESS</label>
              <div className="bar"></div>
            </div>
            <div className="input-container">
              <input type="#{type}" id="#{label}" required="required"/>
              <label for="#{label}">Phone Number</label>
              <div className="bar"></div>
            </div>
            
            <div className="input-container">
              <input type="#{type}" id="#{label}" required="required"/>
              <label for="#{label}">Password</label>
              <div className="bar"></div>
            </div>
            <div className="button-container">
              <button><span>Sign Up</span></button>
            </div>
           
          </form>
        </div>
     
      </div>
        </>
    )
}

export default Registor
