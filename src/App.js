import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Demo from './Demo';
import Navbar1 from './Navbar1';

function App() {
  return (
 <>
 <Navbar1/>
 <Router>
 <Switch>
 <Route path="/Demo" exact component={Demo} />
 </Switch>
 </Router>
 </>
  );
}

export default App;
