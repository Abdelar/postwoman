import React, { useReducer, useEffect } from 'react';

import { Axios } from './Axios';
import { initialRequestState, requestReducer } from './reducers/Request';
import { initialResponseState, responseReducer } from './reducers/Response';
import { Request } from './Request';
import { Intro } from './Intro';
import { Logs } from './Logs';
import { Footer } from './Footer';
import './App.css';

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

	const onRequestChange = (field, value) => {
		// dispatch({ type: field, url: value });
		switch (field) {
			case 'METHOD_CHANGE':
				dispatch({ type: field, method: value });
				break;
			case 'HEADERS_CHANGE':
				dispatch({ type: field, headers: value });
				break;
			case 'URL_CHANGE':
				dispatch({ type: field, url: value });
				break;
			case 'BODY_CHANGE':
				dispatch({ type: field, body: value });
				break;
			case 'OPTIONS_CHANGE':
				dispatch({ type: field, options: value });
				break;
			default:
				throw new Error('There is no such action in the request reducer');
		}
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
			<Intro />
			<article className='row'>
				<div className='inputs'>
					<Request
						changed={onRequestChange}
						requestState={requestState}
						sendRequest={sendRequest}
					/>
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
				<Logs />
			</article>
			<Footer />
		</main>
	);
}

export default App;
