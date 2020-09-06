// import Axios from 'axios';
import React, { useState, useEffect } from 'react';
// import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';
// import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';
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

function App() {
	// const [res, setRes] = useState();
	// const [err, setErr] = useState();
	// useEffect(() => {
	// 	console.log(res);
	// }, [res]);
	// const onClick = async () => {
	// 	console.clear();
	// 	try {
	// 		const response = await Axios({
	// 			url: 'todos/',
	// 			data: 'yeah!',
	// 			baseURL: 'https://jsonplaceholder.typicode.com',
	// 			// validateStatus: status =>true,
	// 		});
	// 		setRes(response);
	// 	} catch (error) {
	// 		setErr(error);
	// 		console.log({ err });
	// 	}
	// };

	return (
		<main className='app'>
			<header>
				<h1>Post Women</h1>
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
						<div className='intro'>
							<input
								name='method'
								list='methods'
								className='methods'
								defaultValue={METHODS[0]}
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
							<textarea name='url' id='url' rows='1' className='url' />
							<button className='send'>Send</button>
						</div>
					</section>
					<section className='response'>res</section>
				</div>
				<article className='logs'>logs</article>
			</article>
			<footer>elaroussi.me</footer>
		</main>
	);
}

export default App;
