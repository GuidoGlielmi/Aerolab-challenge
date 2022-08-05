import Head from 'next/head';
import {useState, useMemo, useContext} from 'react';
import styles from '../styles/Home.module.css';
import Product from '../Components/Product';
import ArrowNext from '../public/assets/icons/arrow-right.svg';
import ArrowPrevious from '../public/assets/icons/arrow-left.svg';
import {UserContext} from '../Components/Layout';
import Button from '../Components/ButtonPro';
const productAmountPerPage = 7;

export default function Home({products}) {
  const {
    user: {redeemHistory},
  } = useContext(UserContext);

  const [isRedeem, setIsRedeem] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState();
  const [lowToHighOrder, setLowToHighOrder] = useState(true);
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
    ).sort((a, b) => (lowToHighOrder ? a.cost > b.cost : a.cost < b.cost));
    return [...packer(filteredProducts), filteredProducts.length];
  }, [selectedCategory, lowToHighOrder, isRedeem, redeemHistory, products]);

  const [pageNumber, setPageNumber] = useState(0);

  const pageIndexesString = `${pageIndexes[pageNumber][0]} to ${pageIndexes[pageNumber][1]} of ${productsAmount} products`;

  return (
    <div className={styles.container}>
      <Head>
        <title>Aerolab Challenge</title>
        <meta name='description' content='website for aerolab challenge' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <header className={styles.header}>
          <img
            src='/assets/header-x1.png'
            width='100%'
            alt='header image'
            className={styles.headerImage}
          />
          <h1 className={`${styles.headerTitle} bigFont`}>Electronics</h1>
        </header>
        <div className={styles.filter}>
          <div className={styles.filterBox}>
            <span className={`${styles.productsAmount} smallFont`}>{pageIndexesString}</span>
            <div className={`${styles.buttons} rowContainer`}>
              <span>Sort by:</span>
              <Button action={() => setIsRedeem(pr => !pr)}>Most Recent</Button>
              <Button action={() => setLowToHighOrder(true)}>Lowest price</Button>
              <Button action={() => setLowToHighOrder(false)}>Highest price</Button>
              <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
                <option value=''>Category</option>
                {categories.map((c, index) => (
                  <option key={index}>{c}</option>
                ))}
              </select>
            </div>
            <div className={`${styles.deviceButtons} columnContainer`}>
              <div className='marginMedium'>
                <Button action={() => setDeviceButtons(ps => !ps)}>Sort By</Button>
              </div>
              {deviceButtons && (
                <div
                  style={{alignItems: 'center'}}
                  className={`${styles.filterVariables} columnContainer`}
                >
                  <Button clickHandler={filter}>Most Recent</Button>
                  <Button action={() => setLowToHighOrder(true)}>Lowest price</Button>
                  <Button action={() => setLowToHighOrder(false)}>Highest price</Button>
                  <select
                    className={`marginSmall`}
                    value={selectedCategory}
                    onChange={e => setSelectedCategory(e.target.value)}
                  >
                    <option value=''>Category</option>
                    {categories.map((c, index) => (
                      <option key={index}>{c}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>
          <div className='rowContainer'>
            {/*   {!pageNumber && (
              <>
                <ArrowPrevious className={styles.arrow} onClick={() => setPageNumber(0)} />
              </>
            )} */}
            {!!pageNumber && (
              <ArrowPrevious className={styles.arrow} onClick={() => setPageNumber(pn => pn - 1)} />
            )}
            {pageNumber < packedFilteredProducts.length - 1 && (
              <ArrowNext className={styles.arrow} onClick={() => setPageNumber(pn => pn + 1)} />
            )}
            {/*    {pageNumber !== packedFilteredProducts.length - 1 && (
              <ArrowPrevious
                className={styles.arrow}
                onClick={() => setPageNumber(packedFilteredProducts.length - 1)}
              />
            )} */}
          </div>
        </div>
        <section className={`${styles.section} columnContainer`}>
          <div style={{position: 'relative'}} className={`wrapBox`}>
            {packedFilteredProducts[0].length ? (
              packedFilteredProducts[pageNumber].map((p, i) => (
                <Product key={isRedeem ? i : p._id} product={p} />
              ))
            ) : (
              <div className='marginMedium'>No products available</div>
            )}
          </div>
          <div className={`${styles.productsAmountFooter} rowContainer smallFont`}>
            <span>{pageIndexesString}</span>
            <div>
              {!!pageNumber && (
                <ArrowPrevious
                  className={styles.arrow}
                  onClick={() => setPageNumber(pn => pn - 1)}
                />
              )}
              {pageNumber < packedFilteredProducts.length - 1 && (
                <ArrowNext className={styles.arrow} onClick={() => setPageNumber(pn => pn + 1)} />
              )}
            </div>
          </div>
        </section>
      </main>
      <footer className={styles.footer}>
        <a
          target='_blank'
          rel='noreferrer'
          href='https://github.com/GuidoGlielmi/Aerolab-challenge'
        >
          Guido Glielmi&apos;s GitHub Repository
        </a>
      </footer>
    </div>
  );
}

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
    // const user = await getRequest('https://coding-challenge-api.aerolab.co/user/me');
    const products = await getRequest('https://coding-challenge-api.aerolab.co/products');
    return {
      props: {
        // user,
        products,
      },
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
    const newElements = newArr.splice(0, productAmountPerPage);
    pack.push(newElements);
    if (newElements.length === 1) {
      indexNumbers.push([arr.length]);
      break;
    }
    const lastNumber = indexNumbers[indexNumbers.length - 1]?.[1] || 0;
    indexNumbers.push([lastNumber + 1, lastNumber + newElements.length]);
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
