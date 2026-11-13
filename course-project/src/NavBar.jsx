import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FaHome, FaFilm, FaGamepad } from 'react-icons/fa'

function NavBar() {
    return (
        <Navbar bg="dark" data-bs-theme="dark">
        <Container style={{ maxWidth: 1100, padding: '0 clamp(12px, 4vw, 40px)' }}>
            <Navbar.Brand as={Link} to="/">Heavy Film</Navbar.Brand>
            <Nav className="ms-auto flex-row gap-2 gap-sm-3">
                <Nav.Link as={Link} to="/" className="d-flex align-items-center gap-2" aria-label="Home">
                    <FaHome aria-hidden="true" />
                    <span className="d-none d-sm-inline">Home</span>
                </Nav.Link>
                <Nav.Link as={Link} to="/films" className="d-flex align-items-center gap-2" aria-label="Films">
                    <FaFilm aria-hidden="true" />
                    <span className="d-none d-sm-inline">Films</span>
                </Nav.Link>
                <Nav.Link as={Link} to="/game" className="d-flex align-items-center gap-2" aria-label="Game">
                    <FaGamepad aria-hidden="true" />
                    <span className="d-none d-sm-inline">Game</span>
                </Nav.Link>
            </Nav>
        </Container>
    </Navbar>
        );
}

export default NavBar;