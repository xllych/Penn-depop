import Card from "../components/Cards.js";
import React, { useState } from 'react';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"

const Product = () => {
    const [allProducts] = useState([
        {
            id: 1,
            title: "Super Puff Brown",
            seller: "Ben Sanders",
            dateAdded: "10/27/24",
            price: 56,
            image: "/images/puffer.jpeg",
            details: "Lightly worn"
        },
        {
            id: 2,
            title: "Airpods",
            seller: "Julia Lee",
            dateAdded: "11/02/24",
            price: 23,
            image: "/images/airpods.jpeg",
            details: "lightly worn"
        }
    ])
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
                            dateAdded={product.dateAdded}
                            price={product.price}
                            image={product.image}
                            details={product.details}
                        />
                        ))}
                    </Masonry>
                </ResponsiveMasonry>
                </div>

        </div>
    );
  };
  
  export default Product;