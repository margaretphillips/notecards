import React from 'react';

const controls = (props) => {
    return (
        <div className="d-flex flex-row justify-content-between align-items-center bg-dark py-3">
            <div className="text-light d-flex d-inline-flex pr-3">
                <div className="form-group pr-4">
                    <select className="form-control" onChange={clicked}>
                        {props.categories.map(({ id, text }) => { return <option key={id} value={id}>{text}</option> })}
                    </select>
                </div>
                <i className="fa fa-plus-circle text-success font-weight-bold py-2" name="add"></i>
            </div>
        </div>
    );
}

export default controls;