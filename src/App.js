import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import './App.css';
import Login from './Login';
import Registor from "./Registor";
import Navbar from './Navbar';
import Forgetpassword from './Forgetpassword';


function App() {


  return (
    <>
      <Navbar />
      <Router>
        <Switch>
          <Provider store={store}>
            <Route path="/Login" exact component={Login} />
            <Route path="/Registor" exact component={Registor} />
            <Route path="/Forgetpassword" exact component={Forgetpassword} />
          </Provider>
        </Switch>
      </Router>

    </>
  );
}

export default App;
