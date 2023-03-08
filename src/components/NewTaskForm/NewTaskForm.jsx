import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './NewTaskForm.css'

export default class NewTaskForm extends Component {
  static defaultProps = {
    addTask: () => {},
  }

  static propTypes = {
    addTask: PropTypes.func,
  }

  state = {
    label: '',
    minutes: '',
    seconds: '',
  }

  onTaskAdd = (e) => {
    this.setState({ label: e.target.value })
  }

  onMinutesAdd = (e) => {
    const minutes = parseInt(e.target.value, 10)
    this.setState({ minutes })
  }

  onSecondsAdd = (e) => {
    const seconds = parseInt(e.target.value, 10)
    this.setState({ seconds })
  }

  onSubmit = (e) => {
    e.preventDefault()
    const { label, minutes, seconds } = this.state
    if (this.state.label.length !== 0) {
      this.props.addTask(label, minutes, seconds)
    }
    this.setState({ label: '', minutes: '', seconds: '' })
  }

  render() {
    return (
      <>
        <h1>todos</h1>
        <form onSubmit={this.onSubmit} className="new-todo-form">
          <input
            className="new-todo"
            placeholder="Task"
            value={this.state.label}
            onChange={this.onTaskAdd}
          />
          <input
            className="new-todo-form__timer"
            placeholder="Min"
            value={this.state.minutes}
            onChange={this.onMinutesAdd}
            type="number"
            min={0}
          />
          <input
            className="new-todo-form__timer"
            placeholder="Sec"
            value={this.state.seconds}
            onChange={this.onSecondsAdd}
            type="number"
            max={59}
            min={0}
          />
          <button type="submit" />
        </form>
      </>
    )
  }
}
