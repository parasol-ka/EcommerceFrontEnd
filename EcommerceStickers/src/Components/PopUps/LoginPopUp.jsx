import { Modal, Button } from 'react-bootstrap';

const LoginPopUp = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Sign Up / Log In</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* 🔜 Tu pourras ajouter un vrai formulaire ici */}
        <p>This is where the login/register form goes.</p>
        <Button variant="primary" onClick={handleClose}>Close</Button>
      </Modal.Body>
    </Modal>
  );
};

export default LoginPopUp;
