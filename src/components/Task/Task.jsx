import { formatDistanceToNow } from 'date-fns'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Task.css'
import classNames from 'classnames'

export default class Task extends Component {
  static defaultProps = {
    deleteItem: () => {},
    handleCompleted: () => {},
    done: false,
    time: Date.now(),
  }

  static propTypes = {
    label: PropTypes.string.isRequired,
    deleteItem: PropTypes.func,
    handleCompleted: PropTypes.func,
    done: PropTypes.bool,
    time: PropTypes.number,
  }

  componentDidMount() {
    this.props.tick()
  }

  componentWillUnmount() {
    clearTimeout(this.props.intervalId)
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.minutes !== this.props.minutes ||
      prevProps.seconds !== this.props.seconds
    ) {
      clearTimeout(this.props.intervalId)
      this.props.tick()
    }
  }

  render() {
    const {
      id,
      label,
      deleteItem,
      handleCompleted,
      done,
      time,
      togglePause,
      minutes,
      seconds,
      isPaused,
    } = this.props
    const completed = classNames({ completed: done })

    return (
      <li className={`${completed}`}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={done}
            onChange={handleCompleted}
          />
          <label>
            <span className="title">{label}</span>
            <span className="description">
              <button
                type="button"
                className={`icon ${isPaused ? 'icon-play' : 'icon-pause'}`}
                onClick={() => togglePause(id)}
              />
              {minutes < 10 ? `0${minutes}` : minutes} :{' '}
              {seconds < 10 ? `0${seconds}` : seconds}
            </span>
            <span className="description">
              {`
      				created ${formatDistanceToNow(time, { includeSeconds: true })} ago`}
            </span>
          </label>
          <button type="button" className="icon icon-edit" />
          <button
            type="button"
            onClick={deleteItem}
            className="icon icon-destroy"
          />
        </div>
        <input type="text" className="edit" />
      </li>
    )
  }
}
