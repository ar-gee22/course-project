import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavBar() {
    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand as={Link} to="/">HEAVY FILM</Navbar.Brand>
                <Nav classname="me-auto">
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                    <Nav.Link as={Link} to="/films">Films</Nav.Link>
                    <Nav.Link as={Link} to="/game">Game</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default NavBar;