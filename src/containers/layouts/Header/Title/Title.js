import React from 'react';

const title = (props) => {
    return (
        <div className="d-flex flex-row justify-content-between align-items-center bg-dark py-3">
            {props.editname === false ? (
                <div className="text-light d-flex d-inline-flex">
                    <h3 className="mx-3">{props.title}</h3>
                    <i className="fa fa-edit text-success font-weight-bold py-2" onClick={props.clicked}></i>

                </div>) : (
                <div className="text-light d-flex d-inline-flex">
                    <div className="form-group d-flex d-inline-flex ml-3">
                        <input type="text" className="form-control mr-2" placeholder={props.title} onChange={props.changed} />
                        <i className="fa fa-plus-circle text-success font-weight-bold py-2" onClick={props.clicked}></i>
                    </div>
                </div>
            )}
        </div>
    );
}

export default title;