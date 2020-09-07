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

const initialRequestState = {};
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
			throw new Error();
	}
};

function App() {
	const [requestState, dispatch] = useReducer(
		requestReducer,
		initialRequestState
	);

	useEffect(() => {
		console.log(requestState);
	}, [requestState]);

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

	const sendRequest = () => {
		if (requestState.url) {
			Axios(requestState)
				.then(res => console.log(res))
				.catch(err => console.error(err));
		}
	};

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
							/>
						</div>
						<div className='input_element'>
							<label>Body</label>
							<textarea
								placeholder='Type the body of the request here'
								onChange={onBodyChange}
							/>
						</div>
						<div className='input_element'>
							<label>Other Options</label>
							<textarea
								onChange={onOptionsChange}
								placeholder='You can pass a JSON object containing other parameters that you want to add to the request'
							/>
						</div>
					</section>
					<section className='response'>
						<h2>Response</h2>
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
