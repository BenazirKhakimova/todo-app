import PropTypes from 'prop-types'
import React, { useState } from 'react'
import './NewTaskForm.css'

const NewTaskForm = ({ addTask }) => {
  const [label, setLabel] = useState('')
  const [minutes, setMinutes] = useState('')
  const [seconds, setSeconds] = useState('')

  const onTaskAdd = (e) => {
    setLabel(e.target.value)
  }

  const onMinutesAdd = (e) => {
    const min = parseInt(e.target.value, 10)
    setMinutes(min)
  }

  const onSecondsAdd = (e) => {
    const sec = parseInt(e.target.value, 10)
    setSeconds(sec)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (label.length !== 0) {
      addTask(label, minutes, seconds)
    }
    setLabel('')
    setMinutes('')
    setSeconds('')
  }

  return (
    <form onSubmit={onSubmit} className="new-todo-form">
      <input
        className="new-todo"
        placeholder="Task"
        value={label}
        onChange={onTaskAdd}
      />
      <input
        className="new-todo-form__timer"
        placeholder="Min"
        value={minutes}
        onChange={onMinutesAdd}
        type="number"
        min={0}
      />
      <input
        className="new-todo-form__timer"
        placeholder="Sec"
        value={seconds}
        onChange={onSecondsAdd}
        type="number"
        max={59}
        min={0}
      />
      <button type="submit" />
    </form>
  )
}

NewTaskForm.defaultProps = {
  addTask: () => {},
}
NewTaskForm.propTypes = {
  addTask: PropTypes.func,
}
export default NewTaskForm
