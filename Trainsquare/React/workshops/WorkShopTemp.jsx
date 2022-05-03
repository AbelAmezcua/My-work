import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';

const WorkShopTemp = (props) => {
    const workshop = props.workshopData;

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <React.Fragment>
            <div className="mb-3" style={{ width: '16rem' }}>
                <img src={workshop.imageUrl} onClick={handleShow} alt="" className="img-fluid rounded-corners" />
                <h4>{workshop.name}</h4>
                <p className="card-text">{`${workshop.shortDescription.slice(0, 55)}...`}</p>
            </div>
            <Modal show={show} onHide={handleClose} animation={true}>
                <Modal.Header closeButton>
                    <Modal.Title>{workshop.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{workshop.shortDescription}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    );
};

WorkShopTemp.propTypes = {
    workshopData: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        imageUrl: PropTypes.string.isRequired,
        summary: PropTypes.string,
        shortDescription: PropTypes.string,
    }),
};

export default WorkShopTemp;
