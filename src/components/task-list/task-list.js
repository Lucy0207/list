import React from 'react';

import Task from "../task/task";

import "./task-list.css";

const TaskList = ({todos}) => {
    const elements = todos.map((item) => {
        const {id, ...itemProps} = item;
        return (
            <li key={id} className={itemProps.completed ? "completed" : itemProps.editing ? "editing" : ""}>
                <Task {...itemProps}/>
            </li>
        )
    })
    return (
        <ul className="todo-list">{elements}</ul>
    )

};

export default TaskList;