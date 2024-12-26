import React from 'react';
import { useParams } from 'react-router-dom';
import Card from '../components/Cards';
import { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection,getDocs } from 'firebase/firestore';
import Masonry from 'react-responsive-masonry';
import { ResponsiveMasonry } from 'react-responsive-masonry';

const CategoryPage = () => {
    // Get category from URL parameter
    const {categoryName} = useParams();
    console.log("Category name", categoryName);

    const [allProducts, setAllProducts] = useState([])
 
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


    const filteredProducts = allProducts.filter(
        product => product.categories?.some(category => category.toLowerCase()
        === categoryName?.toLowerCase())
    );

    return (
        <div className="max-w-5xl mx-auto mb-24">
            <h1 className="mt-20 text-[20px] font-poppins font-bold mb-8">
                {categoryName}
            </h1>
                {filteredProducts.length === 0 ? (
                    <p>No products found in this category.</p>
                ): 
                
                (<ResponsiveMasonry columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}>
                    <Masonry gutter="1rem">
                        {filteredProducts.map((product) => (
                        <Card
                            key={product.id}
                            title={product.title}
                            seller={product.seller}
                            createdAt={product.createdAt}
                            price={product.price}
                            image={product.imageUrl}
                            details={product.details}
                            status={product.status}
                            categories={product.categories || []}
                        />
                        ))}
                    </Masonry>
                </ResponsiveMasonry>
            )}
        </div>
    );
};
export default CategoryPage;
