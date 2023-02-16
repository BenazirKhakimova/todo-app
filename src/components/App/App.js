import React, { Component } from 'react';
import Footer from '../Footer/Footer';
import NewTaskForm from '../NewTaskForm/NewTaskForm';
import TaskList from '../TaskList/TaskList';
import './App.css';

export default class App extends Component {
	state = {
		todoData: [
			{ id: 1, label: 'Completed task' },
			{ id: 2, label: 'Editing task' },
			{ id: 3, label: 'Active task' },
		],
	};
	render() {
		return (
			<section className='todoapp'>
				<header className='header'>
					<button className='add-todo'>Add Todo</button>
					<NewTaskForm />
				</header>
				<section className='main'>
					<TaskList todoData={this.state.todoData} />
					<Footer />
				</section>
			</section>
		);
	}
}
