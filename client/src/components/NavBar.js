import React from "react";
import { NavLink, } from "react-router-dom";
import { Menu, Segment, Image, } from 'semantic-ui-react';


const NavBar = () => (
  <Segment inverted>
    <Menu inverted pointing secondary>
      <Menu.Item>
        <NavLink
          exact
          to="/"
          activeStyle={styles.active}>
          Home
        </NavLink>
      </Menu.Item>
      <Menu.Item>
        <NavLink
          exact
          to="/about"
          activeStyle={styles.active}>
          About
        </NavLink>
      </Menu.Item>
      <Menu.Item>
        <NavLink
          to="/departments"
          activeStyle={styles.active}>
          Departments
        </NavLink>
      </Menu.Item>
    </Menu>
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        width: '50%',
        height: '280px',
      }}>
        <Image src={require('../images/worse_amazon.jpg')} alt="logo" />
      </div>
    </div>
  </Segment>
)

const styles = {
  active: {
    color: 'orange',
    fontWeight: 'bold',
  }
}

export default NavBar

