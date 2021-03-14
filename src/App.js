import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import Home from './pages/Home';
import Profile from './pages/Profile';

function App() {

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route path="/profile/:id">
            <Profile/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
