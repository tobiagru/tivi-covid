import React from 'react';
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import logo from "./logo.svg"

import './Menu.css';


class Menu extends React.Component{
  constructor(props) {
      super(props);
      this.state = {
        hide:true
      };
  }

  render() {
    const menu = [
        <div className="menu-button">
          <Button variant="outline-light"
                  onClick={() => this.setState({hide: this.state.hide ? false : true})}>
            <FontAwesomeIcon icon={ faBars }
                             size="3x"
                             className="menu-icon"/>
          </Button>
        </div>
    ]

    if (!this.state.hide) {
      menu.push(
        <div>
          <Nav className="flex-column align-items-end">
            <Link className="nav-link custom-nav-item" to="/" onClick={() => this.setState({hide:true})}>List</Link>
            <Link className="nav-link custom-nav-item" to="/scan" onClick={() => this.setState({hide:true})}>Scan</Link>
            <Link className="nav-link custom-nav-item" to="/add" onClick={() => this.setState({hide:true})}>Add</Link>
          </Nav>
        </div>
      )
    }

    var divclass = "custom-menu";
    if (!this.state.hide) {
      divclass += " custom-overlay"
    }

    return(
      <>
        <div>
          <img src={logo}/>
        </div>
        <div className={divclass}>
          <div className="custom-nav">
            {menu}
          </div>
        </div>
      </>
    )
  }
}

export default Menu;