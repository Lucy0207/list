import React from 'react';

import Header from "../header/header";
import Footer from "../footer/footer";
import TaskList from "../task-list/task-list";


import "./app.css";

export default  class App extends React.Component{

    maxId = 100;


    createToDoItem = (description) => {
        return {
            description,
            date: new Date(),
            completed: false,
            editing: false,
            id: this.maxId++
        }
    }

    state = {
        todoData: [
            this.createToDoItem("Completed task"),
            this.createToDoItem("Editing task"),
            this.createToDoItem("Active task"),
            ],
        filter: "all"
    }

    setFilter = (filter) => {
        this.setState({filter});
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

    clearComplete = () => {
        this.setState(({todoData}) => {
            const completed = todoData.filter((el => !el.completed));
            return {
                todoData: completed
            }
        } )
    }


    addItem = (text) => {
        const newItem = this.createToDoItem(text);
        this.setState(({ todoData }) => {
            const newArr = [...todoData, newItem];
            return {
                todoData: newArr
            }
        })
    }

    onToggleCompleted = (id) => {
        this.setState(({ todoData }) => {
            const index = todoData.findIndex((el) => el.id === id);
            const oldItem = todoData[index];
            const newItem = {...oldItem, completed: !oldItem.completed}
            const newArray = [...todoData.slice(0, index), newItem, ...todoData.slice(index + 1)];
            return {
                todoData: newArray
            }
        })
    }

    render() {
        return (
            <section className="todoapp">
                <Header onItemAdded={this.addItem} />
                <section className="main">
                    <TaskList
                        todos={this.state.todoData}
                        onDeleted={this.deleteItem}
                        onToggleCompleted={this.onToggleCompleted}
                        filter={this.state.filter}

                    />
                    <Footer
                        setFilter={this.setFilter}
                        todos={this.state.todoData}
                        onClearComplete={this.clearComplete}
                    />
                </section>


            </section>
        );
    }

};

