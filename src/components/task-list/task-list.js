import "./task-list.css";

import React from 'react';
import Task from "../task/task";

const TaskList = () => {

    return (

            <ul className="todo-list">
                <Task completed={true} description="Completed task" created="created 17 seconds ago" />
                <Task editing={true} description="Editing task" created="created 5 minutes ago" />
                <Task description="Active task" created="created 5 minutes ago" />
            </ul>

    );
};

export default TaskList;