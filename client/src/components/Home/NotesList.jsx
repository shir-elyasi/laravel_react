import React from 'react';
import '../../css/notesList.css';
import { useNotes } from '../../context/NotesContext';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';


export default function NotesList() {
    const { notesState, deleteNote, changeCompleted } = useNotes();

    return (
        <div>
            {
                notesState.data.length === 0 ?
                <div className="no-notes">
                    <h3 className="text-center">There are no notes<br></br>to display</h3>
                </div>
                :
                <Table striped hover responsive className="scroll_table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        notesState.data.map((element, index) =>
                            <tr key={index}>
                                <td>
                                    {++index}
                                </td>
                                <td colSpan="4">
                                    <Link to={`/notes/${element.id}`} className={element.completed ? "" : "font-weight-bold"}>{element.title}</Link>
                                </td>
                                <td>
                                    {element.completed ?
                                        <button title="Mark as undone" className="btn" onClick={() => changeCompleted(element.id)}><i className="fas fa-check icon-table text-danger"></i></button>
                                    :
                                        <button title="Mark as done" className="btn" onClick={() => changeCompleted(element.id)}><i className="fas fa-check icon-table text-success"></i></button>
                                    }
                                </td>
                                <td>
                                    <button title={"Edit"} className="btn"><Link to={`/notes/${element.id}`}><i className="far fa-edit icon-table"></i></Link></button>
                                </td>
                                <td>
                                    <button title={"Delete"} className="btn" onClick={() => deleteNote(element.id)}><i className="far fa-trash-alt icon-table"></i></button>
                                </td>
                            </tr>
                        )
                    }
                    </tbody>
                </Table>
            }
        </div>
    )
}
