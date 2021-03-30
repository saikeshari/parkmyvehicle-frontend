import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Switch, Route, useParams, state, Link, Redirect } from "react-router-dom";
import SearchPage from './pages/SearchPage';
import Homepage from './pages/Homepage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/search" component={SearchPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
