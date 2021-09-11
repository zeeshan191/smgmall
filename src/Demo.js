import React from 'react'

function Demo() {
    return (
        <div>
         <nav class="navbar navbar-expand-lg  ">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">  <img src='logo.png' width='130' height='45'/ ></a>
         
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0" style={{marginLeft:'201px'}}>
              <li class="nav-item">
                <a class="nav-link" aria-current="page" href="/">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/">Link</a>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Dropdown
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><a class="dropdown-item" href="/">Action</a></li>
                  <li><a class="dropdown-item" href="/">Another action</a></li>
                
                  <li><a class="dropdown-item" href="/">Something else here</a></li>
                </ul>
              </li>
              
            </ul>
            
          </div>
          <form class="d-flex" style={{width:'400px'}}>
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
          <button class="btn btn-outline-success" type="submit" style={{marginLeft: '-9px'}}>   <i class="fa fa-search"></i></button>
        </form>

        
        </div>
      </nav>
        </div>
    )
}

export default Demo;
