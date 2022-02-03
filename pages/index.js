import Head from 'next/head';
import { useState, useEffect, useContext, useRef } from 'react';
import styles from '../styles/Home.module.css';
import Product from '../Components/Product';
import ArrowNext from '../public/assets/icons/arrow-right.svg';
import ArrowPrevious from '../public/assets/icons/arrow-left.svg';
import { UserContext } from '../Components/Layout';
import Button from '../Components/ButtonPro';
const productAmountPerPage = 7;

export default function Home({ user, products, packedProducts }) {
  const { updatedUser, setUser } = useContext(UserContext);
  const lowest = useRef();
  const highest = useRef();
  const recent = useRef();
  const category = useRef();
  const [toggleLowest, setToggleLowest] = useState(() => () => '');
  const [toggleHighest, setToggleHighest] = useState(() => () => '');
  const [deviceButtons, setDeviceButtons] = useState(false);
  const [productsArrayIndex, setProductsArrayIndex] = useState(0);
  const [unredeemedProducts, setUnredeemProducts] = useState(products);
  const [filteredProducts, setFilteredProducts] = useState({
    packed: packedProducts,
    unpacked: products,
  });
  /* products is the complete list of products used as base array for
  unredeemedProducts.
  unredeemedProducts only gets updated when redeeming, and that's
  the base array used for the filter.
  filteredProducts is the unredeemedProducts filtered
  */
  const [categories, setCategories] = useState([]);
  const pageIndexes = indexesCalculator(filteredProducts.unpacked);
  const pageIndexesString = `${pageIndexes[productsArrayIndex] + 1} to ${
    pageIndexes[productsArrayIndex + 1]
  } of ${pageIndexes[pageIndexes.length - 1]} products`;
  function filter2() {
    let filteredElements = unredeemedProducts.map((p) => p);
    if (recent.current.checked) {
      setFilteredProducts(getFilteredRedeemedProducts());
      return;
    }
    if (lowest.current.checked) filteredElements.sort((a, b) => a.cost > b.cost);
    if (highest.current.checked) filteredElements.sort((a, b) => a.cost < b.cost);
    if (category.current.value) {
      filteredElements = filteredElements.filter((fe) => fe.category === category.current.value);
    }
    setFilteredProducts({ packed: packer(filteredElements), unpacked: filteredElements });
  }
  function getFilteredRedeemedProducts() {
    let filteredElements = updatedUser.redeemHistory.map((rh) => rh);
    if (lowest.current.checked) filteredElements.sort((a, b) => a.cost > b.cost);
    if (highest.current.checked) filteredElements.sort((a, b) => a.cost < b.cost);
    if (category.current.value) {
      filteredElements = filteredElements.filter((fe) => fe.category === category.current.value);
    }
    return { packed: packer(filteredElements), unpacked: filteredElements };
  }
  function redeemProduct(id) {
    const unpacked = filteredProducts.filter(({ _id }) => _id !== id);
    const unpackedUnredeemed = unredeemedProducts.filter(({ _id }) => _id !== id);
    setUnredeemProducts(unpackedUnredeemed);
    setFilteredProducts({ packed: packer(unpacked), unpacked });
  }
  useEffect(() => {
    setUser(user);
    const categories = getUniqueElements(products, 'category').uniqueElements;
    setCategories(categories.sort((a, b) => a > b));
  }, []);

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
              <Button clickHandler={filter2} buttonRef={recent}>
                Most Recent
              </Button>
              <Button
                clickHandler={(_, toggleStyle) => {
                  setToggleLowest(() => toggleStyle);
                  toggleHighest();
                  if (highest) highest.current.checked = false;
                  filter2();
                }}
                buttonRef={lowest}
              >
                Lowest price
              </Button>
              <Button
                clickHandler={(_, toggleStyle) => {
                  setToggleHighest(() => toggleStyle);
                  toggleLowest();
                  if (lowest) lowest.current.checked = false;
                  filter2();
                }}
                buttonRef={highest}
              >
                Highest price
              </Button>
              <select ref={category} name='' id=''>
                <option value='' onClick={(e) => filter2(e.target.value)}>
                  Category
                </option>
                {categories.map((c, index) => (
                  <option key={index} onClick={(e) => filter2(e.target.value)}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div className={`${styles.deviceButtons} columnContainer`}>
              <div className='marginMedium'>
                <Button clickHandler={() => setDeviceButtons(!deviceButtons)}>Sort By</Button>
              </div>
              {deviceButtons && (
                <div
                  style={{ alignItems: 'center' }}
                  className={`${styles.filterVariables} columnContainer`}
                >
                  <Button clickHandler={filter2} buttonRef={recent}>
                    Most Recent
                  </Button>
                  <Button
                    clickHandler={(_, toggleStyle) => {
                      setToggleLowest(() => toggleStyle);
                      toggleHighest();
                      if (highest) highest.current.checked = false;
                      filter2();
                    }}
                    buttonRef={lowest}
                  >
                    Lowest price
                  </Button>
                  <Button
                    clickHandler={(_, toggleStyle) => {
                      setToggleHighest(() => toggleStyle);
                      toggleLowest();
                      if (lowest) lowest.current.checked = false;
                      filter2();
                    }}
                    buttonRef={highest}
                  >
                    Highest price
                  </Button>
                  <select ref={category} name='' id=''>
                    <option value='' onClick={(e) => filter2(e.target.value)}>
                      Category
                    </option>
                    {categories.map((c, index) => (
                      <option key={index} onClick={(e) => filter2(e.target.value)}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>
          <div className='rowContainer'>
            {productsArrayIndex > 0 && (
              <ArrowPrevious
                className={styles.arrow}
                onClick={() => setProductsArrayIndex(productsArrayIndex - 1)}
              />
            )}
            {productsArrayIndex < filteredProducts.packed.length - 1 && (
              <ArrowNext
                className={styles.arrow}
                onClick={() => setProductsArrayIndex(productsArrayIndex + 1)}
              />
            )}
          </div>
        </div>
        <section className={`${styles.section} columnContainer`}>
          <div style={{ position: 'relative' }} className={`wrapBox`}>
            {filteredProducts.packed[0] ? (
              filteredProducts.packed[productsArrayIndex].map((p, index) => (
                <Product
                  key={index}
                  product={p}
                  availablePoints={updatedUser.points}
                  redeemProduct={redeemProduct}
                />
              ))
            ) : (
              <div className='marginMedium'>No products available</div>
            )}
          </div>
          <div className={`${styles.productsAmountFooter} rowContainer smallFont`}>
            <span>{pageIndexesString}</span>
            <div>
              {productsArrayIndex > 0 && (
                <ArrowPrevious
                  className={styles.arrow}
                  onClick={() => setProductsArrayIndex(productsArrayIndex - 1)}
                />
              )}
              {productsArrayIndex < filteredProducts.packed.length - 1 && (
                <ArrowNext
                  className={styles.arrow}
                  onClick={() => setProductsArrayIndex(productsArrayIndex + 1)}
                />
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
export function getUniqueElements(array, variable) {
  const uniqueElements = [];
  let willAddElement = true;
  for (let index = 0; index < array.length; index++) {
    for (let index2 = 0; index2 < uniqueElements.length; index2++) {
      if (array[index][variable] === uniqueElements[index2]) {
        willAddElement = false;
        break;
      }
    }
    if (willAddElement) uniqueElements.push(array[index][variable]);
    willAddElement = true;
  }
  const repetitionAmounts = uniqueElements.map(
    (ue) => array.filter((element) => element[variable] === ue).length,
  );
  return { uniqueElements, repetitionAmounts };
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
  const responseJson = await responseRaw.json();
  return responseJson;
}
export async function getStaticProps() {
  try {
    const user = await getRequest('https://coding-challenge-api.aerolab.co/user/me');
    const products = await getRequest('https://coding-challenge-api.aerolab.co/products');
    const packedProducts = packer(products);
    return {
      props: {
        user,
        products,
        packedProducts,
      },
      revalidate: 1,
    };
  } catch (e) {
    console.log(e);
  }
}
export function packer(array) {
  const entireArray = [];
  let pack = [];
  for (let index = 0; index < array.length; index++) {
    if (array.length - (index + 1) < array.length % productAmountPerPage) {
      pack.push(array[index]);
      if (array.length - index === 1) entireArray.push(pack);
    } else if (index !== 0 && (index + 1) % productAmountPerPage === 0) {
      pack.push(array[index]);
      entireArray.push(pack);
      pack = [];
    } else pack.push(array[index]);
  }
  return entireArray;
}
export function indexesCalculator(array) {
  const divisionNumbers = [0];
  for (let index = 0; index < array.length; index++) {
    if (index !== 0 && (index + 1) % productAmountPerPage === 0) {
      divisionNumbers.push(index + 1);
    }
  }
  divisionNumbers.push(array.length);
  return divisionNumbers;
}
/* {
  _id: '61f6d73aa132840021f058d2',
  name: 'John Kite',
  points: 24200,
  createDate: '2022-01-30T18:21:46.637Z',
  redeemHistory: [],
  __v: 0
} 
packer(
  filteredProducts.unpacked.filter((up) => {
    !updatedUser.redeemHistory.map(({ _id }) => _id).includes(up._id);
  }),
);
*/
