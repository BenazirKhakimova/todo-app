import React from 'react'
import PropTypes from 'prop-types'

import TaskFilter from '../TaskFllter/TaskFilter'

import './Footer.css'

const Footer = ({ todoData, clearCompleted, filter, onChangeFilter }) => {
  const active = todoData.filter((task) => !task.done).length

  return (
    <footer className="footer">
      <span className="todo-count">{active} items left</span>
      <TaskFilter filter={filter} onChangeFilter={onChangeFilter} />
      <button
        type="button"
        className="clear-completed"
        onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  )
}

Footer.defaultProps = {
  clearCompleted: () => {},
  onChangeFilter: () => {},
  filter: 'all',
}
Footer.propTypes = {
  clearCompleted: PropTypes.func,
  todoData: PropTypes.arrayOf(PropTypes.object).isRequired,
  filter: PropTypes.string,
  onChangeFilter: PropTypes.func,
}

export default Footer
