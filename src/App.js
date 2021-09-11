import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Login from './Login';
import Registor from "./Registor";

import Navbar1 from './Navbar1';


function App() {

  
  return (
 <>
 <Navbar1/>
 <Router>
 <Switch>

 <Route path="/Login" exact component={Login} />
 <Route path="/Registor" exact component={Registor} />
 
 </Switch>
 </Router>
 
 </>
  );
}

export default App;
