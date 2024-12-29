import React, { useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import Card from "../components/Cards.js";
import { useAuth } from '../context/AuthContext.js';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebaseConfig.js';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, doc, updateDoc, getDocs, collection, where, query } from 'firebase/firestore';
import { getDoc } from 'firebase/firestore';

const Profile = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [listings, setListings] = useState([]);
    const db = getFirestore();
    const storage = getStorage();
    const [profileImage, setProfileImage] = useState(null);
    const [newUsername, setNewUsername] = useState('');
    const [error, setError] = useState('');


    useEffect(() => {
        if(user) {
            const fetchListings = async () => {
                const q = query(collection(db, 'items'), 
            where('userId', '==', user.uid));
                const querySnapshot = await getDocs(q);
                const userListings = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setListings(userListings);
            };

            const fetchUserData = async () => {
                try {
                    const userDocRef = doc(db, 'users', user.uid);
                    const userDoc = await getDoc(userDocRef);
                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        console.log(userData);
                        setProfileImage(userData.photoURL);
                        setNewUsername(userData.username || 'Anonymous');
                    }
                } catch (err) {
                    console.error('Error fetching user data:', err);
                }
            };
            fetchListings();
            fetchUserData();
        }
    }, [user, db]);

    const handleMarkUnavailable = async (itemId) => {
        try {
          const itemRef = doc(db, 'items', itemId);
          await updateDoc(itemRef, {
            status: 'unavailable'
          });
          
          setListings(prevListings => 
            prevListings.map(item => 
              item.id === itemId ? { ...item, status: 'unavailable' } : item
            )
          );
          console.log(listings);
          // Update user's cart if the item is there
            const userRef = doc(db, 'users', user.uid);
            const userDoc = await getDoc(userRef);
            const cart = userDoc.data().cart || [];
            const updatedCart = cart.map(item => 
            item.id === itemId ? { ...item, status: 'unavailable' } : item
            );
            await updateDoc(userRef, { cart: updatedCart });
            console.log(updatedCart);
          
          alert('Item marked as unavailable');
          console.log(updatedCart);
        } catch (error) {
          console.error('Error marking item as unavailable:', error);
          alert('Failed to mark item as unavailable');
        }
      };

    const handleProfileImageChange = async (e) => {
        const file = e.target.files[0];
                
        if(file) {
            try{
                const storageRef = ref(storage, `profileImage/${user.uid}`);
                await uploadBytes(storageRef, file);
                const downloadUrl = await getDownloadURL(storageRef);
                setProfileImage(downloadUrl);
                console.log('pfp updated locally')

                // Update user db in Firestore
                const userDocRef = doc(db, 'users', user.uid);
                await updateDoc(userDocRef, {
                    photoURL: downloadUrl
                    
                })
                setProfileImage(downloadUrl);
                console.log('db updated');
            } catch (error) {
                console.error('Error uploading profile image: ', error);
            }
        }
    }

    const handleUsernameSubmit = async (e) => {
        e.preventDefault();
        if (newUsername.trim() && user) {
            try {
                const userDocRef = doc(db, 'users', user.uid);
                await updateDoc(userDocRef, {
                    userName: newUsername
                });
                setNewUsername('');
                alert('Username updated successfully');
            } catch(error) {
                console.error("Error updating username: ", error);
                alert("Failed to update username");
            }
            
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
                                src={profileImage || "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"}
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
                        { newUsername }
                    </h1>
                        <form onSubmit={handleUsernameSubmit} className="flex items-center space-x-4">
                            <input
                                type="text"
                                
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
                { listings.length === 0 ? (
                    <p>
                        No listings to show yet.
                    </p>
                ) : (
                <ResponsiveMasonry columnsCountBreakPoints={{400: 1, 750: 2, 900: 3}}>
                    <Masonry gutter="1rem">
                        {listings.map((listing) => (
                            <Card
                                key={listing.id}
                                title={listing.title}
                                userName={listing.userName}
                                dateAdded={listing.dateAdded}
                                price={listing.price}
                                image={listing.imageUrl}
                                details={listing.details}
                                categories={listing.categories || []}
                                status={listing.status}
                                createdAt={listing.createdAt}
                                isOwnListing={true}
                                onMarkUnavailable={() => handleMarkUnavailable(listing.id)}
                            />
                        ))}
                    </Masonry>
                </ResponsiveMasonry>
            )}
            </div>
                
        </div>
    </div>
    );
};
export default Profile;