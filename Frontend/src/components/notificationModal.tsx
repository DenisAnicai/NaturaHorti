import React from 'react';
import {Modal, Button} from 'react-bootstrap';

interface NotificationModalProps {
    show: boolean;
    handleClose: () => void;
    handleNavigate: () => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({show, handleClose, handleNavigate}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Produs adaugat!</Modal.Title>
      </Modal.Header>
      <Modal.Body>Produsul a fost adaugat in cosul dumneavoastra.</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Continua cumparaturile
        </Button>
        <Button variant="primary" onClick={handleNavigate}>
          Mergi la cos
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default NotificationModal;
