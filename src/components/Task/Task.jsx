import { formatDistanceToNow } from 'date-fns'
import React, { Component, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import './Task.css'
import classNames from 'classnames'

const Task = ({ todo, deleteItem, handleCompleted, togglePause }) => {
  const { id, label, done, time, minutes, seconds, isPaused } = todo

  const completed = classNames({ completed: done })

  return (
    <li className={`${completed}`}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={done}
          onChange={() => handleCompleted(id)}
        />
        <label>
          <span className="title">{label}</span>
          <span className="description">
            <button
              type="button"
              className={`icon ${
                isPaused || done ? 'icon-play' : 'icon-pause'
              }`}
              onClick={() => togglePause(id)}
            />
            {minutes < 10 ? `0${minutes}` : minutes} :
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
          onClick={() => deleteItem(id)}
          className="icon icon-destroy"
        />
      </div>
      <input type="text" className="edit" />
    </li>
  )
}
Task.propTypes = {
  todo: PropTypes.instanceOf(Object),
  deleteItem: PropTypes.func,
  handleCompleted: PropTypes.func,
  togglePause: PropTypes.func,
}

Task.defaultProps = {
  todo: {},
  deleteItem: () => {},
  handleCompleted: () => {},
  togglePause: () => {},
}
export default Task
