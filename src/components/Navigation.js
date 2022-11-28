import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
   } from 'reactstrap';

export default class Example extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="lg">
          <NavbarBrand href="/">Simple Torrent Search</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="lg" navbar>
              <NavItem>
                <NavLink href="/">Quick Search</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/advanced">Advanced Search</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/about">About Us</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
