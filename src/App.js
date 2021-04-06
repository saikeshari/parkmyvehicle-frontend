import logo from './logo.svg';
import './App.css';
import React,{Component} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Switch, Route, useParams, state, Link, Redirect } from "react-router-dom";
import SearchPage from './pages/SearchPage';
import Homepage from './pages/Homepage';
import Form from './components/Form';
import Login from './auth/Login'
import Register from './auth/Register'
 import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

class App extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = { APIresponse:""};
  }
  render() {
    return(
    <div className="App">
        <BrowserRouter>
          <ToastContainer position="top-center"/>
          <Switch>
          <Route exact path="/" component={Homepage} />
            {/* <Route path='/search' component={() => { 
     window.location.href ="http://localhost:9000/search#"; 
     return null;
            }} /> */}
            <Route exact path="/login" component={Login} />
            <Route exact path="/search" component={SearchPage} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/form" component={Form} />
        </Switch>
      </BrowserRouter>
      <p>{this.state.APIresponse}</p>
    </div>
  )};
}

export default App;
