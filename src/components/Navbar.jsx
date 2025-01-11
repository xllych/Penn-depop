import React from 'react';
import { Link } from 'react-router-dom';  
import { FaSearch } from 'react-icons/fa';
import { FaShoppingCart} from 'react-icons/fa'; 
import { useAuth } from '../context/AuthContext';
import { useState, useEffect, useRef } from 'react';
import { doc, getDocs, query, getDoc, collection  } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const Navbar = () => {
    const { user } = useAuth();
    const [userProfileImage, setUserProfileImage] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [allItems, setAllItems] = useState([]);
    const searchRef = useRef(null);

    // Fetch user profile picture
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

    // Fetch all products
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const q = query(collection(db, 'items'));
                const querySnapshot = await getDocs(q);
                const items = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setAllItems(items.filter((item) => item.status === "available"));
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };

        fetchItems();
    }, []);

    // Search logic
    const handleSearch = (value) => {
        setSearchTerm(value);
        
        if (value.trim() === '') {
            setSearchResults([]);
            setIsSearching(false);
            return;
        }

        const filteredItems = allItems.filter(item => {
            const searchValue = value.toLowerCase();
            return (
                item.title?.toLowerCase().includes(searchValue) ||
                item.details?.toLowerCase().includes(searchValue) ||
                item.categories?.some(category => 
                    category.toLowerCase().includes(searchValue)
                )
            );
        }).slice(0, 5); // Limit to 5 results for preview

        setSearchResults(filteredItems);
        setIsSearching(true);
    };

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
                        
                        <div className="relative flex-1 max-w-xs" ref={searchRef}>
                                <input
                                type='search'
                                value={searchTerm}
                                onChange={(e) => handleSearch(e.target.value)}
                                onFocus={() => setIsSearching(true)}
                                placeholder='Search'
                                className='w-full pl-8 pr-4 h-8 text-[13px] bg-[#F1F1F1] rounded-full font-poppins'
                            />
                            <FaSearch
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#838383]"
                                size={13}
                            />
                        </div>
                    </div>

                    {/* Search Results Dropdown */}
                    {isSearching && searchResults.length > 0 && (
                                <div className="absolute left-64 top-12 right-0 mt-2 w-72 bg-white rounded-lg shadow-lg max-h-96 overflow-y-auto z-10">
                                    {searchResults.filter(item => item.status === "available").map((item) => (
                                        <div
                                            key={item.id}
                                            className="p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                                        >
                                            <div className="flex items-start space-x-3">
                                                {item.imageUrl && (
                                                    <img
                                                        src={item.imageUrl}
                                                        alt={item.title}
                                                        className="w-10 h-10 object-cover rounded"
                                                    />
                                                )}
                                                <div>
                                                    <h3 className="font-medium text-sm">{item.title}</h3>
                                                    <p className="text-xs text-gray-500">
                                                        ${item.price}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* No Results Message */}
                            {isSearching && searchTerm && searchResults.length === 0 && (
                                <div className="absolute w-96 mt-24 ml-64 bg-white rounded-lg shadow-lg p-3">
                                    <p className="text-sm text-gray-500">No items found</p>
                                </div>
                            )}
                        


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