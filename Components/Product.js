import {useState, useContext} from 'react';
import BuyBlue from '../public/assets/icons/buy-blue.svg';
import BuyWhite from '../public/assets/icons/buy-white.svg';
import Coin from '../public/assets/icons/coin.svg';
import Button from './Button';
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
  const [clicked, setClicked] = useState(true);
  return (
    <div
      id='product'
      className={styles.box}
      onMouseOver={() => setClicked(true)}
      onMouseLeave={() => setClicked(false)}
      onClick={() => setClicked(pc => !pc)}
    >
      {clicked && (
        <Clicked
          id={_id}
          cost={cost}
          availablePoints={availablePoints}
          clicked={clicked}
          redeem={redeem}
        />
      )}
      {!clicked &&
        (cost > availablePoints ? (
          <Button>
            <span>{`You need ${cost - availablePoints}`}</span>
            <Coin />
          </Button>
        ) : (
          <BuyBlue className={styles.buyIcon} />
        ))}
      <img src={url} alt={name} />
      <div className={styles.info}>
        <h3>{category}</h3>
        <h2>{name}</h2>
      </div>
    </div>
  );
};
const Clicked = ({cost, availablePoints, redeem, id}) => (
  <div className={styles.contentWhenClicked}>
    <BuyWhite className={styles.buyIcon} />
    <div className={styles.contentWhenClickedInfo}>
      <div>
        <Coin />
        <span>{cost}</span>
      </div>
      {cost < availablePoints && (
        <Button size='xSmall' action={() => redeem(id)}>
          Redeem Now
        </Button>
      )}
    </div>
  </div>
);
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
