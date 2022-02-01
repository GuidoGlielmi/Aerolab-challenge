import React from 'react';
import styles from './layout.module.css';
import AerolabLogo from '../public/assets/aerolab-logo.svg';
import Coin from '../public/assets/icons/coin.svg';
import Button from '../Components/Button';
import Modal from '../Components/Modal';
import { useState, useRef } from 'react';
export const UserContext = React.createContext();

const Layout = ({ children }) => {
	const [user, setUser] = useState({
		_id: '',
		name: '',
		points: '',
		createDate: '',
		redeemHistory: [],
		__v: 0,
	});
	const [invalidInput, setInvalidInput] = useState(false);
	const [modalTitle, setModalTitle] = useState('');
	const [modalContent, setModalContent] = useState('');
	const [showModal, setShowModal] = useState(false);
	const pointsAmount = useRef(0);
	async function addPointsModal() {
		if (
			pointsAmount.current.value !== '1000' &&
			pointsAmount.current.value !== '5000' &&
			pointsAmount.current.value !== '7500'
		) {
			return setInvalidInput(true);
		}
		try {
			const { 'New Points': newPoints } = await postRequest(
				parseInt(pointsAmount.current.value),
				'amount',
				'https://coding-challenge-api.aerolab.co/user/points'
			);
			setUser({ ...user, points: newPoints });
			setShowModal(false);
			setInvalidInput(false);
		} catch (error) {
			console.log(error);
		}
	}
	return (
		<UserContext.Provider value={{ updatedUser: user, setUser }}>
			{showModal && (
				<Modal
					title={modalTitle}
					content={modalContent}
					onConfirm={addPointsModal}
					closeModal={() => {
						setInvalidInput(false);
						setShowModal(false);
					}}
				>
					<input ref={pointsAmount} className={invalidInput ? styles.invalidInput : ''} type='text' />
					{invalidInput && (
						<p style={{ color: 'rgb(180, 0, 0)' }} className='marginSmall'>
							Only 1000, 5000 or 7500 points allowed
						</p>
					)}
				</Modal>
			)}
			<nav className={`rowContainer ${styles.nav}`}>
				<div>
					<AerolabLogo className={styles.aerolabLogo} />
				</div>
				<div className='rowContainer'>
					<span>{user.name}</span>
					<div className='marginSmall'>
						<Button cursor='default'>
							<span>{user.points}</span>
							<Coin />
						</Button>
					</div>
					<div className='marginSmall'>
						<Button
							clickHandler={() => {
								setShowModal(true);
								setModalTitle('Add points');
								setModalContent('Enter an amount');
							}}
							cursor='pointer'
						>
							Get Points
						</Button>
					</div>
				</div>
			</nav>
			{children}
		</UserContext.Provider>
	);
};

export default Layout;

export async function postRequest(data, variableName, url) {
	const responseRaw = await fetch(url, {
		method: 'POST',
		body: JSON.stringify({ [variableName]: data }),
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization:
				'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWY2ZDczYWExMzI4NDAwMjFmMDU4ZDIiLCJpYXQiOjE2NDM1NjY5MDZ9.azfKP1anHgSy1fze1GSoxIGINVLf135uatTzeX-jg4Y',
		},
	});
	if (responseRaw.status !== 200 && responseRaw.status !== 201 && responseRaw.status !== 204) {
		const responseJson = await responseRaw.json();
		throw { error: responseJson.error, status: `${responseRaw.status} ${responseRaw.statusText}` };
	}
	const responseJson = await responseRaw.json();
	return responseJson;
}
