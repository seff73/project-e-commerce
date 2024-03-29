import React, { useEffect, useState } from 'react';
import {  AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { Product } from '../../components';
import { useStateContext } from '../../context/StateContext';


import { client, urlFor } from '../../lib/client';

export default function ProductDetails({ product, products }) {
    const { image, name, details, price, rating } = product;
    const [index, setIndex] = useState(0);
    const { decQty, incQty, qty, onAdd, setShowCart, allProducts, setAllProducts, setHandleLocalStorage } = useStateContext();
    
    useEffect(() => {
        if(products.length !== allProducts.length) {
            setAllProducts(products);
        };
      
    }, [products])

    const handleBuyNow = () => {
        onAdd(product, qty);
        setHandleLocalStorage('write')

        setShowCart(true);
    };

    const handleAddToCart = () => {
        onAdd(product, qty);
        setHandleLocalStorage('write');
    };
    

  return (
    <div>
        <div className='product-detail-container'>
            <div>
                <div className='image-container'>
                    <img src={urlFor(image && image[index] )} className='product-detail-image' />
                </div>
                <div className='small-images-container'>
                    {image?.map((item, i) => (
                        <img 
                            key={item+i}
                            src={urlFor(item)}
                            className={i === index ?
                            'small-image selected-image' : 'small-image'}
                            onMouseEnter={() => setIndex(i)}
                        />
                    ))}
                </div>
            </div>

            <div className='product-detail-desc'>
                <h1>{name}</h1>
                <div className='reviews'>
                    <div>
                        <AiFillStar />
                        <AiFillStar />
                        <AiFillStar />
                        <AiFillStar />
                        <AiOutlineStar />
                    </div>
                    <p>
                        ({rating || 188})
                    </p>
                </div>
                <h4>Details: </h4>
                <p>{details.substr(0, 1000)}...</p>
                <p className='price'>${price}</p>
                
                {/*<div className='quantity'>
                    <h3>Quantity:</h3>
                    <p className='quantity-desc'>
                        <span className='minus'
                        onClick={decQty}><AiOutlineMinus />
                        </span>
                        <span className='num'
                        onClick="">{qty}</span>
                        <span className='plus'
                        onClick={incQty}><AiOutlinePlus />
                        </span>
                    </p>
                </div>*/}

                <div className='buttons'>
                    <button type='button' 
                    className='add-to-cart'
                    onClick={handleAddToCart}>Add to Cart</button>
                    <button type='button' 
                    className='buy-now'
                    onClick={handleBuyNow}>Buy Now</button>
                    {/*<Toaster />*/}
                </div>
            </div>
        </div>

        <div className='maylike-products-wrapper'>
            <h2>You may also like</h2>
            <div className='marquee'>
                <div className='maylike-products-container track'>
                    {products.map((item) => (
                        <Product key={item._id} product={item} />
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
};

export const getStaticPaths = async () => {
    const query = `*[_type == "product"] {
        slug {
            current
        }
    }
    `;

    const products = await client.fetch(query);

    const paths = products.map((product) => ({
        params: {
            slug: product.slug.current
        }
    }));
    
    return {
        paths,
        fallback: 'blocking'
    }
}

export const getStaticProps = async ({ params: { slug }}) => {
    const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
    const productsQuery = '*[_type == "product"]'

    const product = await client.fetch(query);
    const products = await client.fetch(productsQuery)

    return {
      props: { products, product }
    }
};