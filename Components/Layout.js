import {useMemo, createContext, useEffect, useCallback} from 'react';
import styles from './layout.module.css';
import AerolabLogo from '../public/assets/aerolab-logo.svg';
import Coin from '../public/assets/icons/coin.svg';
import Button from '../Components/ButtonPro';
import Modal from '../Components/Modal';
import {useState, useRef} from 'react';
import {getRequest} from '../pages';
export const UserContext = createContext();

const Layout = ({children}) => {
  const [user, setUser] = useState({
    _id: '',
    name: '',
    points: '',
    createDate: '',
    redeemHistory: [],
    __v: 0,
  });

  const [invalidInput, setInvalidInput] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const pointsAmount = useRef(0);
  async function getPoints() {
    if (
      pointsAmount.current.value !== '1000' &&
      pointsAmount.current.value !== '5000' &&
      pointsAmount.current.value !== '7500'
    ) {
      return setInvalidInput(true);
    }
    try {
      const {'New Points': newPoints} = await postRequest(
        'https://coding-challenge-api.aerolab.co/user/points',
        {amount: +pointsAmount.current.value},
      );
      setUser({...user, points: newPoints});
      setShowModal(false);
      setInvalidInput(false);
    } catch (error) {
      console.log(error);
    }
  }

  const redeem = useCallback(async id => {
    try {
      await postRequest('https://coding-challenge-api.aerolab.co/redeem', {productId: id});
      const user = await getRequest('https://coding-challenge-api.aerolab.co/user/me');
      setUser(user);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    (async () => {
      const user = await getRequest('https://coding-challenge-api.aerolab.co/user/me');
      setUser(user);
    })();
  }, []);

  const contextObj = useMemo(() => ({user, setUser, redeem}), [redeem, user]);

  return (
    <UserContext.Provider value={contextObj}>
      {showModal && (
        <Modal
          onConfirm={getPoints}
          invalidInput={invalidInput}
          pointsAmount={pointsAmount}
          closeModal={() => {
            setInvalidInput(false);
            setShowModal(false);
          }}
        />
      )}
      <nav className={`rowContainer ${styles.nav}`}>
        <div>
          <AerolabLogo className={styles.aerolabLogo} />
        </div>
        <div className={`${styles.username} rowContainer`}>
          <span>{user.name}</span>
          <div className='marginSmall'>
            <Button cursor='default'>
              <span>{user.points}</span>
              <Coin className={styles.coin} />
            </Button>
          </div>
          <div className='marginSmall'>
            <Button clickHandler={() => setShowModal(true)} cursor='pointer'>
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

export async function postRequest(url, body) {
  const responseRaw = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWY2ZDczYWExMzI4NDAwMjFmMDU4ZDIiLCJpYXQiOjE2NDM1NjY5MDZ9.azfKP1anHgSy1fze1GSoxIGINVLf135uatTzeX-jg4Y',
    },
  });
  if (responseRaw.status !== 200 && responseRaw.status !== 201 && responseRaw.status !== 204) {
    const responseJson = await responseRaw.json();
    throw {error: responseJson.error, status: `${responseRaw.status} ${responseRaw.statusText}`};
  }
  const responseJson = await responseRaw.json();
  return responseJson;
}
