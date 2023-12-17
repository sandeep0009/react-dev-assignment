import { useState, useEffect } from 'react';
import axios from 'axios';

const SearchComponent = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState('');
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/data");
        console.log(res.data);
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleWishlistClick = (productId) => {
    setWishlist((prevWishlist) => {
      if (prevWishlist.includes(productId)) {
        return prevWishlist.filter((id) => id !== productId);
      } else {
        return [...prevWishlist, productId];
      }
    });
  };

  return (
    <div className='container'>
        <div className="inside-container">

       
      <input type="text" value={filter} onChange={handleFilterChange} placeholder='Search your product here'/>
      {data
        .filter((product) => product.name.toLowerCase().includes(filter.toLowerCase()))
        .map((product) => (
          <div key={product.id}>
            <p>{product.name}</p>
            {/* Wishlist Button */}
            <button
              style={{ color: wishlist.includes(product.id) ? 'red' : 'black' }}
              onClick={() => handleWishlistClick(product.id)}
            >
              Wishlist
            </button>
            <button onMouseOver={() => console.log('View Product')}>View Product</button>
          </div>
        ))}
         </div>
    </div>
  );
};

export default SearchComponent;
