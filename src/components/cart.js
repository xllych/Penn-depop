import { doc, getDoc, updateDoc, arrayRemove, arrayUnion, getFirestore } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { add } from "date-fns";

export const fetchCartData = async (userId) => {
    const userDocRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userDocRef);

    if(userDoc.exists()) {
        console.log("Successful retrieval");
        return userDoc.data().cart || [];
    } else {
        console.log("No such user!");
        return [];
    }
};

export const addToCart = async(userId, item) => {
    const userDocRef = doc(db, "users", userId);
    await updateDoc(userDocRef, {
        cart: arrayUnion(item)
    });
};

export const removeFromCart = async(userId, itemId) => {
    const userDocRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userDocRef);
    const cart = userDoc.data().cart || [];
    const updatedCart = cart.filter(item => item.id !== itemId);

    await updateDoc(userDocRef, {
        cart: updatedCart
    });
};

