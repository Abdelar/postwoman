import React, { useReducer, useEffect } from 'react';

import { Axios } from '../helpers/Axios';
import { initialRequestState, requestReducer } from '../reducers/Request';
import { initialResponseState, responseReducer } from '../reducers/Response';
import { Request } from './Request';
import { Response } from './Response';
import { Intro } from './Intro';
import { Logs } from './Logs';
import { Footer } from './Footer';
import { withElementParsed } from '../helpers/withElementsParsed';
import { patchUrl } from '../helpers/patchUrl';
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
		// console.log(responseState);
	}, [responseState]);

	const onRequestChange = change => {
		dispatch({ type: 'ELEMENT_CHANGE', change });
	};

	const sendRequest = async () => {
		if (requestState.url) {
			let config = withElementParsed(
				{ ...requestState },
				'headers',
				'data',
				'options'
			);
			config.url = patchUrl(config.url);

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
