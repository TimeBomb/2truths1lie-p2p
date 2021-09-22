module.exports = function SocketInstance(socket) {
	console.log('a user connected, their id:', socket.id);

	socket.on('forServer:playerJoined', (msg) => {
		console.log('playerjoined msg:', msg);
	});

	socket.on('forServer:playerUpdated', (msg) => {
		console.log('playerUpdated msg:', msg);
	});

	socket.on('forServer:playerJoiningRoom', (msg) => {
		console.log('playerJoiningRoom msg:', msg);
		socket.emit('forClient:joinedRoom', {
			gameStatus: 'waiting', // TODO Update to correct status depending on game state
		});
	});

	socket.on('disconnect', () => {
		console.log('a user disconnected, their id:', socket.id);
	});
};
