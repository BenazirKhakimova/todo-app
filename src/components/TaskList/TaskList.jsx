import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Task from '../Task/Task'
import './TaskList.css'

export default class TaskList extends Component {
  static defaultProps = {
    todoData: [],
  }

  static propTypes = {
    todoData: PropTypes.arrayOf(PropTypes.object),
    deleteItem: PropTypes.func,
    handleCompleted: PropTypes.func,
  }

  render() {
    const { todoData, deleteItem, handleCompleted } = this.props
    const element = todoData.map((todo) => {
      const { id, time, ...label } = todo
      return (
        <div key={id}>
          <Task
            {...label}
            deleteItem={() => deleteItem(id)}
            handleCompleted={() => handleCompleted(id)}
            time={time}
          />
        </div>
      )
    })
    return <ul className="todo-list">{element}</ul>
  }
}
