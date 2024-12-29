import React from 'react';
import { Link } from 'react-router-dom';  // Use if you're using React Router for navigation
import { FaSearch } from 'react-icons/fa';
import { FaComment } from 'react-icons/fa'; // Single chat bubble
import { FaShoppingCart} from 'react-icons/fa'; // Group of chat bubbles
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const Navbar = () => {
    const { user } = useAuth();
    const [userProfileImage, setUserProfileImage] = useState(null);
    useEffect(() => {
        if(user) {
            const fetchUserData = async () => {
                if(user?.providerData[0]?.providerId === 'google.com') {
                    // Use Google profile data if available
                    setUserProfileImage(user.photoURL);
                } else {
                try {
                    const userDocRef = doc(db, 'users', user.uid);
                    const userDoc = await getDoc(userDocRef);

                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        console.log(userData);
                        setUserProfileImage(userData.photoURL || null);
                        console.log('Navbar pfp updated');
                    }
                } catch (err) {
                    console.error('Error fetching user data:', err);
                }}
            };
            fetchUserData();
        }
    }, [user, db]);

    return (
        <nav className='bg-white drop-shadow-md'>
            <div className='max0w07xl mx-auto px-4 py-3'>
                <div className='flex items-center justify-between'>
                    {/* Logo and Search */}
                    <div className='flex items-center flex-1'>
                        <Link to="/">
                            <h1 className="ml-12 text-[30px] font-bold text-[#FF323C] mr-8 font-poppins">
                                Penn depop
                            </h1>
                        </Link>
                        
                        <div className="relative flex-1 max-w-xs">
                            <input
                              type='search'
                              placeholder='Search'
                              className='w-full pl-8 pr-4 h-8 text-[13px] bg-[#F1F1F1] rounded-full font-poppins'
                            />
                            <FaSearch
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#838383]"
                                size={13}
                            />
                        </div>
                    </div>
                    {/* Navigation Items*/}
                    <div className='flex items-center space-x-6 ml-8 mr-12'>
                        <Link to="/upload">
                            <button className='px-6 py-2 rounded-full border border-[#838383] hover:bg-[#E2E6F6] transition-colors font-poppins'>
                                Sell
                            </button>
                        </Link>
                        
                        {/* Cart Icon */}
                        <Link to="/cart">
                            <FaShoppingCart 
                                className='text-[#838383] hover:text-[#E2E6F6] cursor-pointer'
                                size={20}
                                title="Cart"
                            />
                        </Link>
                        
                        {/* Chat Icon 
                        <Link to="/chat">
                            <FaComment 
                                className='text-[#838383] hover:text-[#E2E6F6] cursor-pointer'
                                size={20}
                                title="Chat"
                            />
                        </Link> */}
                        
                        {/* Profile Avatar*/}
                        <Link to="/profile">
                            <img
                                src={userProfileImage || "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"}
                                alt="Profile Avatar"
                                className='w-10 h-10 rounded-full border-2 border-[#2B4398] hover:border-[#99A5D0] cursor-pointer'
                                title="Profile"
                            />
                        </Link>
                        
                    </div>
                </div>
            </div>
        </nav>
    );
};
export default Navbar;