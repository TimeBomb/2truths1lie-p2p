function InitializeSocket(socket, dispatchGameAction) {
	// When the local player joins a room
	socket.on('forClient:joinedRoom', (msg) => {
		dispatchGameAction({
			type: 'setEntireGameState',
			payload: msg,
		});
	});

	// This is used for when other players join or update their details
	socket.on('forClient:playerUpdated', (msg) => {
		dispatchGameAction({
			type: 'updatePlayer',
			payload: {
				id: msg.id,
				// lines = a randomly sorted array of their 2 truths and 1 lie
				data: { name: msg.name, lines: msg.lines },
			},
		});
	});

	// This generally only happens if a socket is destroyed
	socket.on('forClient:playerDisconnected', (msg) => {
		dispatchGameAction({
			type: 'removePlayer',
			payload: msg.id,
		});
	});

	// Current player = whoever's turn it is ingame
	socket.on('forClient:currentPlayerUpdated', (msg) => {
		dispatchGameAction({
			type: 'setCurrentPlayer',
			payload: msg.id,
		});
	});

	socket.on('forClient:gameStatusUpdated', (msg) => {
		dispatchGameAction({
			type: 'setGameStatus',
			payload: msg.gameStatus,
		});
	});
}

export { InitializeSocket };
