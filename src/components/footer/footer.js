import "./footer.css";

import React from 'react';
import Filters from "../filters/filters";
import PropTypes from "prop-types";

export default class Footer extends React.Component {

    state = {
        todoItems: this.props.todos
    }


    componentDidUpdate(prevProps) {
        if (prevProps.todos !== this.props.todos) {
            this.setState({ todoItems: this.props.todos });
        }
    }
    render() {
        const {setFilter, onClearComplete} = this.props;
        const {todoItems} = this.state;
        const toDoCount = todoItems.filter(item => !item.completed).length;
        return (
            <footer className="footer">
                <span className="todo-count">{toDoCount === 1 ? toDoCount + " item left" : toDoCount + " items left"} </span>
                <Filters setFilter={setFilter} />
                <button
                    className="clear-completed"
                    onClick={onClearComplete}
                >
                    Clear completed</button>
            </footer>
        );
    }


};

Footer.propTypes = {
    toDoCount: PropTypes.number,
    onClearComplete: PropTypes.func.isRequired,
    setFilter: PropTypes.func.isRequired
}

Footer.defaultProps = {
    toDoCount: 0,
    filter: 'All',
};