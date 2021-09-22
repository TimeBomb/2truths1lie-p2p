import { useContext } from 'react';
import AppContext from '../../AppContext';
import { Page } from '../layout';

export default function LoginPage() {
	const context = useContext(AppContext);

	return (
		<Page>
			<fieldset>
				<label htmlFor="playerName">Your Name:</label>
				<input
					id="playerName"
					value={context.name}
					onChange={(event) => context.setName(event.target.value)}
				></input>
			</fieldset>
			<fieldset>
				<label htmlFor="roomId">Room ID:</label>
				<input
					id="roomId"
					value={context.roomId}
					onChange={(event) => context.setRoomId(event.target.value)}
				></input>
			</fieldset>

			<button onClick={context.onJoinRoom} disabled={!context.name || !context.roomId}>
				Join Room
			</button>
		</Page>
	);
}
