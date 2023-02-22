import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class NewTaskForm extends Component {
	static defaultProps = {
		addTask: () => {},
	};
	static propTypes = {
		addTask: PropTypes.func
	}
	state = {
		label: '',
	};
	onTaskAdd = (e) => {
		this.setState({ label: e.target.value });
	};
	onSubmit = (e) => {
		e.preventDefault();
		if (this.state.label.length !== 0) {
			this.props.addTask(this.state.label);
		}
		this.setState({ label: '' });
	};
	render() {
		return (
			<>
				<h1>todos</h1>
				<form onSubmit={this.onSubmit}>
					<input
						className='new-todo'
						placeholder='What needs to be done?'
						autoFocus
						value={this.state.label}
						onChange={this.onTaskAdd}></input>
				</form>
			</>
		);
	}
}
