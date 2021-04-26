import React from 'react';
import NoteCard from '../NoteCards/NoteCard/NoteCard'

const notecards = (props) => props.notes.map((note, index) => {

    return (
        <div className="col-lg-3 col-md-6 p-4" key={index}>
            <NoteCard categories={props.categories} priorities={props.priorities} themes={props.themes} note={note} noteconfig={props.noteconfig} clicked={props.clicked} />
        </div>
    )
})

export default notecards;