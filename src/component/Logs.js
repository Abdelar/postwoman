import React from 'react';
import './Logs.css';

export const Logs = props => {
	return (
		<article className='logs'>
			<h2>Logs</h2>
			<div className='logs_body'>
				{!props.logs.length && <h3>Wow, such empty</h3>}
				{props.logs.map(log => {
					return (
						<div className='log' key={log.config.sendingTime.toString()}>
							<span className='log_url'>{log.config.url}</span>
							<span className='log_timestamp'>
								{log.config.sendingTime.toString()}
							</span>
						</div>
					);
				})}
				{props.logs.length !== 0 && (
					<button onClick={props.clear} className='log_clear'>
						Clear
					</button>
				)}
			</div>
		</article>
	);
};
