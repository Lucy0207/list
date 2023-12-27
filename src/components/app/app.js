import React from 'react';

import Header from "../header/header";
import Footer from "../footer/footer";
import TaskList from "../task-list/task-list";
import "./app.css";

export default  class App extends React.Component{

    state = {
        todoData: [
            {description: "Completed task", created: "created 17 seconds ago", completed: true, editing: false, id: 1},
            {description: "Editing task", created: "created 5 minutes ago", completed: false, editing: true, id: 2},
            {description: "Active task", created: "created 5 minutes ago", completed: false, editing: false, id: 3},
        ]
    }

    deleteItem = (id) => {


        this.setState(({todoData}) => {
            const index = todoData.findIndex((el) => el.id === id);
            const before = todoData.slice(0, index);
            const after = todoData.slice(index + 1);
            const newArray = [...before, ...after];

            return {
                todoData: newArray
            }

        })
    }

    render() {
        return (
            <section className="todoapp">
                <Header />
                <section className="main">
                    <TaskList
                        todos={this.state.todoData}
                        onDeleted={this.deleteItem}
                    />
                    <Footer />
                </section>


            </section>
        );
    }

};

