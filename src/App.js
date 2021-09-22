import React, { useReducer, useState } from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import AppContext from './AppContext';
import { GamePage } from './components/GamePage';
import { LoginPage } from './components/LoginPage';
import { otherPlayerStateReducer, gameStateReducer } from './state';

function App() {
	// App context acts as global state - it's messy but quick
	const [name, setName] = useState('');
	const [roomId, setRoomId] = useState('');
	const [truths, setTruths] = useState(['', '']);
	const [lie, setLie] = useState('');
	const [gameState, dispatchGameAction] = useReducer(gameStateReducer);
	const [otherPlayerState, dispatchOtherPlayerAction] = useReducer(otherPlayerStateReducer);

	const onHostRoom = () => {};
	const onJoinRoom = () => {};

	return (
		<AppContext.Provider
			value={{
				name,
				setName,
				roomId,
				setRoomId,
				truths,
				setTruths,
				lie,
				setLie,
				gameState,
				dispatchGameAction,
				otherPlayerState,
				dispatchOtherPlayerAction,
			}}
		>
			<Router>
				<div className="App">
					<Switch>
						<Route exact path="/">
							<LoginPage />
						</Route>
						<Route path="/play">
							<GamePage />
						</Route>
					</Switch>
				</div>
			</Router>
		</AppContext.Provider>
	);
}

export default App;
