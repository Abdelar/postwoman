import React, { useReducer, useEffect } from 'react';

import { Axios } from '../helpers/Axios';
import { useLocalStorage } from '../helpers/useLocalStorage';
import { updateLocalStorage } from '../helpers/updateLocalStorage';
import { initialRequestState, requestReducer } from '../reducers/Request';
import { initialResponseState, responseReducer } from '../reducers/Response';
import { Request } from './Request';
import { Response } from './Response';
import { Intro } from './Intro';
import { Logs } from './Logs';
import { Footer } from './Footer';
import './App.css';

function App() {
	const [logs, setLogs] = useLocalStorage('logs', '[]');

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
		// console.log(responseState);
	}, [responseState]);

	const onRequestChange = change => {
		dispatch({ type: 'ELEMENT_CHANGE', change });
	};

	const sendRequest = async () => {
		if (requestState.url) {
			try {
				const res = await Axios(requestState);
				dispatchResponse({ type: 'SET_RESPONSE', response: res });
				const updatedLogs = updateLocalStorage(logs, res, setLogs);
				console.log(updatedLogs);
			} catch (err) {
				dispatchResponse({
					type: 'SET_ERROR',
					error: err.response || err.request || err,
				});
				console.log(err.message);
				console.log({ error: err.response || err.request || err });
			}
		}
	};

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
					<Response responseState={responseState} />
				</div>
				<Logs />
			</article>
			<Footer />
		</main>
	);
}

export default App;
