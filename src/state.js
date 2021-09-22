function otherPlayerStateReducer(state, action) {
    switch (action.type) {
        case 'updatePlayer': {
            return { ...state, [action.payload.name]: action.payload.data };
        }
        default: {
            console.warn(
                'Attempted to update other player state with invalid action, action:',
                action,
            );
            return state;
        }
    }
}

function gameStateReducer(state, action) {
    switch (action.type) {
        case 'setGameState': {
            return { ...state, gameState: action.payload };
        }
        case 'setCurrentPlayer': {
            return { ...state, currentPlayer: action.payload };
        }
        default: {
            console.warn('Attempted to update game state with invalid action, action:', action);
            return state;
        }
    }
}

export { otherPlayerStateReducer, gameStateReducer };
