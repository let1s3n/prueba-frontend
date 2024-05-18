import Spinner from 'react-bootstrap/Spinner';
import styles from './loader.module.scss';

const Loader = () => {
  return (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
};

export default Loader;
