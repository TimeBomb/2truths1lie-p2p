import { useContext } from 'react';
import AppContext from '../../AppContext';
import { Page } from '../layout';

export default function GamePage() {
	const context = useContext(AppContext);

	return <Page>TODO Game</Page>;
}
