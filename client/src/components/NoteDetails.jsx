import React, {useState, useRef, useEffect } from 'react';
import { useNotes } from '../context/NotesContext';
import { Form, Card, Row, Col, Button, Alert} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';


export default function NoteDetails(props) {
    const titleRef = useRef();
    const bodyRef = useRef();
    const selectCompletedRef = useRef();
    const [error, setError] = useState('');
    const [validTitle, setValidTitle] = useState(true);
    const [messageTitle, setMessageTitle] = useState('');
    const [messageBody, setMessageBody] = useState('');
    const [isCompleted, setIsCompleted] = useState('');
    const { updateNote } = useNotes();
    const history = useHistory();

    useEffect(() => {
        if (props.note.completed) {
            setIsCompleted("yes")
        }
        else {
            setIsCompleted("no")
        }
    }, [props.note.completed])

    const invalidMasseges = {
        required: "* Title field is required",
        maxLengthTitle: "* You have reached the maximum of characters: 255",
        maxLengthBody: "* You have reached the maximum of characters: 1000"
    }

    function checkValidTitle() {
        if(!titleRef.current.value){
            setValidTitle(false);
            setMessageTitle(invalidMasseges.required);
        }
        else if(titleRef.current.value.length === 255) {
            setMessageTitle(invalidMasseges.maxLengthTitle);
        }
        else {
            setValidTitle(true);
            setMessageTitle("");
        }
    }

    function checkValidBody() {
        if(bodyRef.current.value.length === 1000) {
            setMessageBody(invalidMasseges.maxLengthBody);
        }
        else {
            setMessageBody("");
        }
    }
    
    function handleSubmit(e) {
        e.preventDefault();
        setError('');
        let completed = false;
        if (selectCompletedRef.current.value === "yes"){
            completed = true;
        }

        if (titleRef.current.value){
            const res = updateNote(props.note.id, titleRef.current.value, bodyRef.current.value, completed);
            if (res.status === 'failed'){
                setError('Failed to create a note')
            }
            else {
                history.push("/");
            }
        }
        else {
            setMessageTitle("*Title field is required");
        }

    }


    return (
        <div>
            <Card>
                <Card.Header>
                    <Card.Title>Note Details</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Created at:<span className="ml-2">{new Date(props.note.created_at).toLocaleString('en-US')}</span></Card.Subtitle>
                </Card.Header>
                
                <Card.Body>

                    {error && <Alert variant="danger">{error}</Alert>}
                    
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Form.Group controlId="title">
                                <Form.Control className={validTitle ? "font-weight-bold input-valid" : "font-weight-bold input-invalid"} type="text" maxLength="255" ref={titleRef} placeholder={props.note.title? "" : "Title"} defaultValue={props.note.title} onInput={() => checkValidTitle()}></Form.Control>
                                <div className="invalidMassege text-danger">
                                    {messageTitle}
                                </div>
                            </Form.Group>
                            

                            <Form.Group controlId="body">
                                <Form.Control as="textarea" rows={4} ref={bodyRef} maxLength="1000" placeholder={props.note.body? "" : "Description"} defaultValue={props.note.body} onInput={() => checkValidBody()}></Form.Control>
                                <div className="invalidMassege text-danger">
                                    {messageBody}
                                </div>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group controlId="completed">
                                    <Row>
                                        <Col>
                                            <Form.Label>Completed</Form.Label>
                                        </Col>
                                        <Col>
                                            <Form.Control as="select" ref={selectCompletedRef} value={isCompleted} onChange={() => setIsCompleted(selectCompletedRef.current.value)}>
                                                <option value="no">No</option>
                                                <option value="yes">Yes</option>
                                            </Form.Control>
                                        </Col>
                                    </Row>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button className="w-100" type="submit">SAVE CHANGES</Button>
                            </Col>
                            <Col>
                                <Link to="/"><Button className="w-100" type="submit">DISCARD CHANGES</Button></Link>
                            </Col>
                            
                        </Row>
                        
                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
}
