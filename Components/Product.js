import { useState } from 'react';
import BuyBlue from '../public/assets/icons/buy-blue.svg';
import BuyWhite from '../public/assets/icons/buy-white.svg';
import Coin from '../public/assets/icons/coin.svg';
import Button from './Button';
import styles from './product.module.css';
const Product = ({
	product: {
		name,
		_id,
		cost,
		category,
		img: { url },
	},
	availablePoints,
}) => {
	const [clicked, setClicked] = useState(false);
	const [coinCost, setCoinCost] = useState(cost);
	return (
		<div
			className={`${clicked ? styles.clickedBox : styles.box} columnContainer`}
			onMouseEnter={() => setClicked(true)}
			onMouseLeave={() => {
				setClicked(false);
				if (coinCost === 'Insufficient Points') setCoinCost(cost);
			}}
			onClick={() => setClicked(!clicked)}
		>
			{clicked ? (
				<>
					<div className={`${styles.redeem} columnContainer`}>
						<div className='rowContainer'>
							<Coin />
							<span className='smallFont'>{coinCost}</span>
						</div>
						<Button
							size='xSmall'
							cursor='pointer'
							clickHandler={() => (cost > availablePoints ? setCoinCost('Insufficient Points') : redeem(_id))}
						>
							Redeem Now
						</Button>
					</div>
					<BuyWhite className={styles.buyIcon} />
				</>
			) : (
				<BuyBlue className={styles.buyIcon} />
			)}
			<div className={clicked ? 'reducedOpacity' : ''}>
				<img src={url} alt='' />
			</div>
			<div className={`${styles.info} ${clicked ? 'reducedOpacity' : ''}`}>
				<h3 className={`${styles.category} xSmallFont`}>{category}</h3>
				<h2 className={`${styles.title} smallFont`}>{name}</h2>
			</div>
		</div>
	);
};
/* {
    img: {
      url: 'https://coding-challenge-api.aerolab.co/images/MotoG5-x1.png',
      hdUrl: 'https://coding-challenge-api.aerolab.co/images/MotoG5-x2.png'
    },
    _id: '5a0b369e734d1d08bf708567',
    name: 'Moto G5',
    cost: 230,
    category: 'Phones'
  } */

async function redeem(id) {
	console.log(id, 'redeem');
	/* try {
		const responseRaw = await fetch('https://coding-challenge-api.aerolab.co/redeem', {
			method: 'POST',
			body: JSON.stringify({ productId: id }),
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization:
					'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWY2ZDczYWExMzI4NDAwMjFmMDU4ZDIiLCJpYXQiOjE2NDM1NjY5MDZ9.azfKP1anHgSy1fze1GSoxIGINVLf135uatTzeX-jg4Y',
			},
		});
		if (responseRaw.status !== 200 && responseRaw.status !== 201 && responseRaw.status !== 204) {
			const responseJson = await responseRaw.json();
			throw new Error({ error: responseJson.error, status: `${responseRaw.status} ${responseRaw.statusText}` });
		}
		const responseJson = await responseRaw.json();
		return {
			props: {
				user: responseJson,
			},
		};
	} catch (e) {
		console.log(e);
	} */
}

export default Product;
