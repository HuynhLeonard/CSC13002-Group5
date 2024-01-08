// using local storage to store the wishlist => create order from there
export const addToWishList = (data) => async (dispatch, getState) => {
    dispatch({
        type: "addToWishList",
        // get data from local storage which is the initial state
        payload: data
    });

    localStorage.setItem("wishlistItems", JSON.stringify(getState().wishlist.wishlist));
    return data;
};

// remove from wishlist
export const removeFromWishList = (data) => async (dispatch, getState) => {
    dispatch({
        type: "removeFromWishList",
        payload: data._id
    });

    localStorage.setItem("wishlistItems", JSON.stringify(getState().wishlist.wishlist));
}