import "./task.css";

import React from 'react';

export default class Task extends React.Component {

    render() {
        const {description, created, editing, onToggleCompleted} = this.props;
        return (
            <>
                <div className="view" >
                    <input className="toggle" type="checkbox" defaultChecked={this.props.completed} onChange={this.props.onToggleCompleted}/>
                    <label >
                        <span className="description">{description}</span>
                        <span className="created">{created}</span>
                    </label>
                    <button className="icon icon-edit"></button>
                    <button
                        className="icon icon-destroy"
                        onClick={this.props.onDeleted}
                    ></button>
                </div>
                {editing && <input type="text" className="edit" value={description} />}
            </>
        );
    }

};

