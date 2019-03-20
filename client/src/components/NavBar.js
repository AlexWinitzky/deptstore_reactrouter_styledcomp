import React from "react";
import { NavLink, } from "react-router-dom";
import { Menu, Segment } from 'semantic-ui-react';


const NavBar = () => (
  <Segment inverted>
    <Menu inverted pointing secondary>
      <Menu.Item
        as={NavLink}
        exact
        to="/"
        content="Home" />
      {' '}
      <Menu.Item
        as={NavLink}
        exact
        to="/about"
        content="About" />
      {' '}
      <Menu.Item
        as={NavLink}
        exact
        to="/departments"
        content="Browse Departments" />
    </Menu>
  </Segment>
)

export default NavBar

