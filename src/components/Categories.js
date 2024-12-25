
const categories = [
    { id: 1, name: 'Furniture', image: '/images/Furniture.png' },
    { id: 2, name: 'Beauty', image: '/images/Makeup.png' },
    { id: 3, name: 'Food', image: '/images/Food.png' },
    { id: 4, name: 'Jewelry', image: '/images/Jewelry.png' },
    { id: 5, name: 'Electronics', image: '/images/Electronics.png' },
    { id: 6, name: 'Fun & games', image: '/images/Fun.png' },
    { id: 7, name: 'Athletics', image: '/images/Athletics.png' },
    { id: 8, name: 'Music & arts', image: '/images/Music.png' },
    { id: 9, name: 'Kitchen', image: '/images/Kitchen.png' },
    { id: 10, name: 'Clothing', image: '/images/Clothing.png' },
    { id: 11, name: 'Books & more', image: '/images/Books.png' },
    { id: 12, name: 'Misc.', image: '/images/Misc..png' },
    { id: 13, name: 'Bags', image: '/images/Bags.png' },
    { id: 14, name: 'Shoes', image: '/images/Shoes.png' }
];

const CategoryItem = ({ name, image }) => (
    <div className="flex flex-col items-center">
        <div className="w-28 h-28 rounded-full overflow-hidden mb-4">
            <img
                src={image}
                alt={name}
                className="w-full h-full object-cover"
            />
        </div>
        <span className="text-[14px] font-poppins">{name}</span>
    </div>
);

const Categories = () => {
    return (
        <section className="max-w-full max-h-148 px-4 py-8 bg-[#F6F7FC] overflow-auto">
            <div className="max-w-7xl mx-auto">
                <h2 className="mt-10 ml-16 text-[20px] font-poppins font-bold mb-8">
                    Categories
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-x-0 gap-y-8 ml-6 mr-6 mb-16">
                    {categories.map((category) => (
                        <CategoryItem
                            key={category.name}
                            name={category.name}
                            image={category.image}
                        />
                    ))}
                </div>
            </div>
            
        </section>
    )
};
export default Categories;

