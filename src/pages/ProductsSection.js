import { Link } from 'react-router-dom'; 

const ProductsSection = () => {
    
    return (
        <section className="max-w-full h-auto bg-white mt-20">
            <div className="max-w-7xl mx-auto">
                <Link to="/product">
                    <h1 className="text-[20px] font-poppins font-bold ml-16">
                        All products
                    </h1>
                </Link>
                
            </div>
        </section>
    )
};

export default ProductsSection;