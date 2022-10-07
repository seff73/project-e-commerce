import React, { useEffect } from 'react';
import { client } from '../lib/client';
import { Product, FooterBanner, HeroBanner } from '../components';
import { useStateContext } from '../context/StateContext';




export default function Home({ products, bannerData }) {
  const { setAllProducts, allProducts, setLocalContext, } = useStateContext();
  
  useEffect(() => {
    setAllProducts(products);

  }, [products])
  

  
  return (
    <>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
      
      <div className='products-heading'>
        <h2>Best Selling Products</h2>
        <p>Once you learn to read, you will be forever free!</p>
      </div>

      <div className='products-container'>
        {allProducts?.map((product) => <Product key={product._id} product={product} />)}
      </div>

      <FooterBanner footerBanner={bannerData && bannerData[1] } />

    </>
  )
};

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);
  
  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData }
  }
}
