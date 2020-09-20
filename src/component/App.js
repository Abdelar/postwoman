import React, { useReducer, useState } from 'react';
import { isPlainObject } from 'is-plain-object';

import { Axios } from '../helpers/Axios';
import { useLocalStorage } from '../helpers/useLocalStorage';
import { updateLocalStorage } from '../helpers/updateLocalStorage';
import { initialRequestState, requestReducer } from '../reducers/Request';
import { initialResponseState, responseReducer } from '../reducers/Response';
import { Request } from './Request';
import { Response } from './Response';
import { Intro } from './Intro';
import { Error } from './Error';
import { Logs } from './Logs';
import { Footer } from './Footer';
import './App.css';

function App() {
	const [logs, setLogs] = useLocalStorage('logs', '[]');
	const [disableSend, setDisableSend] = useState(false);

	const [requestState, dispatch] = useReducer(
		requestReducer,
		initialRequestState
	);

	const [responseState, dispatchResponse] = useReducer(
		responseReducer,
		initialResponseState
	);

	const onRequestChange = change => {
		dispatch({ type: 'ELEMENT_CHANGE', change });
	};

	const sendRequest = async () => {
		if (requestState.url) {
			setDisableSend(true);
			try {
				if (requestState.headers) {
					if (!isPlainObject(JSON.parse(requestState.headers))) {
						throw new Error("Can't parse headers to a valid JSON object");
					}
				}
				try {
					const res = await Axios(requestState);
					dispatchResponse({ type: 'SET_RESPONSE', response: res });
					updateLocalStorage(logs, res, setLogs);
					setDisableSend(false);
				} catch (err) {
					if (err.response) {
						dispatchResponse({
							type: 'SET_ERROR',
							error: err.response,
							errorMessage: err.message,
						});
						updateLocalStorage(logs, err.response, setLogs);
					} else {
						updateLocalStorage(logs, err, setLogs);
						dispatchResponse({ type: 'CLEAR', errorMessage: err.message });
					}
					setDisableSend(false);
				}
			} catch (err) {
				setDisableSend(false);
				dispatchResponse({
					type: 'CLEAR',
					errorMessage: 'Error parsing HTTP request header',
				});
			}
		}
	};

	return (
		<main className='app'>
			<Intro />
			<article className='row'>
				<div className='inputs'>
					<Request
						disableSend={disableSend}
						changed={onRequestChange}
						requestState={requestState}
						sendRequest={sendRequest}
					/>
					<Response responseState={responseState} />
				</div>
				<Logs logs={JSON.parse(logs)} clear={() => setLogs('[]')} />
			</article>
			<Error
				errorMessage={responseState.errorMessage}
				clearErrorMessage={() =>
					dispatchResponse({ type: 'CLEAR_ERROR_MESSAGE' })
				}
			/>
			<Footer />
		</main>
	);
}

export default App;
