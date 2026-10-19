import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavBar() {
    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="">HEAVY FILM</Navbar.Brand>
                <Nav classname="me-auto">
                    <Nav.Link href="">Home</Nav.Link>
                    <Nav.Link href="">Films</Nav.Link>
                    <Nav.Link href="">Game</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default NavBar;