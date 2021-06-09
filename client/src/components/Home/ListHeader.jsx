import React from 'react';
import '../../css/listHeader.css';
import { Link } from 'react-router-dom';


export default function ListHeader() {

    return (
        <div className="d-flex justify-content-between align-items-center">
            <h2>Notes List</h2>
            <Link to="/addNote" className="d-flex align-items-center" title="Add Note">
                <i className="far fa-plus-square"></i>
            </Link> 
        </div>

    )
}

