import classNames from 'classnames'
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import './Task.css'

const Task = ({ todo, deleteItem, handleCompleted, togglePause, editTodo }) => {
  const [editTodoId, setEditTodoId] = useState(false)
  const { id, label, done, time, minutes, seconds, isPaused } = todo
  const [newLabel, setNewLabel] = useState('')
  const completed = classNames({ completed: done })

  const handleEditChange = (editedId) => {
    setEditTodoId(editedId)
  }
  const onLabelChange = (e) => {
    setNewLabel(e.target.value)
  }
  const onSubmit = (e) => {
    e.preventDefault()
    if (label.length !== 0) {
      editTodo(id, newLabel)
    }
    setEditTodoId(false)
  }
  return (
    <li className={`${completed}`}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={done}
          onChange={() => handleCompleted(id)}
        />
        {editTodoId === id ? (
          <li className="editing">
            <form onSubmit={onSubmit}>
              <input
                id="edit"
                className="edit"
                type="text"
                onChange={(e) => onLabelChange(e)}
                value={editTodoId === id ? newLabel : label}
                ref={(input) => input && input.focus()}
              />
            </form>
          </li>
        ) : (
          <>
            <label>
              <span className="title">{label}</span>
              <span className="description">
                <button
                  type="button"
                  className={`icon ${
                    isPaused || done || (minutes === 0 && seconds === 0)
                      ? 'icon-play'
                      : 'icon-pause'
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
            <button
              type="button"
              className="icon icon-edit"
              onClick={() => handleEditChange(id)}
            />
            <button
              type="button"
              onClick={() => deleteItem(id)}
              className="icon icon-destroy"
            />
          </>
        )}
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
