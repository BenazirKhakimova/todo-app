import React, { useCallback, useEffect, useRef, useState } from 'react'

import Footer from '../Footer/Footer'
import NewTaskForm from '../NewTaskForm/NewTaskForm'
import TaskList from '../TaskList/TaskList'
import './App.css'

const App = () => {
  const [movieId, setMovieId] = useState(1)
  const [todoData, setTodoData] = useState([])
  const [filter, setFilter] = useState('all')

  const createItem = (label, minutes, seconds) => {
    return {
      id: movieId,
      label,
      done: false,
      time: Date.now(),
      minutes: minutes || 0,
      seconds: seconds || 0,
      isPaused: false,
    }
  }

  const addTask = (label, minutes, seconds) => {
    setMovieId((id) => id + 1)
    const newTask = createItem(label, minutes, seconds)
    setTodoData([...todoData, newTask])
  }

  const deleteItem = (id) => {
    const deleted = todoData.filter((todo) => todo.id !== id)
    setTodoData(deleted)
  }

  const handleCompleted = (id) => {
    const done = todoData.map((todo) =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    )
    setTodoData(done)
  }
  const clearCompleted = () => {
    const deleteDone = todoData.filter((task) => !task.done)
    setTodoData(deleteDone)
  }

  const onChangeFilter = (f) => {
    setFilter(f)
  }

  const filterTasks = (tasks, f) => {
    switch (f) {
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

  const intervalId = useRef(null)
  const tick = useCallback(() => {
    intervalId.current = setTimeout(() => {
      const newArray = todoData.map((todo) => {
        const { isPaused, done, minutes, seconds } = todo
        if (!isPaused && !done) {
          if (minutes === 0 && seconds === 0) {
            clearTimeout(intervalId.current)
            return todo
          }
          if (seconds > 0) {
            return { ...todo, minutes, seconds: seconds - 1 }
          }
          return { ...todo, minutes: minutes - 1, seconds: 59 }
        }
        return todo
      })
      tick()
      setTodoData(newArray)
    }, 1000)
  }, [todoData])

  useEffect(() => {
    tick()
    return () => clearTimeout(intervalId.current)
  }, [tick])

  const togglePause = (id) => {
    setTodoData(
      todoData.map((todo) => {
        const { isPaused } = todo
        if (todo.id === id) {
          return { ...todo, isPaused: !isPaused }
        }
        return todo
      })
    )
  }

  const upGradeList = filterTasks(todoData, filter)

  return (
    <section className="todoapp">
      <header className="header">
        <NewTaskForm addTask={addTask} />
      </header>
      <section className="main">
        <TaskList
          deleteItem={deleteItem}
          handleCompleted={handleCompleted}
          todoData={upGradeList}
          togglePause={togglePause}
        />
        <Footer
          todoData={todoData}
          clearCompleted={clearCompleted}
          filter={filter}
          onChangeFilter={onChangeFilter}
        />
      </section>
    </section>
  )
}
export default App
