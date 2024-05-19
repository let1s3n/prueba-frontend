import Image from 'next/image';
import { Container, Navbar } from 'react-bootstrap';
const NavBar = () => {
  return (
    <Navbar bg="transparent" expand="lg" className="p-0">
      <Container className="p-0">
        <Navbar.Brand href="/" className="p-0 pt-3">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={80}
            height={0}
            style={{ height: 'auto' }}
            sizes="(max-width: 768px) 50px, 80px"
          />
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default NavBar;
