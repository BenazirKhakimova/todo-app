import React, { Component } from 'react';
import Footer from '../Footer/Footer';
import NewTaskForm from '../NewTaskForm/NewTaskForm';
import TaskList from '../TaskList/TaskList';
import './App.css';

export default class App extends Component {
	state = {
		todoData: [
			{ id: 1, label: 'Completed task', done: false },
			{ id: 2, label: 'Editing task', done: false },
			{ id: 3, label: 'Active task', done: false },
		],
	};
	deleteItem = (id) => {
		this.setState(({ todoData }) => {
			const index = todoData.findIndex((todo) => todo.id === id);
			const [...newArray] = todoData;
			newArray.splice(index, 1);
			return {
				todoData: newArray,
			};
		});
	};

	handleCompleted = (id) => {
		this.setState(({ todoData }) => {
			const index = todoData.findIndex((todo) => todo.id === id);
			const oldItem = todoData[index]
			const newItem = {...oldItem, done: !oldItem.done}

			const newArray = Object.assign([], todoData)
			newArray.splice(index, 1, newItem)
			
			return {
				todoData: newArray,
			};
		});
	};
	render() {
		return (
			<section className='todoapp'>
				<header className='header'>
					<NewTaskForm />
				</header>
				<section className='main'>
					<TaskList
						deleteItem={this.deleteItem}
						handleCompleted={this.handleCompleted}
						todoData={this.state.todoData}
					/>
					<Footer />
				</section>
			</section>
		);
	}
}
