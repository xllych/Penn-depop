import Card from "../components/Cards.js";
import React, { useEffect, useState } from 'react';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import { analytics, db } from "../firebaseConfig.js";
import { collection, getDocs } from "firebase/firestore";
import { addToCart } from "../components/cart.js";
import { useAuth } from "../components/auth.js";

const Product = () => {
    const user = useAuth();
    const [allProducts, setAllProducts] = useState([
       {/*} {
            id: 1,
            title: "Super Puff Brown",
            seller: "Ben Sanders",
            dateAdded: "10/27/24",
            price: 56,
            image: "/images/puffer.jpeg",
            details: "Lightly worn",
            status: "available"
        },
        {
            id: 2,
            title: "Airpods",
            seller: "Julia Lee",
            dateAdded: "11/02/24",
            price: 23,
            image: "/images/airpods.jpeg",
            details: "lightly worn",
            status:  "available"
        } */}
    ])

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

    const handleAddToCart = async (product) => {
        if (!user) {
            alert('You must be signed in to add items to your cart.');
            return;
        }
    
        try {
            await addToCart(user.uid, product);
            alert('Item added to cart successfully!');
        } catch (error) {
            console.error('Error adding item to cart:', error);
            alert('Failed to add item to cart.');
        }
    };
    

    return (
        <div className="max-w-5xl mx-auto mb-24">
            <h1 className="mt-20 text-[20px] font-poppins font-bold mb-8">
                All Products
            </h1>
                <div>
                <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}>
                    <Masonry gutter="1rem">
                        {allProducts.map((product) => (
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
                            onAddToCart={() => handleAddToCart(product)} 
                        />
                        ))}
                    </Masonry>
                </ResponsiveMasonry>
                </div>

        </div>
    );
  };
  
  export default Product;