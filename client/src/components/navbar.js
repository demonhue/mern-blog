import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink,
    Container
//   NavbarBrand,
//   UncontrolledDropdown,
//   DropdownToggle,
//   DropdownMenu,
//   DropdownItem,
//   NavbarText
} from 'reactstrap';

class AppNavbar extends Component {
    state = {
        isOpen: false
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };

    render() {
        return (
            <div>
                <Navbar color="dark" dark expand="sm" className="mb-5">
                    <Container>
                        <Link className="navbar-brand" to="/">Articles</Link>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                                <Nav className="ms-auto" navbar>
                                    <NavItem >
                                        <NavLink href="https://github.com/demonhue">
                                            Github
                                        </NavLink>
                                    </NavItem>
                                {!this.props.user &&
                                    <React.Fragment>
                                    <NavItem>
                                        <Link className="nav-link" to="/register" >Register</Link>
                                    </NavItem>
                                    <NavItem>
                                        <Link className="nav-link" to="/login" >Login</Link>
                                    </NavItem>
                                    </React.Fragment>
                                }
                                {this.props.user &&
                                    <React.Fragment>
                                    <NavItem>
                                        <Link className="nav-link" to="/add" >Add Article</Link>
                                    </NavItem>
                                    <NavItem>
                                        <Link className="nav-link" to="/profile" >{this.props.user.name}</Link>
                                    </NavItem>
                                    <NavItem>
                                        <Link className="nav-link" to="/logout" >Logout</Link>
                                    </NavItem>
                                    </React.Fragment>
                                }
                                </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </div>
        );
    }
}
 
export default AppNavbar;