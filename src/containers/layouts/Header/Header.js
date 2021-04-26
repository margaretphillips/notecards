import React from 'react';

const header = (props) => {
    return (
        <div className="d-flex flex-row justify-content-between align-items-center bg-dark py-3">
            {props.editname === false ? (
                <div className="text-light d-flex d-inline-flex">
                    <h3 className="mx-3">{props.title}</h3>
                    <i className="fa fa-edit text-success font-weight-bold py-2" name="edit_title" onClick={props.clicked}></i>

                </div>) : (
                <div className="text-light d-flex d-inline-flex">
                    <div className="form-group d-flex d-inline-flex ml-3">
                        <input type="text" className="form-control mr-2" placeholder={props.title} onChange={props.changed} />
                        {/* <i className="fa fa-plus-circle text-success font-weight-bold py-2"
                            name="save_title" onClick={props.clicked}></i> */}
                    </div>
                </div>
            )}
            <div className="text-light d-flex d-inline-flex pr-3">
                <div className="form-group pr-4">
                    <select className="form-control" onChange={props.changed}>
                        {props.categories.map(({ id, text }) => { return <option key={id} value={id}>{text}</option> })}
                    </select>
                </div>
                <i className="fa fa-plus-circle text-success font-weight-bold py-2"
                    name="add" onClick={props.clicked}></i>
            </div>
        </div>
    );
}

export default header;