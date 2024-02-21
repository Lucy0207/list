import "./task.css";

import React from "react";

import {formatDistanceToNow} from "date-fns";
import PropTypes from "prop-types";

export default class Task extends React.Component {

    state = {
        timerMinutes: parseInt(this.props.timeMin),
        timerSeconds: parseInt(this.props.timeSec),
    }


    componentWillUnmount() {
        clearInterval(this.timer)
    }

    startTimer = () => {

        this.timer = setInterval(() => {

            const {timerMinutes, timerSeconds} = this.state;

            if(timerMinutes === 0 && timerSeconds === 0) {
                clearInterval(this.timer);
            } else if (timerSeconds === 0) {
                this.setState({
                    timerMinutes: timerMinutes - 1,
                    timerSeconds: 59
                })
            } else {
                this.setState({
                    timerSeconds: timerSeconds - 1
                })
            }

        }, 1000)
    }



    pauseTimer = () => {
        clearInterval(this.timer);

    }

    render()
    {
        const {description, editing, onToggleCompleted, date, completed} = this.props;
        if (completed) {
            clearInterval(this.timer)
        }
        const {timerMinutes, timerSeconds} = this.state;
        return (
            <>
                <div className="view">
                    <input
                        className="toggle"
                        type="checkbox"
                        defaultChecked={this.props.completed}
                                              onChange={onToggleCompleted}
                    />
                    <label>
                        <span className="title">{description}</span>
                        <span className="description">
                {timerMinutes}:{timerSeconds < 10 ? `0${timerSeconds}` : timerSeconds}
                  <button className="icon icon-play" onClick={this.startTimer}></button>
                  <button className="icon icon-pause" onClick={this.pauseTimer}></button>
            </span>                    <span className="description">
              {" "}
                {`created ${formatDistanceToNow(date, {
                                includeSeconds: true,
                                addSuffix: true,
                            })}`}
            </span>
                    </label>
                    <button className="icon icon-edit"></button>
                    <button  className="icon icon-destroy"
                             onClick={this.props.onDeleted}
                    ></button>
                </div>
                {editing && <input type="text" className="edit" value={description}/>}
            </>
        );
    }
}

Task.propTypes = {
    description: PropTypes.string,
    timeMin: PropTypes.string,
    timeSec: PropTypes.string,
    date: PropTypes.instanceOf(Date),
    editing: PropTypes.bool,
    onToggleCompleted: PropTypes.func.isRequired,
    completed: PropTypes.bool,
    onDeleted: PropTypes.func.isRequired
};
