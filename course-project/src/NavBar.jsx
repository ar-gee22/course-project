import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FaHome, FaFilm, FaGamepad } from 'react-icons/fa'

function NavBar() {
    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container fluid>
                <Navbar.Brand as={Link} to="/">HEAVY FILM</Navbar.Brand>
                <Nav className="ms-auto flex-row gap-3">
                    <Nav.Link as={Link} to="/" className="d-flex align-items-center gap-2">
                        <FaHome aria-hidden="true" /> Home
                    </Nav.Link>
                    <Nav.Link as={Link} to="/films" className="d-flex align-items-center gap-2">
                        <FaFilm aria-hidden="true" /> Films
                    </Nav.Link>
                    <Nav.Link as={Link} to="/game" className="d-flex align-items-center gap-2">
                        <FaGamepad aria-hidden="true" /> Game
                    </Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default NavBar;