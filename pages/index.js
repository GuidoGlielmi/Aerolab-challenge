import Head from 'next/head';
import {useState, useMemo, useContext} from 'react';
import styles from '../styles/Home.module.css';
import Product from '../Components/Product';
import ArrowNext from '../public/assets/icons/arrow-right.svg';
import ArrowPrevious from '../public/assets/icons/arrow-left.svg';
import {UserContext} from '../Components/Layout';
import Button from '../Components/Button';
const productAmountPerPage = 7;

const orders = ['Lowest Price', 'Highest Price'];

export default function Home({products}) {
  const {
    user: {redeemHistory},
  } = useContext(UserContext);

  const [isRedeem, setIsRedeem] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState();
  const [lowToHighOrder, setLowToHighOrder] = useState(orders[0]);
  const [deviceButtons, setDeviceButtons] = useState(false);
  const categories = useMemo(
    () => [...new Set(products.map(({category}) => category))],
    [products],
  );

  const [packedFilteredProducts, pageIndexes, productsAmount] = useMemo(() => {
    const selectedProducts = isRedeem ? redeemHistory : products;
    const filteredProducts = (
      !selectedCategory
        ? selectedProducts
        : selectedProducts.filter(({category}) => category === selectedCategory)
    ).sort((a, b) => (lowToHighOrder === orders[0] ? a.cost > b.cost : a.cost < b.cost));
    return [...packer(filteredProducts), filteredProducts.length];
  }, [selectedCategory, lowToHighOrder, isRedeem, redeemHistory, products]);

  const [pageNumber, setPageNumber] = useState(0);

  const pageNumbersString = `${pageIndexes[pageNumber][0]} to ${pageIndexes[pageNumber][1]} of ${productsAmount} products`;

  return (
    <div className={styles.container}>
      <Head>
        <title>Aerolab Challenge</title>
        <meta name='description' content='website for aerolab challenge' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <Header />
        <SelectionBox
          isRedeem={isRedeem}
          setIsRedeem={setIsRedeem}
          lowToHighOrder={lowToHighOrder}
          setLowToHighOrder={setLowToHighOrder}
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          setDeviceButtons={setDeviceButtons}
          pageNumbersString={pageNumbersString}
          deviceButtons={deviceButtons}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          lastPage={packedFilteredProducts.length - 1}
          productsAmount={productsAmount}
        />
        {productsAmount ? (
          <section className={styles.section}>
            <div className={styles.productsGrid}>
              {packedFilteredProducts[pageNumber].map((p, i) => (
                <Product key={isRedeem ? i : p._id} product={p} />
              ))}
            </div>
            <NavigationFooter
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
              pageNumbersString={pageNumbersString}
              lastPage={packedFilteredProducts.length - 1}
            />
          </section>
        ) : (
          <div style={{margin: '5vw', textAlign: 'center'}}>No products available</div>
        )}
      </main>
      <Footer />
    </div>
  );
}

const Header = () => (
  <header className={styles.header}>
    <img src='/assets/header-x1.png' width='100%' alt='header image' />
    <h1>Electronics</h1>
  </header>
);

const SelectionBox = ({
  isRedeem,
  setIsRedeem,
  lowToHighOrder,
  setLowToHighOrder,
  categories,
  selectedCategory,
  setSelectedCategory,
  setDeviceButtons,
  pageNumbersString,
  deviceButtons,
  pageNumber,
  setPageNumber,
  lastPage,
  productsAmount,
}) => (
  <div className={styles.filter}>
    <span className={styles.productsAmount}>{pageNumbersString}</span>
    <div className={styles.filterButtonsBox}>
      <span>Sort by:</span>
      <Button state={isRedeem} action={() => setIsRedeem(pr => !pr)}>
        Most Recent
      </Button>
      {orders.map(o => (
        <Button key={o} state={lowToHighOrder === o} action={() => setLowToHighOrder(o)}>
          {o}
        </Button>
      ))}
      <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
        <option value=''>Category</option>
        {categories.map((c, index) => (
          <option key={index}>{c}</option>
        ))}
      </select>
    </div>
    {productsAmount && (
      <Arrows pageNumber={pageNumber} setPageNumber={setPageNumber} lastPage={lastPage} />
    )}
    <div className={styles.deviceButtons}>
      <Button action={() => setDeviceButtons(ps => !ps)}>Sort By</Button>
      {deviceButtons && (
        <div className={styles.filterButtons}>
          <Button state={isRedeem} action={() => setIsRedeem(pr => !pr)}>
            Most Recent
          </Button>
          {orders.map(o => (
            <Button key={o} state={lowToHighOrder === o} action={() => setLowToHighOrder(o)}>
              {o}
            </Button>
          ))}
          <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
            <option value=''>Category</option>
            {categories.map((c, index) => (
              <option key={index}>{c}</option>
            ))}
          </select>
        </div>
      )}
    </div>
  </div>
);

