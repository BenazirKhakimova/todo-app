import React, { Component } from 'react';
import './Task.css';

export default class Task extends Component {
	render() {
		const { label } = this.props;
		return (
			<li>
				<div className='view'>
					<input
						className='toggle'
						type='checkbox'
					/>
					<label>
						<span className='description'>{label}</span>
						<span className='created'>created 17 seconds ago</span>
					</label>
					<button className='icon icon-edit'></button>
					<button className='icon icon-destroy'></button>
				</div>
			</li>
		);
	}
}
