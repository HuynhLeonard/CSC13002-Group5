import axios from 'axios';

// get all orders of a user
export const getAllOrdersOfUser = (userID) => async (dispatch) => {
    try {
        dispatch({
            type: "getAllOrdersUserRequest"
        });

        const {data} = await axios.get(`http://localhost:8000/api/order/get-all-orders/${userID}`)
        dispatch({
            type: "getAllOrdersUserSuccess",
            payload: data.orders
        });

    } catch (error) {
        dispatch({
            type: "getAllOrdersUserFailed",
            payload: error.response.data.message
        })
    }
};

// the same with shop
export const getAllOrdersShop = (shopID) => async (dispatch) => {
    try {
        dispatch({
            type: "getAllOrderShopRequest"
        });

        const {data} = await axios.get(`http://localhost:8000/api/order/get-seller-all-orders/${shopID}`);
        dispatch({
            type: "getAllOrdersShopSuccess",
            payload: data.orders
        });

    } catch (error) {
        dispatch({
            type: "getAllOrdersShopFailed",
            payload: error.response.data.message
        })
    }
}