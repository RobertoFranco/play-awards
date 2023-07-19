import React, { useState, useContext } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import UserContext from './context/UserContext';

const NavMenu = () => {
  const [collapsed, setCollapsed] = useState(false);
  const userContext = useContext(UserContext);

  const toggleNavbar = () => {
    setCollapsed(!collapsed);
  }

    return <header>
      <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container light>
        <NavbarBrand tag={Link} to="/">PlayAwards</NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!collapsed} navbar>
          <ul className="navbar-nav flex-grow">
              {userContext.token 
                ? <>
                  <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/register">Register</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink className="text-dark" onClick={() => userContext.logout()}>Logout</NavLink>
                  </NavItem>
                </>
                : <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/login">Login</NavLink>
                </NavItem>}
          </ul>
        </Collapse>
      </Navbar>
    </header>;
}

export default NavMenu;