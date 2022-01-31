import { useState } from 'react';
import BuyBlue from '../public/assets/icons/buy-blue.svg';
import BuyWhite from '../public/assets/icons/buy-white.svg';
import Coin from '../public/assets/icons/coin.svg';
import Button from './Button';
import styles from './product.module.css';
const Product = ({ src, title, category }) => {
	const [clicked, setClicked] = useState(false);
	return clicked ? (
		<div className={`${styles.clickedBox} columnContainer`} onMouseOut={() => setClicked(!clicked)}>
			<div className={`${styles.redeem} columnContainer`}>
				<div className='rowContainer'>
					<Coin />
					<span className='mediumFont'>12000</span>
				</div>
				<Button size='xSmall' cursor='pointer'>
					Redeem Now
				</Button>
			</div>
			<BuyWhite className={styles.buyIcon} />
			<div className='reducedOpacity'>
				<img src='/assets/product-pics/AcerAspire-x1.png' alt='' />
			</div>
			<div className={`${styles.info} reducedOpacity`}>
				<h3 className={`${styles.category} xSmallFont`}>Phones</h3>
				<h2 className={`${styles.title} smallFont`}>iPhone 8</h2>
			</div>
		</div>
	) : (
		<div className={`${styles.box} columnContainer`} onMouseOver={() => setClicked(!clicked)}>
			<BuyBlue className={styles.buyIcon} />
			<div>
				<img src='/assets/product-pics/AcerAspire-x1.png' alt='' />
			</div>
			<div className={styles.info}>
				<h3 className={`${styles.category} xSmallFont`}>Phones</h3>
				<h2 className={`${styles.title} smallFont`}>iPhone 8</h2>
			</div>
		</div>
	);
};

export default Product;
