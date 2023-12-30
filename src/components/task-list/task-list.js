import React from 'react';

import Task from "../task/task";

import "./task-list.css";

export default class TaskList extends React.Component {

    state = {
        toDoItems: this.props.todos
    }


    componentDidMount() {
        this.setState({ toDoItems: this.props.todos });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.todos !== this.props.todos) {
            this.setState({ toDoItems: this.props.todos });
        }
    }

    filterTasks = (todoItems, filter) => {
        switch (filter) {
            case 'active':
                return todoItems.filter((todo) => !todo.completed);
            case 'completed':
                return todoItems.filter((todo) => todo.completed);
            default:
                return todoItems;
        }
    };


    render() {

        const {toDoItems} = this.state;
        const {onDeleted, onToggleCompleted, filter} = this.props;
        const filteredList = this.filterTasks(toDoItems, filter);
        const finalTasks = filteredList.map(item => {
            const {id, ...itemProps} = item;
            let classNames = "";

            if (item.editing) {
                classNames = "editing";

            } else if (item.completed) {
                classNames = "completed";
            }

            return (
                <li key={id} className={classNames}>
                    <Task {...itemProps}

                          onDeleted={() => onDeleted(id)}
                          onToggleCompleted={() => onToggleCompleted(id)}
                    />
                </li>
            )
        })

        return (
            <ul className="todo-list">{finalTasks}</ul>
        )

        }

}





