import React from 'react'
import PropTypes from 'prop-types'
import './TaskFilter.css'

const TaskFilter = ({ onChangeFilter, filter }) => {
  const buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'completed', label: 'Completed' },
  ]
  return (
    <div>
      <ul className="filters">
        {buttons.map(({ name, label }) => {
          const isActive = filter === name
          return (
            <li key={name}>
              <button
                type="button"
                className={isActive ? 'selected' : null}
                onClick={() => onChangeFilter(name)}>
                {label}
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

TaskFilter.defaultProps = {
  filter: 'all',
  onChangeFilter: () => {},
}
TaskFilter.propTypes = {
  filter: PropTypes.string,
  onChangeFilter: PropTypes.func,
}
export default TaskFilter
