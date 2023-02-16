import React from 'react';
import Task from '../Task/Task';
import './TaskList.css';

const TaskList = ({ todoData }) => {
	const element = todoData.map((todo) => {
		const { id, ...label } = todo;
		return (
			<Task
				key={id}
				{...label}
			/>
		);
	});
	return <ul className='todo-list'>{element}</ul>;
};

export default TaskList;
