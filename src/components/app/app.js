import React from 'react';

import Header from "../header/header";
import Footer from "../footer/footer";
import TaskList from "../task-list/task-list";
import "./app.css";

const App = () => {

    return (
        <section className="todoapp">
            <Header />
            <section className="main">
                <TaskList />
                <Footer />
            </section>


        </section>
    );
};

export default App;