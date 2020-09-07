import Axios from 'axios';
import React, { useReducer, useEffect } from 'react';

import './App.css';

const METHODS = [
	'GET',
	'POST',
	'PUT',
	'DELETE',
	'PATCH',
	'HEAD',
	'OPTIONS',
	'CONNECT',
	'TRACE',
];

const initialRequestState = {
	transformRequest: (data, headers) => {
		try {
			const transformedData = JSON.parse(data);
			return transformedData;
		} catch {
			return data;
		}
	},
};
const initialResponseState = {};

const responseReducer = (state, action) => {
	switch (action.type) {
		case 'SET_RESPONSE':
			return { ...state, response: action.response, error: null };
		case 'SET_ERROR':
			return { ...state, error: action.error, response: null };
		default:
			throw new Error('Invalid Request Action');
	}
};

const requestReducer = (state, action) => {
	switch (action.type) {
		case 'URL_CHANGE':
			return {
				...state,
				url: action.url,
			};
		case 'METHOD_CHANGE':
			return {
				...state,
				method: action.method,
			};
		case 'HEADERS_CHANGE':
			return {
				...state,
				headers: action.headers,
			};
		case 'BODY_CHANGE':
			return {
				...state,
				data: action.body,
			};
		case 'OPTIONS_CHANGE':
			return {
				...state,
				options: action.options,
			};

		default:
			throw new Error('Invalid Response Action');
	}
};

function App() {
	const [requestState, dispatch] = useReducer(
		requestReducer,
		initialRequestState
	);

	const [responseState, dispatchResponse] = useReducer(
		responseReducer,
		initialResponseState
	);

	useEffect(() => {
		// console.log(requestState);
	}, [requestState]);
	useEffect(() => {
		console.log(responseState);
	}, [responseState]);

	const onUrlChange = event => {
		dispatch({ type: 'URL_CHANGE', url: event.target.value });
	};

	const onMethodChange = event => {
		dispatch({ type: 'METHOD_CHANGE', method: event.target.value });
	};

	const onHeadersChange = event => {
		dispatch({ type: 'HEADERS_CHANGE', headers: event.target.value });
	};

	const onBodyChange = event => {
		dispatch({ type: 'BODY_CHANGE', body: event.target.value });
	};

	const onOptionsChange = event => {
		dispatch({ type: 'OPTIONS_CHANGE', options: event.target.value });
	};

	const sendRequest = async () => {
		if (requestState.url) {
			let config = requestState;
			config.url =
				config.url.toLowerCase().startsWith('http://') ||
				config.url.toLowerCase().startsWith('https://')
					? config.url
					: 'http://' + config.url;
			if (requestState.headers) {
				try {
					config.headers = JSON.parse(config.headers);
				} catch {}
			}
			if (requestState.options) {
				try {
					config = { ...config, ...JSON.parse(config.options) };
				} catch {}
			}
			try {
				const res = await Axios(config);
				dispatchResponse({ type: 'SET_RESPONSE', response: res });

				console.log(res);
			} catch (err) {
				dispatchResponse({
					type: 'SET_ERROR',
					error: err.response || err.request || err,
				});
				console.log(err);
				console.log({ error: err.response || err.request || err });
			}
		}
	};

	const res = responseState.response;
	const err = responseState.error;

	return (
		<main className='app'>
			<header>
				<h1>PostWomen</h1>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate,
					repudiandae eius distinctio laboriosam enim quo animi eum recusandae
					eveniet voluptatum, impedit dolor. Impedit laudantium minus deleniti
					ut dignissimos totam quo!
				</p>
			</header>
			<article className='row'>
				<div className='inputs'>
					<section className='request'>
						<h2>Request</h2>
						<div className='intro'>
							<input
								name='method'
								list='methods'
								className='methods'
								placeholder='METHOD'
								onChange={onMethodChange}
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
							<input className='url' placeholder='URL' onChange={onUrlChange} />
							<button
								className='send'
								onClick={sendRequest}
								disabled={!requestState.url}>
								Send
							</button>
						</div>
						<div className='input_element'>
							<label>Headers</label>
							<textarea
								placeholder='Type the headers of the request here'
								onChange={onHeadersChange}
								rows={requestState.headers ? 10 : 1}
							/>
						</div>
						<div className='input_element'>
							<label>Body</label>
							<textarea
								placeholder='Type the body of the request here'
								onChange={onBodyChange}
								rows={requestState.data ? 10 : 1}
							/>
						</div>
						<div className='input_element'>
							<label>Other Options</label>
							<textarea
								onChange={onOptionsChange}
								placeholder='You can pass a JSON object containing other parameters that you want to add to the request'
								rows={requestState.options ? 10 : 1}
							/>
						</div>
					</section>
					<section className='response'>
						<h2>Response</h2>
						<div className='input_element'>
							<label>Status</label>
							<textarea
								value={
									res && res.status
										? res.status
										: err && err.status
										? err.status
										: ''
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
								rows={(res && res.data) || (err && err.data) ? 10 : 1}
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
								rows={(res && res.headers) || (err && err.headers) ? 10 : 1}
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
								rows={(res && res.config) || (err && err.config) ? 10 : 1}
								placeholder=''
								readOnly
							/>
						</div>
					</section>
				</div>
				<article className='logs'>
					<h2>Logs</h2>
				</article>
			</article>
			<footer>elaroussi.me</footer>
		</main>
	);
}

export default App;
