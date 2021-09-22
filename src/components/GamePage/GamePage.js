import { useContext } from 'react';
import AppContext from '../../AppContext';
import { Page } from '../layout';
import styles from './GamePage.module.css';
import RoomSidebar from './RoomSidebar';
import InputPanel from './InputPanel';
import WaitingPanel from './WaitingPanel';

export default function GamePage() {
	const context = useContext(AppContext);

	return (
		<Page>
			<div className={styles.left}>
				<RoomSidebar />
			</div>
			<div className={styles.right}>
				<div className={styles.topRight}>
					<InputPanel />
				</div>
				<div className={styles.bottomRight}>
					<WaitingPanel />
				</div>
			</div>
		</Page>
	);
}
