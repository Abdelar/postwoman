import React from 'react';
import './LogTooltip.css';
export const LogTooltip = ({ log }) => {
	return (
		<div className='log_tooltip'>
			<h4>{log.config.method.toUpperCase() + ': ' + log.config.url}</h4>
			{log.status && <p>Status: {log.status}</p>}
			{log.statusText && <p>Status Text: {log.statusText}</p>}
			{log.data && <p className='log_data'>Data: {JSON.stringify(log.data)}</p>}
			<span>{log.config.sendingTime}</span>
		</div>
	);
};
