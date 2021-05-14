import React from 'react';


const notecard = ({ categories, priorities, themes, note, noteconfig, clicked }) => {
    const theme = themes.filter((f) => f.id === note.theme)[0]
    const background_classes = `card bg-${theme.background}`
    const title_classes = `card-title text-nowrap text-truncate text-capitalize text-${theme.color}`
    const expand_ctrl = `fa fa-expand text-${theme.icon} font-weight-bold py-2`
    const edit_ctrl = `fa fa-edit text-${theme.icon} font-weight-bold py-2 pl-3 pr-3`
    const delete_ctrl = `fa fa-trash text-${theme.icon} font-weight-bold py-2 pl-3`
    const cat_ctrl = `badge badge-${theme.icon} align-self-center`
    const cat_text = `text-${theme.cat} text-weight-bold`
    const category = categories.filter((f) => f.id === note.category)[0].text
    const priority = priorities.filter((f) => f.id === note.priority)[0].text

    return (
        <div className={background_classes}>
            <div className="card-header py-1">
                <div className="d-flex flex-row justify-content-between">
                    <span className={title_classes}>{note.title}</span>
                    {/* <i className={expand_ctrl} name="expand" id={note.id} onClick={clicked}></i> */}
                </div>
                <div className="d-flex flex-row justify-content-between">
                    <span className={cat_text}>{category}</span>
                    <span className={cat_ctrl}>{priority}</span>
                </div>
            </div>
            <div className="card-body notecard-body py-4 bg-white">
                <blockquote className="text-wrap text-truncate px-1 py-1">{note.content}</blockquote>
            </div>
            <div className="card-footer d-flex flex-row justify-content-between p-0">
                <i className={delete_ctrl} name="trash" id={note.id} onClick={clicked}></i>
                <i className={edit_ctrl} name="edit" id={note.id} onClick={clicked}></i>
            </div>
        </div >
    );
}

export default notecard;