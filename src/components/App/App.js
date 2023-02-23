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

    createItem(label) {
        return {
            id: this.maxId.id++,
            label,
            done: false,
            time: Date.now(),
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

    addTask = (label) => {
        const newTask = this.createItem(label)
        this.setState(({ todoData }) => {
            const newArray = [...todoData, newTask]
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
