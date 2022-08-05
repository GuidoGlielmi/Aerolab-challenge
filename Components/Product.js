import {useState, useContext} from 'react';
import BuyBlue from '../public/assets/icons/buy-blue.svg';
import BuyWhite from '../public/assets/icons/buy-white.svg';
import Coin from '../public/assets/icons/coin.svg';
import Button from './ButtonPro';
import styles from './product.module.css';
import {UserContext} from './Layout';
const Product = ({
  product: {
    name,
    _id,
    cost,
    category,
    img: {url},
  },
}) => {
  const {
    user: {points: availablePoints},
    redeem,
  } = useContext(UserContext);
  const [clicked, setClicked] = useState(false);

  return (
    <div className={styles.products}>
      <div
        className={clicked ? styles.clickedBox : styles.box}
        onMouseEnter={() => setClicked(true)}
        onMouseLeave={() => setClicked(false)}
        onClick={() => setClicked(pc => !pc)}
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
        <img src={url} alt={name} className={clicked ? 'reducedOpacity' : ''} />
        <div className={`${clicked ? styles.boxInfo : 'hidden'} columnContainer`}>
          <div className='rowContainer'>
            <Coin />
            <span className='smallFont'>{cost}</span>
          </div>
          {cost < availablePoints && (
            <Button size='xSmall' cursor='pointer' action={() => redeem(_id)}>
              Redeem Now
            </Button>
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
