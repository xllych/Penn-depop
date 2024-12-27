import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import Card from "../components/Cards.js";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { fetchCartData, addToCart, removeFromCart } from '../components/cart.js';
import { useAuth } from '../components/auth.js';

const Cart = () => {

    // const [cart, setCart] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cartItems, setCartItems] = useState([]);

    const navigate = useNavigate();
    const user = useAuth(navigate);

    useEffect(() => {
        if(user) {
            fetchCartData(user.uid)
                .then(cartData => setCartItems(cartData))
                .catch(err => setError(err.message))
                .finally(() => setIsLoading(false));
        }
    }, [user]);
    
    return (
        <div className="max-w-5xl mx-auto mb-24">
            <h1 className="mt-20 text-[20px] font-poppins font-bold mb-8">
                Cart
            </h1>
            { cartItems.length === 0 ? (
                <p>
                No items in cart.
                </p>) : (
            <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}>
                <Masonry gutter ="1rem">
                {cartItems.map((cartItem) => (
                    <Card 
                        key={cartItem.id}
                        title={cartItem.title}
                        userName={cartItem.userName}
                        dateAdded={cartItem.dateAdded}
                        price={cartItem.price}
                        image={cartItem.image}
                        details={cartItem.details}
                        categories={cartItem.categories}
                        status={cartItem.status}
                    />
                ))}
                </Masonry>
            </ResponsiveMasonry> 
            )}
        </div>
    );
  };
  
  export default Cart;