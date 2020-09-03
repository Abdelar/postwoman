import React from 'react';
import './App.css';
import Axios from 'axios';

function App() {
	const onClick = () => {
		Axios.get('https://jsonplaceholder.typicode.com/todos/').then(res =>
			console.log(res.data)
		);
	};

	return (
		<div className='app'>
			<h1>App</h1>
			<textarea name='test' id='test' defaultValue='test'></textarea>
			<br />
			<button onClick={onClick}>Send</button>
		</div>
	);
}

export default App;
