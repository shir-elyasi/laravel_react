import React from 'react';
import ListHeader from './ListHeader';
import NotesList from './NotesList';
import SumNotes from './SumNotes';


export default function Home() {
    return (
        <div>
            <ListHeader />
            <NotesList />
            <SumNotes />
        </div>
    )
}
