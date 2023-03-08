import React, { Component } from 'react'

import Footer from '../Footer/Footer'
import NewTaskForm from '../NewTaskForm/NewTaskForm'
import TaskList from '../TaskList/TaskList'
import './App.css'

export default class App extends Component {
  maxId = {
    id: 1,
  }

  state = {
    todoData: [],
    filter: 'all',
  }

  findIndex = (arr, id) => {
    return arr.findIndex((todo) => todo.id === id)
  }

  createItem(label, minutes, seconds) {
    return {
      id: this.maxId.id++,
      label,
      done: false,
      time: Date.now(),
      minutes: minutes || 0,
      seconds: seconds || 0,
      isPaused: false,
    }
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const index = this.findIndex(todoData, id)
      const newArray = JSON.parse(JSON.stringify(todoData))
      newArray.splice(index, 1)
      return {
        todoData: newArray,
      }
    })
  }

  handleCompleted = (id) => {
    this.setState(({ todoData }) => {
      const index = this.findIndex(todoData, id)
      const oldItem = todoData[index]
      const newItem = { ...oldItem, done: !oldItem.done }

      const newArray = JSON.parse(JSON.stringify(todoData))
      newArray.splice(index, 1, newItem)

      return {
        todoData: newArray,
      }
    })
  }

  addTask = (label, minutes, seconds) => {
    const newTask = this.createItem(label, minutes, seconds)
    this.setState(({ todoData }) => {
      const newArray = [newTask, ...todoData]
      return {
        todoData: newArray,
      }
    })
  }

  clearCompleted = () => {
    this.setState(({ todoData }) => {
      let newArray = JSON.parse(JSON.stringify(todoData))
      newArray = newArray.filter((task) => !task.done)
      return {
        todoData: newArray,
      }
    })
  }

  onChangeFilter = (filter) => {
    this.setState({ filter })
  }

  filterTasks = (tasks, filter) => {
    switch (filter) {
      case 'all':
        return tasks
      case 'active':
        return tasks.filter((task) => !task.done)
      case 'completed':
        return tasks.filter((task) => task.done)
      default:
        return tasks
    }
  }

  tick = () => {
    this.intervalId = setTimeout(() => {
      const { todoData } = this.state
      const oldArray = JSON.parse(JSON.stringify(todoData))

      const newArray = oldArray.map((todo) => {
        const { isPaused, done, minutes, seconds } = todo
        if (!isPaused && !done) {
          if (minutes === 0 && seconds === 0) {
            clearTimeout(this.intervalId)
            return todo
          }
          if (seconds > 0) {
            return { ...todo, minutes, seconds: seconds - 1 }
          }
          return { ...todo, minutes: minutes - 1, seconds: 59 }
        }
        return todo
      })
      this.tick()
      this.setState({ todoData: newArray })
    }, 1000)
  }

  togglePause = (id) => {
    this.setState((prevState) => ({
      todoData: prevState.todoData.map((todo) => {
        const { isPaused } = todo
        if (todo.id === id) {
          return { ...todo, isPaused: !isPaused }
        }
        return todo
      }),
    }))
  }

  render() {
    const { todoData, filter } = this.state
    const upGradeList = this.filterTasks(todoData, filter)

    return (
      <section className="todoapp">
        <header className="header">
          <NewTaskForm addTask={this.addTask} />
        </header>
        <section className="main">
          <TaskList
            deleteItem={this.deleteItem}
            handleCompleted={this.handleCompleted}
            todoData={upGradeList}
            tick={this.tick}
            togglePause={this.togglePause}
            intervalId={this.intervalId}
          />
          <Footer
            todoData={todoData}
            clearCompleted={this.clearCompleted}
            filter={filter}
            onChangeFilter={this.onChangeFilter}
          />
        </section>
      </section>
    )
  }
}
