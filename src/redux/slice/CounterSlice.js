import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import UseAuth from "../../custem-hooks/UserAuth";
import { toast } from "react-toastify";
import { collection, onSnapshot } from 'firebase/firestore'

import { db } from "../../firebase/firebaseConfig";
import { updateDoc, doc } from "firebase/firestore";
const initialState = {
    cartItem: localStorage.getItem('cartItem') ? JSON.parse(localStorage.getItem("cartItem")) : [],
    totalAmount: 0,
    curentUserEmail: ''
}

const CounterSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {

            const filterdData = state.cartItem.find(item => item.id == action.payload.id)
            if (!filterdData) {
                state.cartItem.push({ ...action.payload, quantity: 1 })
                toast.success("added")
            }
            else {
                filterdData.quantity++;
            }
            state.totalAmount = state.cartItem.reduce((prev, cur) => {
                return prev + (Number(cur.price) * Number(cur.quantity));
            }, 0);
            localStorage.setItem("cartItem", JSON.stringify(state.cartItem)); // Convert the array to JSON string

        },
        concaticatData: (state, action) => {
            console.log("trigred")
            action.payload.cartItem?.forEach(itemToAdd => {
                const filteredData = JSON.parse(localStorage.getItem("cartItem")).find(item => item.id === itemToAdd.id);

                if (!filteredData) {
                    const existingArray = JSON.parse(localStorage.getItem('cartItem')) || [];
                    existingArray.push(itemToAdd);
                    localStorage.setItem('cartItem', JSON.stringify(existingArray));
                    console.log(JSON.parse(localStorage.getItem("cartItem")), 'push')
                } else {
                    const existingArray = JSON.parse(localStorage.getItem('cartItem')) || [];
                    existingArray.map(item =>
                        item.id == filteredData.id ? { ...item, quantity: item.quantity + filteredData.quantity } : item
                    )
                    localStorage.setItem('cartItem', JSON.stringify(existingArray.map(item =>
                        item.id == filteredData.id ? { ...item, quantity: itemToAdd.quantity + filteredData.quantity } : item
                    )));
                    console.log(JSON.parse(localStorage.getItem("cartItem")), '++++')

                }
            });

            async function addToDb() {
                const collectionRef = doc(db, "users", action.payload.id);
                await updateDoc(collectionRef, { cartItems: JSON.parse(localStorage.getItem("cartItem")) })
                    .then(() => {
                        console.log("Document successfully updated.");
                    })
                    .catch((error) => {
                        console.error("Error updating document: ", error);
                    });
            }
            addToDb()
        },
        deleteItem: (state, action) => {
            state.cartItem = state.cartItem.filter(item => item.id !== action.payload.id)
            localStorage.setItem("cartItem", JSON.stringify(state.cartItem)); // Convert the array to JSON strin

        },
        addCartItemToFirestore: (state, action) => {
            async function addToDb() {
                const collectionRef = doc(db, "users", action.payload);
                await updateDoc(collectionRef, { cartItems: JSON.parse(localStorage.getItem("cartItem")) }, { merge: true })
                    .then(() => {
                        console.log("Document successfully updated.");
                    })
                    .catch((error) => {
                        console.error("Error updating document: ", error);
                    });
            }
            addToDb()
        },
        clearState: (state, action) => {
            state.cartItem = []
            localStorage.clear()
        }
    }
});

export const { addItem, clearState, deleteItem, concaticatData, addCartItemToFirestore } = CounterSlice.actions

export default CounterSlice.reducer