import React ,{ Component } from 'react';

import { BrowserRouter as Router, 
  Switch, 
  Route,
   Link } from "react-router-dom";
   import Login from "./components/home/login";
   import SignUp from "./components/home/signup";
   import Home from "./components/home/home";
   import UserHome from "./components/User/UserHome";
   import complaint from "./components/User/complaint_registration";
   import Adminlogin from "./components/home/adminlogin.js"; 
   import About from "./components/home/about.js";
   import Adminhome from "./components/admin/Adminhome.js";


class App extends Component {
  constructor(props) {
    super(props);
  }
  render(){
  return (
    <div>
            <Router>
                <Switch>
            {/* <Route exact path="/" component={App} /> */}
            <Route exact path='/' component={ Home } />
            <Route exact path='/Home' component={ Home } />
            <Route path="/Login" component={ Login } />
            <Route path="/sign-up" component={ SignUp } />
            <Route path="/user-home" component={ UserHome }/>
            <Route path="/complaint" component={ complaint }/>
            <Route path="/adminlogin" component= { Adminlogin}/>
            <Route path="/about" component= { About }/>
            <Route path="/adminhome" component= { Adminhome }/>
                </Switch>
            </Router>
            </div>
        
  );
}}

export default App;
