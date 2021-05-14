import React from 'react';
import axios from 'axios'
import { createPortal } from 'react-dom';


const expandnote = ({ categories, priorities, themes, note, noteconfig, clicked, changed }) => {
    const theme = themes.filter((f) => f.id === note.theme)[0]
    let classes = theme && theme.background ? `card bg-${theme.background}` : `card bg-primary`
    let editclass = theme && theme.background ? `card-body view_card_body bg-${theme.background}` : `card-body view_card_body bg-primary`
    let textClass = theme && theme.color ? `text-${theme.color}` : `text-light`
    let btnClass = theme && theme.icon ? `btn btn-${theme.icon}` : `btn btn-info`
    let action = noteconfig

    if (noteconfig === 'edit') {
        action = 'update'
    } else if (noteconfig === 'add') {
        action = 'create'
    }
    if (action === 'create') {

        if (document.getElementById('category')) {
            document.getElementById('category').selectedIndex = 1
        }
        if (document.getElementById('theme')) {
            document.getElementById('theme').selectedIndex = 1
        }
        if (document.getElementById('priority')) {
            document.getElementById('priority').selectedIndex = 1
        }
        if (document.getElementById('title')) {
            document.getElementById('title').value = ''
        }
        if (document.getElementById('content')) {
            document.getElementById('content').value = ''
        }
    }

    const url = 'http://localhost:3001'

    const createUpdateNote = (event) => {

        const note_id = action === 'update' ? note.id : 0
        const c_note = {
            id: parseInt(note_id),
            category: parseInt(document.getElementById('category').value),
            theme: parseInt(document.getElementById('theme').value),
            priority: parseInt(document.getElementById('priority').value),
            title: document.getElementById('title').value,
            content: document.getElementById('content').value
        }
        if (action === 'update') {
            axios.put(`${url}/notes/${note.id}`, c_note).then(() => {
                window.location.replace('/')
            })
        } else {
            axios.post(`${url}/notes`, c_note).then(() => {
                window.location.replace('/')
            })
        }

    }

    const setNoteSelect = (event) => {
        switch (event.target.name) {
            case "category":
                note.category = parseInt(event.target.options.selectedIndex) + 1
                break
            case "priority":
                note.priority = parseInt(event.target.options.selectedIndex) + 1
                break
            case "theme":
                note.theme = parseInt(event.target.options.selectedIndex) + 1
                break
            default:
                break
        }
    }

    return (
        <div className="col-12 d-flex flex-row justify-content-center my-5 px-5 py-5">
            <div className={classes} style={{ 'minWidth': '96%' }}>
                <div className={editclass}>
                    <div className="row">
                        <div className="col-8">
                            <div className="form-group">
                                <React.Fragment>
                                    <h5 className={textClass}>Title</h5>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="title"
                                        defaultValue={note.title}
                                    />
                                </React.Fragment>
                            </div>
                            <div className="form-group">
                                <React.Fragment>
                                    <h5 className={textClass}>Content</h5>
                                    <textarea
                                        className="form-control textarea"
                                        id="content"
                                        defaultValue={note.content} />
                                </React.Fragment>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="form-group">
                                <React.Fragment>
                                    <h5 className={textClass}>Category</h5>
                                    <select className="form-control"
                                        id="category"
                                        onChange={setNoteSelect}
                                        defaultValue={note.category}>
                                        {categories.map(({ id, text }) => {
                                            return <option key={id} value={id}>{text}</option>
                                        })}
                                    </select>
                                </React.Fragment>
                            </div>
                            <div className="form-group">
                                <React.Fragment>
                                    <h5 className={textClass}>Priority</h5>
                                    <select
                                        defaultValue={note.priority}
                                        className="form-control"
                                        id="priority"
                                        onChange={setNoteSelect}>
                                        {priorities.map(({ id, text }) => { return <option key={id} value={id}>{text}</option> })}
                                    </select>
                                </React.Fragment>
                            </div>


                            <div className="form-group">
                                <React.Fragment>
                                    <h5 className={textClass}>Theme</h5>
                                    <select
                                        defaultValue={note.theme}
                                        className="form-control"
                                        id="theme"
                                        onChange={setNoteSelect}>
                                        {themes.map(({ id, text }) => { return <option key={id} value={id}>{text}</option> })}
                                    </select>
                                </React.Fragment>
                            </div>


                            <div className="form-group">
                                <button type="button" className={btnClass} name={action} id={note.id} onClick={createUpdateNote}>{action}</button>
                            </div>

                        </div>
                    </div>
                </div>

                {noteconfig !== 'edit' && noteconfig !== 'add' ? (
                    <div className="card-footer p-0">
                        <i className="fa fa-share py-2 pl-3" name="update" id={note.id} onClick={clicked}></i>
                    </div>) : (
                    <span></span>
                )}

            </div>
        </div>

    );
}

export default expandnote;