import React, { createContext, useContext, useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children }) => {

    const setLocalContext = ({ totalPrice, totalQuantities, cartItems }) => {
        setTotalPrice(totalPrice);
        setTotalQuantities(totalQuantities);
        setCartItems(cartItems);
    };

    const [handleLocalStorage, setHandleLocalStorage] = useState('load')
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);
    
    const [allProducts, setAllProducts] = useState([]);
    const [searchResult, setSearchResult] = useState([]);
    

    let foundProduct;
    let index;

    const onAdd = (product, quantity) => {
        const checkProductInCart = cartItems.find((item) => item._id === product._id);

        setTotalPrice((prevTotalPrice) => +(prevTotalPrice + product.price * quantity).toFixed(2));
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

        if(checkProductInCart) {
            const updatedCartItems = cartItems.map((cartProduct) => {
                if(cartProduct._id === product._id) return {
                    ...cartProduct,
                    quantity: cartProduct.quantity + quantity
                }
            })

            setCartItems(updatedCartItems);
        } else {
            product.quantity = quantity;
            
            setCartItems([...cartItems, { ...product }]);
        }
        toast.success(`${qty} ${product.name} added to the cart.`);
        
    };

    const onRemove = (product) => {
        foundProduct = cartItems.find((item) => item._id === product._id);
        const newCartItems = cartItems.filter((item) => item._id !== product._id);
         

        setTotalPrice((prevTotalPrice) => +(prevTotalPrice - foundProduct.price * foundProduct.quantity).toFixed(2));
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity);
        setCartItems(newCartItems);
    };

    const toggleCartItemQuantity = (id, value) => {
        foundProduct = cartItems.find((item) => item._id === id);
        index = cartItems.findIndex((product) => product._id === id);
        const newCartItems = cartItems.filter((item) => item._id !== id);

        if(value === 'inc') {
            setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity +1 } ]);
            setTotalPrice((prevTotalPrice) => +(prevTotalPrice + foundProduct.price).toFixed(2));
            setTotalQuantities((prevTotalQuantities) => prevTotalQuantities +1);
        } else if(value === 'dec') {
            if(foundProduct.quantity > 1) {
                setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity -1 } ]);
                setTotalPrice((prevTotalPrice) => +(prevTotalPrice - foundProduct.price).toFixed(2));
                setTotalQuantities((prevTotalQuantities) => prevTotalQuantities -1);
            };
        };
    };

    const incQty = () => {
        setQty((prevQty) => prevQty + 1)
    };

    const decQty = () => {
        setQty((prevQty) => {
            if(prevQty - 1 < 1) return 1;
            
            return prevQty - 1
    });
    };

    const invoiceList = {
        5.65: 'https://www.paypal.com/invoice/p/#E2R3UQ367XGK6UGG',
        7.99: 'https://www.paypal.com/invoice/p/#U4M8ADL5822JQZPA',
        9.99: 'https://www.paypal.com/invoice/p/#VJEDBQ6WVYQRNM5Q',
        11.30: 'https://www.paypal.com/invoice/p/#PF3ZV4LKQLWYCPZW',
        13.64: 'https://www.paypal.com/invoice/p/#HY6CWFM3C45FLARK',
        14.99: 'https://www.paypal.com/invoice/p/#6YFM8FAW92PTVGHN',
        15.98: 'https://www.paypal.com/invoice/p/#SLF52HM4D7C2WUTJ',
        17.98: 'https://www.paypal.com/invoice/p/#XCQHEZALH4PCXS8W',
        19.98: 'https://www.paypal.com/invoice/p/#88ET8A4HXYKF8L7B',
        23.63: 'https://www.paypal.com/invoice/p/#DDBJGPX4DN82ZT6V',        
        23.97: 'https://www.paypal.com/invoice/p/#FMBXXU85QL89LMUT',
        29.97: 'https://www.paypal.com/invoice/p/#XHZ46LWCBCSSZM64',
        31.96: 'https://www.paypal.com/invoice/p/#9UMUU6Y3XLQJPL7L',
        39.95: 'https://www.paypal.com/invoice/p/#P64BZG6EPMHT326D',
        39.96: 'https://www.paypal.com/invoice/p/#VHZ789T6PLVW5FKJ',
        49.95: 'https://www.paypal.com/invoice/p/#WLUY4A8VPERYSCXZ',
    };

 

    return (
        <Context.Provider
            value={{
                showCart,
                setShowCart,
                cartItems,
                totalPrice,
                totalQuantities,
                qty,
                incQty,
                decQty,
                onAdd,
                toggleCartItemQuantity,
                onRemove,
                setCartItems,
                setTotalPrice,
                setTotalQuantities,

                allProducts,
                setAllProducts,

                searchResult,
                setSearchResult,

                invoiceList,
                
                setLocalContext,

                handleLocalStorage,
                setHandleLocalStorage,
                                
            }}
        >
            {children}
            <Toaster />
        </Context.Provider>
    )
};

export const useStateContext = () => useContext(Context);