const Arrows = ({pageNumber, setPageNumber, lastPage}) => (
  <div className={styles.arrows}>
    {!!pageNumber && (
      <div
        style={{filter: 'drop-shadow(0 0 1px blue)'}}
        onClick={() => setPageNumber(0)}
        className={styles.arrow}
      >
        <ArrowPrevious />
      </div>
    )}
    {!!pageNumber && (
      <ArrowPrevious className={styles.arrow} onClick={() => setPageNumber(pn => pn - 1)} />
    )}
    {pageNumber < lastPage && (
      <ArrowNext className={styles.arrow} onClick={() => setPageNumber(pn => pn + 1)} />
    )}
    {pageNumber !== lastPage && (
      <div
        style={{filter: 'drop-shadow(0 0 1px red)'}}
        className={styles.arrow}
        onClick={() => setPageNumber(lastPage)}
      >
        <ArrowNext />
      </div>
    )}
  </div>
);

const NavigationFooter = ({pageNumber, setPageNumber, pageNumbersString, lastPage}) => (
  <div className={styles.productsAmountFooter}>
    {!!pageNumber && (
      <ArrowPrevious className={styles.arrow} onClick={() => setPageNumber(pn => pn - 1)} />
    )}
    <span>{pageNumbersString}</span>
    {pageNumber < lastPage && (
      <ArrowNext className={styles.arrow} onClick={() => setPageNumber(pn => pn + 1)} />
    )}
  </div>
);

const Footer = () => (
  <footer className={styles.footer}>
    <a target='_blank' rel='noreferrer' href='https://github.com/GuidoGlielmi/Aerolab-challenge'>
      Guido Glielmi&apos;s GitHub Repository
    </a>
  </footer>
);

export async function getRequest(url) {
  const responseRaw = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWY2ZDczYWExMzI4NDAwMjFmMDU4ZDIiLCJpYXQiOjE2NDM1NjY5MDZ9.azfKP1anHgSy1fze1GSoxIGINVLf135uatTzeX-jg4Y',
    },
  });
  if (responseRaw.status !== 200 && responseRaw.status !== 201 && responseRaw.status !== 204) {
    const responseJson = await responseRaw.json();
    throw new Error({
      error: responseJson.error,
      status: `${responseRaw.status} ${responseRaw.statusText}`,
    });
  }
  return responseRaw.json();
}
export async function getStaticProps() {
  try {
    const products = await getRequest('https://coding-challenge-api.aerolab.co/products');
    return {
      props: {products},
      revalidate: 1,
    };
  } catch (e) {
    console.log(e);
  }
}

function packer(arr) {
  const newArr = [...arr];
  const pack = [];
  const indexNumbers = [];
  while (newArr.length) {
    const newPack = newArr.splice(0, productAmountPerPage);
    pack.push(newPack);
    const lastNumber = indexNumbers[indexNumbers.length - 1]?.[1] || 0;
    indexNumbers.push(
      newPack.length === 1 ? [lastNumber + 1] : [lastNumber + 1, lastNumber + newPack.length],
    );
  }
  return [pack, indexNumbers];
}

/* 
{
  _id: '61f6d73aa132840021f058d2',
  name: 'John Kite',
  points: 24200,
  createDate: '2022-01-30T18:21:46.637Z',
  redeemHistory: [],
  __v: 0
} 

[
  {
    "img": {
        "url": "https://coding-challenge-api.aerolab.co/images/iPhone8-x1.png",
        "hdUrl": "https://coding-challenge-api.aerolab.co/images/iPhone8-x2.png"
    },
    "_id": "5a0b35c1734d1d08bf7084c3",
    "name": "iPhone 8",
    "cost": 800,
    "category": "Phones"
  },
  ...
]
*/
