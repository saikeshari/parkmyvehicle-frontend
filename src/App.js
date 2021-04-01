import logo from './logo.svg';
import './App.css';
import React,{Component} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Switch, Route, useParams, state, Link, Redirect } from "react-router-dom";
import SearchPage from './pages/SearchPage';
import Homepage from './pages/Homepage';
import Form from './components/Form';

class App extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = { APIresponse:""};
  }
  // callAPI()
  // {
  //   fetch("http://localhost:9000/users")
  //     .then(res => res.text())
  //     .then(res => this.setState({APIresponse: res}));
  // }
  // componentWillMount()
  // {
  //   this.callAPI();
  // }
  render() {
    return(
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Homepage} />
            <Route exact path="/search" component={SearchPage} />
            <Route exact path="/form" component={Form} />
        </Switch>
      </BrowserRouter>
      <p>{this.state.APIresponse}</p>
    </div>
  )};
}

export default App;
