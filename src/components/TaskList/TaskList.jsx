import React, { Component } from 'react';
import Task from '../Task/Task';
import './TaskList.css';

export default class TaskList extends Component {

	render() {
		const { todoData, deleteItem, handleCompleted} = this.props;
		
		
		const element = todoData.map((todo) => {
			const { id, ...label } = todo;
			return (
				<div
					key={id}>
					<Task
						{...label}
						deleteItem={() => deleteItem(id)}
						handleCompleted={() => handleCompleted(id)}
					/>
				</div>
			);
		});
		return <ul className='todo-list'>{element}</ul>;
	}
}
