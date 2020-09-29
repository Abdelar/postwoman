import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import { LogTooltip } from './LogTooltip';
import './Logs.css';

export const Logs = props => {
	const HtmlTooltip = withStyles(theme => ({
		tooltip: {
			backgroundColor: 'var(--tooltip-background)',
			color: 'var(--tooltip-foreground)',
			maxWidth: 300,
			fontSize: theme.typography.pxToRem(12),
			textAlign: 'center',
			border: '1px solid var(--tooltip-borders)',
		},
	}))(Tooltip);

	return (
		<article className='logs'>
			<h2>Logs</h2>
			<div className='logs_body'>
				{!props.logs.length && (
					<h3>
						Wow, such empty{' '}
						<span role='img' aria-label='wind imoji'>
							💨
						</span>
					</h3>
				)}
				{props.logs.map(log => {
					return (
						<HtmlTooltip
							arrow
							interactive
							title={<LogTooltip log={log} />}
							key={log.config.requestID}>
							<div className='log'>
								<span className='log_url'>{log.config.url}</span>
								<span className='log_timestamp'>{log.config.sendingTime}</span>
							</div>
						</HtmlTooltip>
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
