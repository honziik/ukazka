import React, { Component } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

export default class NavComp extends Component {
  render() {
    
    const data = this.props.data;
    return (
      <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="/">
              <img
                src={require("./logo.png")}
                width="50"
                height="50"
                className=""
                alt="Exam Manager"
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/">HOME</Nav.Link>

                <Nav.Link href="/exams">EXAMS</Nav.Link>

                {!!data && data.roles_id === 1 ? (
                  <Nav.Link href="/imports">FUNCTIONS</Nav.Link>
                ) : (
                  <></>
                )}
                {!!data && data.roles_id === 2 ? (
                  <Nav.Link href="/examadd">ADD EXAM</Nav.Link>
                ) : (
                  <></>
                )}
                {!!data && data.roles_id !== 4  ? (
                  <Nav.Link href="/users">USERS</Nav.Link>
                ) : (
                  <></>
                )}
              </Nav>
              <Nav>
                <Nav.Link href="/account">MY ACCOUNT</Nav.Link>
                {!!data ? (
                  <Nav.Link href="/logout">LOGOUT</Nav.Link>
                ) : (
                  <Nav.Link href="/login">LOGIN</Nav.Link>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}
