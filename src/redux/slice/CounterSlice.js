import { toast } from "react-toastify";
import { db } from '../../firebase/firebaseConfig'
import { updateDoc, doc, setDoc } from "firebase/firestore";
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    cartItem: localStorage.getItem('cartItem') ? JSON.parse(localStorage.getItem("cartItem")) : [],
    totalAmount: 0,
    curentUserEmail: '',
    status: 'loading',
    dataFromFireBase: [],
    finalCartItems: [],
    isLogedIn: false,
    lang: localStorage.getItem("lang") ? localStorage.getItem("lang") :"en"
}

const CounterSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        getAllData: (state, action) => {
            state.dataFromFireBase = action.payload.data;
            state.isLogedIn = action.payload.isLogedIn
        },
        addItem: (state, action) => {
            state.isLogedIn ? state.cartItem = state.dataFromFireBase : ""
            const filterdData = state.cartItem.find(item => item.id == action.payload.id)
            if (!filterdData) {
                state.cartItem.push({ ...action.payload, quantity: 1 })
                toast.success("added")
            }
            else {
                filterdData.quantity++;
            }
            console.log(Array.from(state.cartItem))
        },
        deleteItem: (state, action) => {
            state.isLogedIn ? state.cartItem = state.dataFromFireBase : ""
            state.cartItem = state.cartItem.filter(item => item.id !== action.payload.id)
        },
        total: (state, action) => {
            state.isLogedIn ? state.cartItem = state.dataFromFireBase : ""
            state.totalAmount = state.cartItem?.reduce((prev, cur) => {
                return prev + (Number(cur?.price) * Number(cur?.quantity));
            }, 0);
        },
        addToLocalStorage: (state, action) => {
            localStorage.setItem("cartItem", JSON.stringify(state.cartItem));
        },
        increase: (state, action) => {
            state.isLogedIn ? state.cartItem = state.dataFromFireBase : ""
            const filterdData = state.cartItem.find(item => item.id == action.payload.id)
            filterdData.quantity++;
        },
        decrease: (state, action) => {
            state.isLogedIn ? state.cartItem = state.dataFromFireBase : ""
            const filterdData = state.cartItem.find(item => item.id == action.payload.id)
            if (filterdData.quantity > 1) {

                filterdData.quantity--;
            }
        },

        addCartItemToFirestore: (state, action) => {
            async function addToDb() {
                const collectionRef = doc(db, "users", action.payload);

                await updateDoc(collectionRef, { cartItems: state.cartItem }, { merge: true })
                    .then(() => {
                        console.log("Document successfully updated.");
                    })
                    .catch((error) => {
                        console.error("Error updating document: ", error);
                    });
            }
            addToDb()
        },
        mergeCartItemToFirestore: (state, action) => {
            async function addToDb() {
                const collectionRef = doc(db, "users", action.payload);

                await updateDoc(collectionRef, { cartItems: state.finalCartItems }, { merge: true })
                    .then(() => {
                        console.log("Document successfully updated.");
                    })
                    .catch((error) => {
                        console.error("Error updating document: ", error);
                    });
            }
            if (JSON.parse(localStorage.getItem("cartItem")) && action.payload) {
                addToDb()

                localStorage.clear()
            }
        },
        mergeData: (state, action) => {
            if (JSON.parse(localStorage.getItem("cartItem"))) {
                state.finalCartItems = []
                state.cartItem?.forEach((item1) => {
                    // Check if there's a corresponding item with the same 'id' in state.dataFromFireBase
                    const isFind = state.dataFromFireBase?.find((item2) => item1.id === item2.id);

                    if (isFind) {
                        // If a matching item is found, update its 'quantity' and add it to state.finalCartItems
                        state.finalCartItems?.push({ ...isFind, quantity: isFind.quantity + item1.quantity });
                    } else {
                        // If no matching item is found, add the item from state.cartItem to state.finalCartItems
                        state.finalCartItems?.push({ ...item1 });
                    }
                });

            } else {
                state.finalCartItems = state.dataFromFireBase
            }
        },
        clearState: (state, action) => {
            state.cartItem = []
            localStorage.clear()
        },
        arabic: (state, action) => {
            state.lang = "ar"
            console.log("ar")
            localStorage.setItem("lang", state.lang)
        },
        english: (state, action) => {
            state.lang = "en"
            console.log("en")
            localStorage.setItem("lang", state.lang)

        },
        francais: (state, action) => {
            state.lang = "fr"
            console.log("en")
            localStorage.setItem("lang", state.lang)
        },
    }
});

export const { addItem, mergeData, decrease, increase, mergeCartItemToFirestore, clearState, getAllData, addToLocalStorage, total, deleteItem, addCartItemToFirestore, english, arabic, francais } = CounterSlice.actions
export default CounterSlice.reducer