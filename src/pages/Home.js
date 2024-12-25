import React from 'react';
import Categories from '../components/Categories.js';
import ProductsSection from './ProductsSection.js';


const Home = () => {
    return (
        <div className='mb-24'>
            <Categories />
            <ProductsSection />

        </div>
    );
  };
  
  export default Home;