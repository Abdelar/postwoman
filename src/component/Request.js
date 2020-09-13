import React from 'react';
import { METHODS } from '../helpers/Methods';
import Tooltip from '@material-ui/core/Tooltip';
import './Request.css';

export const Request = props => {
	return (
		<section className='request'>
			<h2>Request</h2>
			<div className='intro'>
				<input
					name='method'
					list='methods'
					title='GET by default'
					className='methods'
					placeholder='METHOD'
					onChange={event => props.changed({ method: event.target.value })}
				/>
				<datalist id='methods'>
					{METHODS.map(method => {
						return (
							<option key={method} value={method}>
								{method}
							</option>
						);
					})}
				</datalist>
				<input
					className='url'
					placeholder='URL'
					onChange={event => props.changed({ url: event.target.value })}
				/>
				<button
					className='send'
					onClick={props.sendRequest}
					disabled={!props.requestState.url || props.disableSend}>
					Send
				</button>
			</div>
			<div className='input_element'>
				<label>
					Headers
					<Tooltip title='Optional: Pass your headers as a JSON object'>
						<span>i</span>
					</Tooltip>
				</label>
				<textarea
					placeholder='Type the headers of the request here in JSON format'
					onChange={event =>
						props.changed({
							headers: event.target.value,
						})
					}
					rows={props.requestState.headers ? 10 : 1}
				/>
			</div>
			<div className='input_element'>
				<label>
					Body
					<Tooltip title={'Optional: Plain text or JSON format'}>
						<span>i</span>
					</Tooltip>
				</label>
				<textarea
					placeholder='Type the body of the request here in JSON format'
					onChange={event => props.changed({ data: event.target.value })}
					rows={props.requestState.data ? 10 : 1}
				/>
			</div>
			<div className='input_element'>
				<label>
					Other Options
					<Tooltip
						interactive
						title='Optional: Pass a additional options as a JSON object, something like: responseType, timeout, proxy, maxRedirects, maxBodyLength, maxContentLength... Visit https://github.com/axios/axios#request-config to see what options you can add to the http request.'>
						<span>i</span>
					</Tooltip>
				</label>
				<textarea
					onChange={event => props.changed({ options: event.target.value })}
					placeholder='You can pass a JSON object containing other parameters that you want to add to the request'
					rows={props.requestState.options ? 10 : 1}
				/>
			</div>
		</section>
	);
};
