import Image from 'next/image';
import { Container, Navbar } from 'react-bootstrap';

import styles from './navbar.module.scss';
const NavBar = () => {
  return (
    <Navbar bg="transparent" expand="lg" className="p-0">
      <Container className="p-0">
        <Navbar.Brand href="/" className="p-0 pt-3">
          <Image
            className={styles.logo}
            src="/images/logo.png"
            alt="Logo"
            width={80}
            height={0}
            style={{ height: 'auto' }}
          />
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default NavBar;
