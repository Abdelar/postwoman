import React from 'react';

export const Response = props => {
	const res = props.responseState.response;
	const err = props.responseState.error;
	return (
		<section className='response'>
			<h2>Response</h2>
			<div className='input_element'>
				<label>Status</label>
				<textarea
					value={
						res && res.status ? res.status : err && err.status ? err.status : ''
					}
					placeholder=''
					readOnly
					rows={1}
				/>
			</div>
			<div className='input_element'>
				<label>Status Text</label>
				<textarea
					value={
						res && res.statusText
							? res.statusText
							: err && err.statusText
							? err.statusText
							: ''
					}
					placeholder=''
					rows={1}
					readOnly
				/>
			</div>
			<div className='input_element'>
				<label>Data</label>
				<textarea
					value={
						res && res.data
							? JSON.stringify(res.data, undefined, 4)
							: err && err.data
							? JSON.stringify(err.data, undefined, 4)
							: ''
					}
					className={(res && res.data) || (err && err.data) ? 'expand' : ''}
					placeholder=''
					readOnly
				/>
			</div>
			<div className='input_element'>
				<label>Headers</label>
				<textarea
					value={
						res && res.headers
							? JSON.stringify(res.headers, undefined, 4)
							: err && err.headers
							? JSON.stringify(err.headers, undefined, 4)
							: ''
					}
					className={
						(res && res.headers) || (err && err.headers) ? 'expand' : ''
					}
					placeholder=''
					readOnly
				/>
			</div>
			<div className='input_element'>
				<label>Config</label>
				<textarea
					value={
						res && res.config
							? JSON.stringify(res.config, undefined, 4)
							: err && err.config
							? JSON.stringify(err.config, undefined, 4)
							: ''
					}
					className={(res && res.config) || (err && err.config) ? 'expand' : ''}
					placeholder=''
					readOnly
				/>
			</div>
		</section>
	);
};
