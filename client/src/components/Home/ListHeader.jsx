import React from 'react';
import '../../css/listHeader.css';
//import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';


export default function ListHeader() {
    
    // const titleRef = useRef();
    // const bodyRef = useRef();
    // const [show, setShow] = useState(false);
    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    return (
        <div className="d-flex justify-content-between align-items-center">

            <h2>Notes List</h2>
            <Link to="/addNote" className="d-flex align-items-center" title="Add Note">
                <i className="far fa-plus-square"></i>
            </Link> 

            {/* <div className="addNote">
                <Button variant="primary" onClick={handleShow}>
                    <i className="fas fa-plus-square"></i>
                </Button>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Note</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="title">
                            <Form.Control type="text" placeholder="Title" ref={titleRef} required></Form.Control>
                        </Form.Group>

                        <Form.Group id="body">
                            <Form.Control type="text" placeholder="Description" ref={bodyRef} required></Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                { error && 
                    <Modal.Footer>
                        <Alert variant="danger">{error}</Alert>
                    </Modal.Footer>
                }
            </Modal> */}
        </div>

        
    )
}

