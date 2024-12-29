import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import Card from "../components/Cards.js";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { fetchCartData, addToCart, removeFromCart } from '../components/cart.js';
import { useAuth } from '../context/AuthContext.js';

const Cart = () => {

    // const [cart, setCart] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cartItems, setCartItems] = useState([]);

    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        if(user) {
            fetchCartData(user.uid)
                .then(cartData => {
                const availableItems = cartData.filter(item => item.status === 'available');
                setCartItems(availableItems);
                console.log('fetch cart successful');
                })
                .catch(err => setError(err.message))
                .finally(() => setIsLoading(false));
        }
    }, [user]);

    const handleRemoveFromCart = async (itemId) => {
        if (!user) {
            alert('You must be signed in to modify your cart.');
            return;
        }

        try {
            await removeFromCart(user.uid, itemId); // Call remove function
            setCartItems(prevItems => prevItems.filter(item => item.id !== itemId)); // Update local state
            alert('Item removed from cart successfully!');
        } catch (error) {
            console.error('Error removing item from cart:', error);
            alert('Failed to remove item from cart.');
        }
    };
    
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
                        price={cartItem.price}
                        image={cartItem.imageUrl}
                        details={cartItem.details}
                        categories={cartItem.categories}
                        status={cartItem.status}
                        createdAt={cartItem.createdAt}
                        isInCart={true}
                        onRemove={()=>handleRemoveFromCart(cartItem.id)}
                    />
                ))}
                </Masonry>
            </ResponsiveMasonry> 
            )}
        </div>
    );
  };
  
  export default Cart;