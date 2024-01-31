import React from 'react'
import PropTypes from 'prop-types'

import Task from '../Task/Task'
import './TaskList.css'

const TaskList = ({
  todoData,
  deleteItem,
  handleCompleted,
  togglePause,
  editTodo,
}) => {
  const element = todoData.map((todo) => {
    return (
      <div key={todo.id}>
        <Task
          todo={todo}
          deleteItem={deleteItem}
          handleCompleted={handleCompleted}
          togglePause={togglePause}
          editTodo={editTodo}
        />
      </div>
    )
  })
  return <ul className="todo-list">{element}</ul>
}
TaskList.defaultProps = {
  todoData: [],
  deleteItem: () => {},
  handleCompleted: () => {},
  togglePause: () => {},
}
TaskList.propTypes = {
  todoData: PropTypes.arrayOf(PropTypes.object),
  deleteItem: PropTypes.func,
  handleCompleted: PropTypes.func,
  togglePause: PropTypes.func,
}
export default TaskList
