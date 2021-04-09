import logo from './logo.svg';
import './App.css';
import React,{Component} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Switch, Route, useParams, state, Link, Redirect } from "react-router-dom";
 import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchPage from './pages/SearchPage';
import Homepage from './pages/Homepage';
import Form from './components/Form';
import Login from './auth/Login'
import Register from './auth/Register'
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./user/Dashboard";
import DashboardSeller from './user/DashboardSeller'
import NewParkings from './Parkings/NewParkings'
import Header from './components/Header'
import Footer from './components/Footer';

class App extends React.Component {
  render() {
    return(
    <div className="App">
        <BrowserRouter>
          <Header/>
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
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/dashboard/seller" component={DashboardSeller} />
            <PrivateRoute exact path="/parkings/new" component={NewParkings} />
        </Switch>
        <Footer/>
      </BrowserRouter>
    </div>
  )};
}

export default App;
