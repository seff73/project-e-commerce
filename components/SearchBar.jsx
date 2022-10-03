import React, { useEffect, useState } from 'react'
import { useStateContext } from '../context/StateContext';
import SearchIcon from '@material-ui/icons/Search';
import Link from 'next/link';
import { useRouter } from 'next/router';




export default function SearchBar({ placeholder, data, setSearchResult }) {
  
  const { cartItems, totalPrice, totalQuantities } = useStateContext();
  const [ searchValue, setSearchValue ] = useState("");
  const [ filteredData, setFilteredData ] = useState([]);

  const router = useRouter();

  const handleSearch = (e) => {
    const searchWord = e.target.value.replace(/\s\s+/g, " ");
    setSearchValue(searchWord);
    if(searchWord.length > 0) {
      const newFilter = data.filter((item) => item.name.toLowerCase().includes(searchWord.toLowerCase()));
      setFilteredData(newFilter);

    }
    else {
      setFilteredData([]);
    };
  };

  const handleSelect = (itemName) => {
    setSearchValue(itemName);
    setFilteredData([]);
  };
  
  const handleSearchIcon = () => {
    setSearchResult(filteredData);
    setFilteredData([]);
    router.push('/results');
  };

  const handleEnter = (e) => {
    if(e.key === 'Enter') {
      handleSearchIcon();
      document.activeElement.blur();
    };
  };
  
  useEffect(() => {
    cartItems[0] &&
    localStorage.setItem('state', JSON.stringify({
      totalPrice: totalPrice, 
      totalQuantities: totalQuantities, 
      cartItems: cartItems }
    ));
  }, [cartItems])
  

  
  return (
    <div className='search'>
        <div className='search-inputs'>
          <input type='text' placeholder={placeholder} /*value={searchValue}*/ onChange={handleSearch} onKeyDown={handleEnter}/>
          
          <div className='search-icon' onClick={handleSearchIcon} >
            <SearchIcon />
          </div>

        </div>
        {/*filteredData.length != 0 && (

          
          <div className='data-result'>
            {filteredData.map((item) =>
              <div className='data-item-container'>
                <Link href={`/product/${item.slug.current}`}>
                   <p onClick={()=>handleSelect(item.name)}className='data-item2'>{item.name}</p>
                </Link>
              </div>
            )};
          </div>
            )*/}
    </div>
  )
}
