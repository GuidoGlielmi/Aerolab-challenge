import { useState, useContext } from 'react';
import BuyBlue from '../public/assets/icons/buy-blue.svg';
import BuyWhite from '../public/assets/icons/buy-white.svg';
import Coin from '../public/assets/icons/coin.svg';
import Button from './Button';
import styles from './product.module.css';
import { postRequest } from './Layout';
import { UserContext } from './Layout';
import { getRequest } from '../pages/index';
const Product = ({
	product: {
		name,
		_id,
		cost,
		category,
		img: { url },
	},
	availablePoints,
	redeemProduct,
}) => {
	const { updatedUser, setUser } = useContext(UserContext);
	const [clicked, setClicked] = useState(false);
	async function redeem(e) {
		e.stopPropagation();
		try {
			await postRequest(_id, 'productId', 'https://coding-challenge-api.aerolab.co/redeem');
			const user = await getRequest('https://coding-challenge-api.aerolab.co/user/me');
			setUser(user);
			redeemProduct(_id);
		} catch (err) {
			console.log(err);
		}
	}
	return (
		<div className={styles.products}>
			<div
				className={clicked ? styles.clickedBox : styles.box}
				onMouseEnter={() => setClicked(true)}
				onMouseLeave={() => setClicked(false)}
				onClick={() => setClicked(!clicked)}
			>
				<div className={styles.buyIcon}>
					{cost > availablePoints ? (
						<Button>
							<span>{`You need ${cost - availablePoints}`}</span>
							<Coin />
						</Button>
					) : clicked ? (
						<BuyWhite />
					) : (
						<BuyBlue />
					)}
				</div>
				<img src={url} alt='' className={clicked ? 'reducedOpacity' : ''} />
				<div className={`${clicked ? styles.boxInfo : 'hidden'} columnContainer`}>
					<div className='rowContainer'>
						<Coin />
						<span className='smallFont'>{cost}</span>
					</div>
					{cost < availablePoints ? (
						<Button size='xSmall' cursor='pointer' clickHandler={(e) => redeem(e)}>
							Redeem Now
						</Button>
					) : (
						<></>
					)}
				</div>
				<div className={`${styles.info} ${clicked ? 'reducedOpacity' : ''}`}>
					<h3 className={`${styles.category} xSmallFont`}>{category}</h3>
					<h2 className={`${styles.title} smallFont`}>{name}</h2>
				</div>
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

export default Product;
