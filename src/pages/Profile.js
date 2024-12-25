import React, { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import Card from "../components/Cards.js";

const Profile = () => {
    const [listings] = useState([
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




    {/*const [username, setUsername] = useState('JD');*/}
    const [profileImage, setProfileImage] = useState(null);
    const [newUsername, setNewUsername] = useState('');

    const handleProfileImageChange = (e) => {
        const file = e.target.files[0];
        if(file) {
            const reader = new FileReader();
                reader.onload = () => setProfileImage(reader.result);
                reader.readAsDataURL(file);
        }
    }

    const handleUsernameSubmit = (e) => {
        e.preventDefault();
        if (newUsername.trim()) {
            setNewUsername(newUsername);
            //setNewUsername('');
        }
    }

    return (
        <div className="max-w-7xl mx-auto py-12 px-6 mb-24">
            <div className='flex items-start space-x-16'>
                <div className='space-y-8'>
                    {/* Left Container */}
                    <h1 className='font-bold font-poppins text-[24px] mb-8'>
                        Profile
                    </h1>
                    <div className="flex items-center space-x-6 mb-12">
                        <div className="relative">
                            <img
                                src={profileImage || 'https://via.placeholder.com/150'}
                                alt="Profile"
                                className="w-36 h-36 aspect-square rounded-full object-cover border"
                            />
                            <label
                                htmlFor="profile-image-upload"
                                className="absolute bottom-0 right-0 bg-gray-700 text-white w-16 h-16 rounded-full cursor-pointer flex items-center justify-center"
                                >
                                <FaEdit size={16}/>
                            </label>
                            <input
                                type="file"
                                id="profile-image-upload"
                                className="hidden"
                                onChange={handleProfileImageChange}
                            />
                        </div>
                <div>
                    <h1 className="text-2xl font-bold mb-4">
                        User000
                    </h1>
                        <form onSubmit={handleUsernameSubmit} className="flex items-center space-x-4">
                            <input
                                type="text"
                                value={newUsername}
                                onChange={(e) => setNewUsername(e.target.value)}
                                placeholder="Edit username"
                                className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            
            {/* Right Column */}
            <div className='space-y-8 w-[50%]'>
                <h2 className='font-bold font-poppins text-[24px] mb-8'>
                    My Listings
                </h2>
                <ResponsiveMasonry columnsCountBreakPoints={{400: 1, 750: 2, 900: 3}}>
                    <Masonry gutter="1rem">
                        {listings.map((listing) => (
                            <Card
                                key={listing.id}
                                title={listing.title}
                                seller={listing.seller}
                                dateAdded={listing.dateAdded}
                                price={listing.price}
                                image={listing.image}
                                details={listing.details}
                            />
                        ))}
                    </Masonry>
                </ResponsiveMasonry>
            </div>
                
        </div>
    </div>
    );
};
export default Profile;