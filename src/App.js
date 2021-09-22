import { v4 as uuidv4 } from 'uuid';
import io from 'socket.io-client';
import React, { useEffect, useReducer, useState } from 'react';
import './App.css';
import AppContext from './AppContext';
import { GamePage } from './components/GamePage';
import { LoginPage } from './components/LoginPage';
import { gameStateReducer } from './state';
import { InitializeSocket } from './Socket';

function App() {
	// App context acts as global state - it's a tad messy but it's quick
	const [id, setId] = useState('');
	const [name, setName] = useState('');
	const [roomId, setRoomId] = useState('');
	const [truths, setTruths] = useState(['', '']);
	const [lie, setLie] = useState('');
	const [socket, setSocket] = useState(null);
	const [gameState, dispatchGameAction] = useReducer(gameStateReducer, {
		players: {}, // whether
		canEdit: true,
		gameStatus: 'notLoaded', // 'notLoaded' or 'waiting' or 'voting' or "results" or "finalResults"
	});

	// Initalize socket on load
	useEffect(() => {
		const newSocket = io(`http://${window.location.hostname}:4000`);
		InitializeSocket(newSocket, dispatchGameAction);
		setSocket(newSocket);
		return () => newSocket.close();
	}, [setSocket, dispatchGameAction]);

	// When name is changed, ID is changed/set and server is notified of new player
	// Expectation is roomId and name are always set at same time, and if one is set, so is the other
	useEffect(() => {
		if (name && roomId && socket) {
			const _id = uuidv4();
			setId(_id);

			// Set the active player to local player and add the player's current data to the players state
			dispatchGameAction({
				type: 'setActivePlayer',
				payload: _id,
			});
			dispatchGameAction({
				type: 'updatePlayer',
				payload: {
					id: _id,
					data: { name, lines: [...truths, lie] },
				},
			});

			socket.emit('forServer:playerJoined', {
				id: _id,
				name,
				roomId,
				// We send the truths and a lie in case the socket is recreated mid-game for some reason. Normally these will be the default empty
				truths,
				lie,
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [name, roomId, socket]);

	// Update server when truths/lie are updated locally
	useEffect(() => {
		if (socket && id) {
			socket.emit('forServer:playerUpdated', {
				id,
				truths,
				lie,
			});
		}
	}, [truths, lie, id, name, socket]);

	const onJoinRoom = () => {
		if (!socket) throw new Error('Socket not loaded. Unable to start playing');

		// The server will then send a message back to the player containing all game state,
		// at which point the client will redirect the user to /play and display the game
		socket.emit('forServer:playerJoiningRoom', {
			id,
			roomId,
		});
	};

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
				socket,
				onJoinRoom,
			}}
		>
			<div className="App">
				{gameState.gameStatus === 'notLoaded' ? <LoginPage /> : <GamePage />}
			</div>
		</AppContext.Provider>
	);
}

export default App;
