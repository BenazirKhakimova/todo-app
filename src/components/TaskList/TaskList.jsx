import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Task from '../Task/Task'
import './TaskList.css'

const TaskList = ({
  todoData,
  deleteItem,
  handleCompleted,
  tick,
  togglePause,
  intervalId,
}) => {
  const element = todoData.map((todo) => {
    const { id, time, ...label } = todo
    return (
      <div key={id}>
        <Task
          {...label}
          id={id}
          deleteItem={() => deleteItem(id)}
          handleCompleted={() => handleCompleted(id)}
          time={time}
          tick={tick}
          togglePause={togglePause}
          intervalId={intervalId}
        />
      </div>
    )
  })
  return <ul className="todo-list">{element}</ul>
}
TaskList.defaultProps = {
  todoData: [],
}
TaskList.propTypes = {
  todoData: PropTypes.arrayOf(PropTypes.object),
  deleteItem: PropTypes.func,
  handleCompleted: PropTypes.func,
}
export default TaskList
