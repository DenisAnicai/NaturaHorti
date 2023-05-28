import React from 'react';
import { Modal, Button } from "react-bootstrap";

interface StockExceededModalProps {
    show: boolean;
    handleClose: () => void;
    availableItems: number;
}

export const StockExceededModal: React.FC<StockExceededModalProps> = ({show, handleClose, availableItems}) => (
    <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
            <Modal.Title>Limita stocului a fost atinsa</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
            <Modal.Body>Numarul de produse pe care ati incercat sa le adaugati in cos depaseste numarul de produse disponibile in stoc.
                <br/>
                <br/>
                Numarul de produse disponibile pe care le mai puteți adauga in cos este de {availableItems}.
            </Modal.Body>
            <br/>
            <Button variant="primary" onClick={handleClose}>
                OK
            </Button>
        </Modal.Footer>
    </Modal>
);
