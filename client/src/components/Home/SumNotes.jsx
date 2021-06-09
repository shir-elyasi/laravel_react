import React from 'react';
import '../../css/sumNotes.css';
import { useNotes } from '../../context/NotesContext';


export default function SumNotes() {
    const { notesState } = useNotes();

    return (
        <div className="sumNotes">
            {/* <div className="d-flex justify-content-between"> */}
                    <p><strong>Completed: </strong>{notesState.done}</p>
                    <p><strong>Not-completed: </strong>{notesState.sum - notesState.done}</p>
                    <p><strong>Total: </strong>{notesState.sum}</p>
            {/* </div> */}
            
        </div>
    )
}
