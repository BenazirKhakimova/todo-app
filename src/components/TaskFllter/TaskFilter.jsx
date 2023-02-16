import React from 'react';
import './TaskFilter.css';

const TaskFilter = () => {
	return (
		<div>
			<ul className='filters'>
				<li>
					<button className='selected'>All</button>
				</li>
				<li>
					<button>Active</button>
				</li>
				<li>
					<button>Completed</button>
				</li>
			</ul>
		</div>
	);
};

export default TaskFilter;
