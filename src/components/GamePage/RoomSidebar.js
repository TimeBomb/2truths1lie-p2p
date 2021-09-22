import { useContext } from 'react';
import AppContext from '../../AppContext';
import styles from './RoomSidebar.module.css';

export default function RoomSidebar() {
	const context = useContext(AppContext);

	return (
		<div className={styles.RoomSidebar}>
			<div className={styles.roomId}>Room: {context.roomId}</div>
			<ul>{context.gameState.players}</ul>
		</div>
	);
}
