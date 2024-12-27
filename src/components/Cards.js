import { format } from 'date-fns';
import { addToCart } from './cart';
import { useAuth } from './auth';

const Card = ({title, userName, createdAt, price, image, details, categories}) => {
    const formattedDate = createdAt ? format(new Date(createdAt.seconds * 1000), 'MMMM dd, yyyy') : 'Date not available';
    const user = useAuth();
    const handleAddToCart = async () => {
        if (!user) {
            alert('You must be signed in to add items to your cart.');
            return;
        }

        const item = {
            id: title, // Use a unique identifier for the item
            title,
            price,
            imageUrl: image,
            details,
            userName,
            createdAt: formattedDate,
            categories
        };

        try {
            await addToCart(user.uid, item); // Call the addToCart function with user ID and item
            alert('Item added to cart successfully!');
        } catch (error) {
            console.error('Error adding item to cart:', error);
            alert('Failed to add item to cart.');
        }
    };

    return (

        <div className="bg-[#F6F7FC] rounded-lg shadow-sm overflow-hidden">
            {/* Image */}
            <div className="relative w-full overflow-hidden">
                <img 
                    src={image}
                    alt={title}
                    className="object-cover inset-0 w-full h-full"
                />
            </div>

            {/*Product Info*/}
            <div className="p-4">
                <h3 className="text-xl font-bold font-poppins mb-1">
                    {title}
                </h3>
                <p className="text-sm text-gray-600 mb-1 font-poppins">
                    Seller: {userName}
                </p>
                <p className="text-sm mb-2 text-gray-400 font-poppins">
                    Date added: {formattedDate}
                </p>
                <p className="text-[#2B4398] font-bold mb-3">
                    ${price}
                </p>
                <div className='mb-4'>
                    <h5 className='font-bold font-poppins mb-1'>
                        Categories: 
                    </h5>
                    <div className='flex flex-wrap gap-2'>
                        {categories.map((category, index) => (
                            <span
                                key={index}
                                className='py-1 px-3 text-[12px] font-poppins text-white rounded-full bg-[#2B4398]'
                            >
                                {category}
                            </span>
                        )
                        )}
                    </div>
                </div>
                
                <div className="mb-4">
                <h4 className="font-bold mb-1 font-poppins">
                    Additional details
                </h4>
                    <p className="text-gray-600 text-sm whitespace-pre-line font-poppins">
                        {details}
                    </p>
                </div>

                <button onClick={handleAddToCart} className="w-full bg-[#2B4398] text-white py-2 px-4 font-poppins rounded-md hover:bg-blue-900 transition-colors">
                    Add to cart
                </button>

            </div>
        </div>
    );
};
export default Card;