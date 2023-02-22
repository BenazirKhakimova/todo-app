import { formatDistanceToNow } from 'date-fns';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Task.css';

export default class Task extends Component {
	static defaultProps = {
		deleteItem: () => {},
		handleCompleted: () => {},
		done: false,
		time: Date.now(),
	};

	static propTypes = {
		label: PropTypes.string.isRequired,
		deleteItem: PropTypes.func,
		handleCompleted: PropTypes.func,
		done: PropTypes.bool,
		time: PropTypes.number,
	};

	render() {
		const { label, deleteItem, handleCompleted, done, time } = this.props;
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
						checked={done}
						onChange={handleCompleted}
					/>
					<label>
						<span className='description'>{label}</span>
						<span className='created'>
							{`
							created ${formatDistanceToNow(time, { includeSeconds: true })} ago`}
						</span>
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
