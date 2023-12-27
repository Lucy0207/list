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

     onLabelClick(id) {
        const index = this.state.toDoItems.map(item => item.id).indexOf(id);
       this.setState(state => {
           let {toDoItems} = state;
           toDoItems[index].completed = !toDoItems[index].completed;
           return {toDoItems: [...toDoItems]};
       })
    }
    render() {

        const {toDoItems} = this.state;
        const {onDeleted} = this.props;
        const finalTasks = toDoItems.map(item => {
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
                          onLabelClick={() => this.onLabelClick(id)}
                          onDeleted={() => onDeleted(id)}/>
                </li>
            )
        })

        return (
            <ul className="todo-list">{finalTasks}</ul>
        )
    }



};
/*const elements = this.props.todos.map((item) => {

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
                  onLabelClick={() => this.onLabelClick(id)}/>
        </li>
    )
})
return (
    <ul className="todo-list">{elements}</ul>
)*/
