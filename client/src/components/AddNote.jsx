import React, { useState, useRef } from 'react';
import { useNotes } from '../context/NotesContext';
import { Form, Alert, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';


export default function AddNote() {
    const [error, setError] = useState('');
    const [validTitle, setValidTitle] = useState(true);
    const [messageTitle, setMessageTitle] = useState('');
    const [messageBody, setMessageBody] = useState('');
    const { addNote } = useNotes();
    const titleRef = useRef();
    const bodyRef = useRef();
    const history = useHistory();

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

        if (titleRef.current.value){
            const res = addNote(titleRef.current.value, bodyRef.current.value);
            if (res.status === 'failed'){
                setError('Failed to create a note')
            }
            else {
                history.push("/");
            }
        }
        else {
            setMessageTitle("Title field is required");
        }  
    }

    return (
        <div>
            <h2 className="ml-2 py-2">Add Note</h2>

            { error && 
                <Alert variant="danger">{error}</Alert>
            }

            <Form onSubmit={handleSubmit}>
                <Form.Group id="title">
                    <Form.Control className={validTitle ? "font-weight-bold input-valid" : "font-weight-bold input-invalid"} type="text" placeholder="Title" maxLength="255" ref={titleRef} onInput={() => checkValidTitle()}></Form.Control>
                    <div className="invalidMassege text-danger">
                        {messageTitle}
                    </div>
                </Form.Group>
                <Form.Group id="body">
                    <Form.Control as="textarea" rows={4} placeholder="Description" maxLength="1000" ref={bodyRef} onInput={() => checkValidBody()}></Form.Control>
                    <div className="invalidMassege text-danger">
                        {messageBody}
                    </div>
                </Form.Group>
                <div className="d-flex justify-content-center align-items-center">
                    <Button variant="primary" type="submit" className="px-5">
                        Submit
                    </Button>
                </div>
            </Form>
        </div>
    )
}
