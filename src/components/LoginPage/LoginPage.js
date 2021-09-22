import { useContext } from 'react';
import AppContext from '../../AppContext';
import { Page } from '../layout';

export default function LoginPage() {
	const context = useContext(AppContext);

	return (
		<Page>
			<fieldset>
				<label for="playerName">Your Name:</label>
				<input
					id="playerName"
					value={context.name}
					onChange={(event) => context.setName(event.target.value)}
				></input>
			</fieldset>
			<fieldset>
				<label for="roomId">Room ID:</label>
				<input
					id="roomId"
					value={context.roomId}
					onChange={(event) => context.setRoomId(event.target.value)}
				></input>
			</fieldset>

			<button onClick={context.onHostRoom} disabled={!context.name || !context.roomId}>
				Host Room
			</button>
			<button onClick={context.onJoinRoom} disabled={!context.name || !context.roomId}>
				Join Room
			</button>
		</Page>
	);
}
