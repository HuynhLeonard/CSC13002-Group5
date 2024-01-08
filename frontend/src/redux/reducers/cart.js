import {createReducer} from "@reduxjs/toolkit";

const initialState = {
    // get all items in the localstorage
    cart: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems")) : []
};

export const cartReducer = createReducer(initialState, {
    addToCart: (state, action) => {
        const item = action.payload;
        const isItemExist = state.cart.find((i) => i._id === item._id);

        if(isItemExist) {
            return {
                ...state,
                // if the item is already in the cart => keep it the same
                cart: state.cart.map((i) => (i._id === isItemExist ? item : i))
            }
        } else {
            return {
                ...state,
                cart: [...state.cart, item]
            };
        }
    },

    removeFromCart: (state, action) => {
        const removedItemID = action.payload; // get the id from action
        const newCart = state.cart.filter((i) => i._id !== removedItemID);
        return {
            ...state,
            cart: newCart
        }
    }
});