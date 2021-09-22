function gameStateReducer(state, action) {
	switch (action.type) {
		// Only used when local player joins room
		case 'setEntireGameState': {
			return action.payload;
		}

		// action.payload = string containing local player's id
		case 'setActivePlayer': {
			return {
				...state,
				activePlayer: action.payload,
			};
		}

		// action.payload = object {id: '', data: { name: '', lines: [] } }
		case 'updatePlayer': {
			return {
				...state,
				players: {
					...state.players,
					[action.payload.id]: action.payload.data,
				},
			};
		}

		// action.payload = string containing player id
		case 'removePlayer': {
			const updatedPlayers = state.players;
			delete updatedPlayers[action.payload];

			return {
				...state,
				players: updatedPlayers,
			};
		}

		// action.payload = string containing either "waiting" or "voting" or "results" or "finalResults"
		case 'setGameStatus': {
			return { ...state, gameStatus: action.payload };
		}

		// action.payload = string containing player id who's turn it currently is
		case 'setCurrentPlayer': {
			const currentPlayer = action.payload;
			if (currentPlayer === state.activePlayer) {
				// If it's the local player's turn, then they can no longer edit their truths/lie
				return { ...state, currentPlayer: action.payload, canEdit: false };
			} else {
				return { ...state, currentPlayer: action.payload };
			}
		}
		default: {
			console.warn('Attempted to update game state with invalid action, action:', action);
			return state;
		}
	}
}

export { gameStateReducer };
