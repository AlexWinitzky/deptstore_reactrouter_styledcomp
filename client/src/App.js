import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Departments from './components/Departments';
import Department from './components/Department';
import Item from './components/Item';
import NoMatch from './components/NoMatch';
import NavBar from './components/NavBar';

const App = () => (
  <>
    <NavBar />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
      <Route exact path="/departments" component={Departments} />
      <Route exact path="/departments/:id" component={Department} />
      <Route exact path="/departments/:department_id/items/:id" component={Item} />
      <Route component={NoMatch} />
    </Switch>
  </>
)

export default App;
