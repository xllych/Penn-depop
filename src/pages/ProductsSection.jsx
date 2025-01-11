import { Link } from 'react-router-dom'; 
import { ResponsiveMasonry } from 'react-responsive-masonry';
import Masonry from 'react-responsive-masonry';
import Card from '../components/Cards';

const ProductsSection = ({ allProducts }) => {
    const productsToShow = allProducts.slice(0, 6);

    return (
        <section className="max-w-full h-auto bg-white mt-20">
            <div className="max-w-7xl mx-auto">
                <Link to="/product">
                    <h1 className="text-[20px] font-poppins font-bold ml-16 mb-16">
                        All products
                    </h1>
                </Link>
                
                <div className='max-w-5xl mx-auto'>
                <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}>
                    <Masonry gutter="1rem">
                    {productsToShow
                            .filter(product => product.status === 'available')
                            .map((product) => (
                            <Card
                                key={product.id}
                                title={product.title}
                                userName={product.userName}
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
                </div>
                
                <Link to="/product">
                    <div className='mx-auto font-bold font-poppins mt-20 text-[24px] flex justify-center items-center'>
                        View more
                    </div>
                </Link>
                
            </div>
        </section>
    )
};

export default ProductsSection;