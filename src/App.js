import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Menu from "./Menu";
import DeviceList from './DeviceList';
import Device from './Device';
import Add from './Add';
import './App.css';


const App = () => (
  <>
    <Router>
      <Menu/>
      <div>
        <Switch>
          <Route path="/device/:id" component={Device}/>
          <Route path="/add" component={Add}/>
          <Route path="/scan">
            <h2>SCAN -- still missing --</h2>
          </Route>
          <Route path="/" component={DeviceList}/>
        </Switch>
      </div>
    </Router>
  </>
);

export default App;