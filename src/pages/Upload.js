
import { FaCloudUploadAlt } from 'react-icons/fa';
import React, { useState } from 'react';

const Upload = () => {
    // Categories to loop through in map
    const categories = [
        'Food', 'Clothing', 'Furniture', 'Makeup', 'Kitchen',
        'Electronics', 'Music & arts', 'Shoes', 'Fun & games',
        'Books & more', 'Bags', 'Misc.', 'Athletics'
        ];

    const [selectedCategories, setSelectedCategories] = useState([]);
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [details, setDetails] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [uploading, setUploading] = useState(false);

    // Category selection
    const handleCategoryClick = (category) => {
    // Unchoose the category
    setSelectedCategories(prevCategories => {
        if (prevCategories.includes(category)) {
                return prevCategories.filter(c => c !== category);
            } else {
                return [...prevCategories, category];
            }
    });
    };

    // Handle uploaded image
    const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    // Create preview URL for image
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);

    };



    return (
    <div className="pt-16 px-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 gap-8">
            <div>
            {/* Heading */}
            <h1 className="font-bold font-poppins text-xl mb-6">
                Sell an item
            </h1>
            {/*Left Column*/}
            <div 
                // Trigger the finder open
                // onClick={handleFinderOpen}
                className="bg-gray-200 rounded-lg aspect-square flex flex-col items-center justify-center cursor-pointer hover:bg-[#99A5D0] hover:text-white transition-colors"
            >
                <input 
                    type="file"
                    multiple
                    onChange={handleImageChange}
                    className='hidden'
                    id="file-upload" // Hidde file input
                />
                <label htmlFor='file-upload'>
                    <FaCloudUploadAlt size={48} className="mb-2 ml-10" />
                    <span className="text-[15px] font-bold font-poppins">Upload an image</span>
                </label>
            
            </div>
            </div>
            {/*Right column*/}
            <div className="space-y-6">
                <div className="font-bold font-poppins text-xl mb-6">
                    
                </div>

                <input 
                    value={title}
                    // onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    placeholder="Add a title (item name)"
                    className="w-full p-4 font-poppins rounded-lg border text-[16px] focus:outline-none focus:ring-2 focus:ring-[#2B4398]"
                />

                <input
                    value={price}
                    // onChange={(e) => setPrice(e.target.value)}
                    type="text"
                    placeholder="Add a price (in nearest dollar)"
                    className="w-full p-4 font-poppins rounded-lg border text-[16px] focus:outline-none focus:ring-2 focus:ring-[#2B4398]"
                />

                <div>
                    <label className="text-[20px] font-poppins font-bold">
                        Additional details:
                    </label>
                    <textarea 
                        value={details}
                        // onChange={(e) => setDetails(e.target.value)}
                        placeholder="Enter additional details here..."
                        className="w-full mt-2 p-4 font-poppins rounded-lg border min-h-[200px] focus:outline-none focus:ring-2 focus:ring-[#2B4398]"
                    />
                </div>
            </div>
        </div>

        {/*Categories*/}
        <div className='max-w-7xl mt-24 mx-auto mb-24'>
            <h1 className='text-xl font-bold font-poppins mb-4'>
                Add category(s):
            </h1>
            <div className='flex flex-wrap gap-3'>
                {categories.map((category) => (
                    <button
                    
                    key={category}
                    onClick={() => handleCategoryClick(category)}
                    className={`px-6 py-2 rounded-full font-bold font-poppins transition-colors  ${
                      selectedCategories.includes(category)
                        ? 'bg-[#2B4398] text-white'
                        : 'bg-[#99A5D0] text-white opacity-90 hover:opacity-100'
                    }`}
                >
                    {category}
                  </button>
                ))}
            </div>
        </div>

        {/*Submit button*/}
        <div className='flex justify-center'>
            <button 
                // onClick={handleSubmit}
                disabled={uploading}
                className='mb-24 px-8 py-3 bg-[#2B4398] text-white font-bold font-poppins text-lg rounded-full hover:bg-[#99A5D0] transition-colors'
            >
                {/*{uploading ? 'Uploading...' : 'Submit'} */} 
            </button>
        </div>
    </div>
    );
};

export default Upload;