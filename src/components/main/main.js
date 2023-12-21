import "./main.css";

import React from 'react';
import TaskList from "../task-list/task-list";

const Main = () => {
    return (
        <section className="main">
            <TaskList />
        </section>
    );
};

export default Main;