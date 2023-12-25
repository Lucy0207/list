import "./task.css";

import React from 'react';
// completed, editing, description, created
export default class Task extends React.Component {

    render() {
        const {description, created, editing} = this.props;
        return (
            <>
                <div className="view">
                    <input className="toggle" type="checkbox" />
                    <label>
                        <span className="description">{description}</span>
                        <span className="created">{created}</span>
                    </label>
                    <button className="icon icon-edit"></button>
                    <button className="icon icon-destroy"></button>
                </div>
                {editing && <input type="text" className="edit" value={description} />}
            </>
        );
    }

};

