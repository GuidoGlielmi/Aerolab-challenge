import { useState } from 'react';
import BuyBlue from '../public/assets/icons/buy-blue.svg';
import BuyWhite from '../public/assets/icons/buy-white.svg';
import styles from './product.module.css';
const Product = ({ src, title, category }) => {
	const [clicked, setClicked] = useState(false);
	return (
		<div className={`${styles.box} columnContainer`} onClick={() => setClicked(!clicked)}>
			{clicked ? <BuyWhite className={styles.buyIcon} /> : <BuyBlue className={styles.buyIcon} />}
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
