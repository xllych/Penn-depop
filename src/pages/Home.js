import React from 'react';
import Categories from '../components/Categories.js';
import ProductsSection from './ProductsSection.js';
import { db } from '../firebaseConfig.js';
import { collection, getDocs } from 'firebase/firestore';
import { useState, useEffect } from 'react';


const Home = () => {
    const [allProducts, setAllProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Reference to the 'items' collection
                const productsCollection = collection(db, 'items');
                console.log("Got a reference to collection");
    
                // Get the documents in the 'items' collection
                const productSnapShot = await getDocs(productsCollection);
                console.log("Got the documents");
    
                // Map the documents to an array and format
                const productList = productSnapShot.docs.map(doc => ({
                    id: doc.id, // Firestore document ID
                    ...doc.data(), // Firestore document data
                }));
                console.log("Successfully mapped each document");

                setAllProducts(productList);
                console.log("Got all products");
            } catch(error) {
                console.error("Error fetching products: ", error);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className='mb-24'>
            <Categories />
            <ProductsSection allProducts={allProducts}/>

        </div>
    );
  };
  
  export default Home;