import React from 'react';
// Routing
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
// Styling
import './App.css';
// Pages
import Home from './pages/Home';
import Profile from './pages/Profile';

/**
 * Controls the routing of the application
 */
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
