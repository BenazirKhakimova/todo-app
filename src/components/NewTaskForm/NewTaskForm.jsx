import React from 'react';

const NewTaskForm = () => {
	return (
		<>
			<h1>todos</h1>
			<input
				className='new-todo'
				placeholder='What needs to be done?'
				autoFocus></input>
		</>
	);
};

export default NewTaskForm;
