import React from 'react';
import NoteCards from '../../../components/Content/NoteCards/NoteCards'
import ExpandNote from '../../../components/Content/NoteCards/ExpandNote/ExpandNote'

const content = (props) => {
    const category_notes = parseInt(props.category) === 1 ? props.notes : props.notes.filter((f) => f.category === props.category)

    return (
        <div>
            <div className="row">
                <div className="col">
                    {/* <nav aria-label="breadcrumb"> */}
                    <ol className="breadcrumb bg-dark m-0 p-4">
                        <li className="breadcrumb-item"><a class="text-secondary" href="/">Home</a></li>
                        <li className="breadcrumb-item active text-white" aria-current="page">{props.categories.filter((f) => f.id === props.category)[0].text}</li>
                    </ol>
                    {/* </nav> */}
                </div>
            </div>
            <div className="row">
                {props.noteconfig === 'view' ? (
                    <NoteCards category={props.category} categories={props.categories} priorities={props.priorities} themes={props.themes} noteconfig={props.noteconfig}
                        notes={category_notes} clicked={props.clicked} changed={props.changed} />
                ) : (
                    <ExpandNote categories={props.categories} priorities={props.priorities} themes={props.themes} note={props.note} noteconfig={props.noteconfig} clicked={props.clicked} changed={props.changed} />
                )}

            </div>
        </div>

    );
}

export default content;