import React from 'react';
import axios from 'axios'
import { createPortal } from 'react-dom';


const expandnote = ({ categories, priorities, themes, note, noteconfig, clicked, changed }) => {

    let classes = 'card bg-light'
    let editclass = `card-body view_card_body bg-light`
    let action = noteconfig

    if (noteconfig === 'edit') {
        action = 'update'
        editclass = `card-body edit_card_body bg-light`
    } else if (noteconfig === 'add') {
        action = 'create'
        editclass = `card-body edit_card_body bg-light`
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
                {noteconfig !== 'edit' && noteconfig !== 'add' ? (
                    <div className="card-header">
                        <div className="row">
                            <div className="col-8">
                                <div className="form-group">
                                    <div><h5>{note.title}</h5></div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <span></span>
                )}
                <div className={editclass}>
                    <div className="row">
                        <div className="col-8">
                            <div className="form-group">
                                {noteconfig === 'edit' || noteconfig === 'add' ? (
                                    <React.Fragment>
                                        <label>Title</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="title"
                                            defaultValue={note.title}
                                        />
                                    </React.Fragment>
                                ) : (
                                    <span></span>
                                )}
                            </div>
                            <div className="form-group">
                                {noteconfig === 'edit' || noteconfig === 'add' ? (
                                    <React.Fragment>
                                        <label>Content</label>
                                        <textarea
                                            className="form-control textarea"
                                            id="content"
                                            defaultValue={note.content} />
                                    </React.Fragment>
                                ) : (
                                    <blockquote>{note.content}</blockquote>
                                )}
                            </div>
                        </div>
                        <div className="col-4">
                            {noteconfig === 'edit' || noteconfig === 'add' ? (
                                <div className="form-group">
                                    <React.Fragment>
                                        <label>Category</label>
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
                            ) : (
                                <div>
                                    <h5>Category: {categories.filter((f) => f.id === note.category)[0].text}</h5>
                                </div>
                            )}
                            {noteconfig === 'edit' || noteconfig === 'add' ? (
                                <div className="form-group">
                                    <React.Fragment>
                                        <label>Priority</label>
                                        <select
                                            defaultValue={note.priority}
                                            className="form-control"
                                            id="priority"
                                            onChange={setNoteSelect}>
                                            {priorities.map(({ id, text }) => { return <option key={id} value={id}>{text}</option> })}
                                        </select>
                                    </React.Fragment>
                                </div>
                            ) : (
                                <div>
                                    <h5>Priority: {priorities.map(({ id, text }) => { return id === note.priority ? text : null })}</h5>
                                </div>
                            )}
                            {noteconfig === 'edit' || noteconfig === 'add' ? (
                                <div className="form-group">
                                    <React.Fragment>
                                        <label>Theme</label>
                                        <select
                                            defaultValue={note.priority}
                                            className="form-control"
                                            id="theme"
                                            onChange={setNoteSelect}>
                                            {themes.map(({ id, text }) => { return <option key={id} value={id}>{text}</option> })}

                                        </select>
                                    </React.Fragment>
                                </div>
                            ) : (
                                <div>
                                    <h5>Theme: {note.theme}</h5>
                                </div>
                            )}
                            {noteconfig === 'edit' || noteconfig === 'add' ? (
                                <div className="form-group">
                                    <button type="button" className="btn btn-primary" name={action} id={note.id} onClick={createUpdateNote}>{action}</button>
                                </div>
                            ) : (
                                <span></span>
                            )}
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