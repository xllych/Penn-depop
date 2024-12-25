
const Card = ({title, seller, dateAdded, price, image, details}) => {
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
                    {seller}
                </p>
                <p className="text-sm mb-2 text-gray-400 font-poppins">
                    Date added: {dateAdded}
                </p>
                <p className="text-[#2B4398] font-bold mb-3">
                    ${price}
                </p>
                <div className="mb-4">
                <h4 className="font-bold mb-1 font-poppins">
                    Additional details
                </h4>
                    <p className="text-gray-600 text-sm whitespace-pre-line font-poppins">
                        {details}
                    </p>
                </div>

                <button className="w-full bg-[#2B4398] text-white py-2 px-4 font-poppins rounded-md hover:bg-blue-900 transition-colors">
                    Add to cart
                </button>

            </div>
        </div>
    );
};
export default Card;