import React, { useContext, useEffect, useReducer} from 'react';
import axios from 'axios';
import { initialState, notesReducer } from '../reducers/notes.reducer';
import * as actionTypes from '../reducers/notes.actions';


const NotesContext = React.createContext();

export function useNotes() {
    return useContext(NotesContext)
}

export function NotesProvider({children}) {

    const [notesState, notesDispatch] = useReducer(notesReducer, initialState);


    useEffect(() => {
        async function fetchData(){
            const res = await axios.get(`${process.env.REACT_APP_SERVER_PORT}/api/notes`)
            notesDispatch({type: actionTypes.FETCH_DATA, payload: res.data}) 
        }
        fetchData();
    }, []);


    const addNote = async (title, body) => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_SERVER_PORT}/api/notes`, {
                title,
                body
            })
            notesDispatch({type: actionTypes.ADD_NOTE, note: res.data});
            return ({status: 'success'});
        } 
        catch (err) {
            console.log(err);
            return ({status: 'failed'});
        }
    }

    const deleteNote = async (id) => {
        try {
            await axios.delete(`${process.env.REACT_APP_SERVER_PORT}/api/notes/${id}`);
            notesDispatch({type: actionTypes.DELETE_NOTE, id});
        } 
        catch (err) {
            console.log(err);
        }
    }

    const changeCompleted = async (id) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_SERVER_PORT}/api/notes/${id}`);
            console.log(res)
            const completed = res.data.completed ? 0 : 1;
            const title = res.data.title;
            await axios.patch(`${process.env.REACT_APP_SERVER_PORT}/api/notes/${id}`, {
                completed, title
            });
            notesDispatch({type: actionTypes.CHANGE_DONE, id, completed});
        } 
        catch (err) {
            console.log(err);
        }
    }
    
    const updateNote = async (id, title, body, completed) => {
        try {
            await axios.patch(`${process.env.REACT_APP_SERVER_PORT}/api/notes/${id}`, {
                title, body, completed
            });
            notesDispatch({type: actionTypes.UPDATE_NOTE, id, title, body, completed});
            return ({status: 'success'});

        } 
        catch (err) {
            console.log(err);
            return ({status: 'failed'});
        }
    }

    const value = {
        notesState,
        notesDispatch,
        addNote,
        deleteNote,
        changeCompleted,
        updateNote
    }

    return (
        <NotesContext.Provider value={value}>
            {children}
        </NotesContext.Provider>
    );
}
