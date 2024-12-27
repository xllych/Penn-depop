import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

export const useAuth = (navigate) => {
    const [user, setUser] = useState(null);
    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
                const userData = userDoc.data();
                setUser({
                    ...currentUser,
                username: userData?.username || 'Anonymous'
        });
            } else {
                alert('You must be signed in to use this service.');
                window.location.href = '/login';
            }
        });
        return () => unsubscribe();
    }, [auth, db]);

    return user;
};