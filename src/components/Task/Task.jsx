import React, { Component } from 'react';
import './Task.css';

export default class Task extends Component {
	render() {
		const { label, deleteItem, handleCompleted , done} = this.props;
		let classNames = null;
		if (done) {
			classNames = 'completed';
		}
		return (
			<li className={classNames}>
				<div className='view'>
					<input
						className='toggle'
						type='checkbox'
						onClick={handleCompleted}
					/>
					<label>
						<span className='description'>{label}</span>
						<span className='created'>created 17 seconds ago</span>
					</label>
					<button className='icon icon-edit'></button>
					<button
						onClick={deleteItem}
						className='icon icon-destroy'></button>
				</div>
			</li>
		);
	}
}
