import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import Card from "../components/Cards.js";
import { useEffect, useState } from "react";

const Cart = () => {

    // const [cart, setCart] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

   {/*} useEffect(() => {
        const fetchCartData = async () => 
        {
            try {
                // Get reference to the cart collection
                const cartCollection = collection(db, 'cart');

                const querySnapshot = await getDocs(cartCollection);

                const cartIcons = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),

                    dateAdded: doc.data().dateAdded?.toDate().toLocaleDataString() || new Date().toLocaleDateString()
                }))
                
                setCart(data);
            } catch (err) {
                console.error('Error fetching cart');
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchCartData();
    }, []);

    if(isLoading) return 
    <div className="max-w-5xl mx-auto mt-20">
                <div className="font-poppins">Loading...</div>
    </div>
    if(error) {
        return  (
        <div className="max-w-5xl mx-auto mt-20">
            <div className="font-poppins text-red-500">Error: {error}</div>
        </div>)
        ;
    } */}

    const [cart] = useState([
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
        },
        {
            id: 3,
            title: "Airpods",
            seller: "Julia Lee",
            dateAdded: "11/02/24",
            price: 23,
            image: "/images/airpods.jpeg",
            details: "lightly worn"
        },
        {
            id: 4,
            title: "Super Puff Brown",
            seller: "Ben Sanders",
            dateAdded: "10/27/24",
            price: 56,
            image: "/images/puffer.jpeg",
            details: "Lightly worn"
        },
        {
            id: 5,
            title: "Airpods",
            seller: "Julia Lee",
            dateAdded: "11/02/24",
            price: 23,
            image: "/images/fun.png",
            details: "lightly worn"
        },
        {
            id: 6,
            title: "Airpods",
            seller: "Julia Lee",
            dateAdded: "11/02/24",
            price: 23,
            image: "/images/athletics.png",
            details: "lightly worn"
        },

    ])
    return (
        <div className="max-w-5xl mx-auto mb-24">
            <h1 className="mt-20 text-[20px] font-poppins font-bold mb-8">
                Cart
            </h1>

            <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}>
                <Masonry gutter ="1rem">
                {cart.map((cartItem) => (
                    <Card 
                        key={cartItem.id}
                        title={cartItem.title}
                        seller={cartItem.seller}
                        dateAdded={cartItem.dateAdded}
                        price={cartItem.price}
                        image={cartItem.image}
                        details={cartItem.details}
                    />
                ))}
                </Masonry>
            </ResponsiveMasonry>
        </div>
    );
  };
  
  export default Cart;