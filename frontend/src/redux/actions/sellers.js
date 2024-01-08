import axios from "axios";

// get all sellers --- admin
export const getAllSellers = () => async (dispatch) => {
    try {
      dispatch({
        type: "getAllSellersRequest",
      });
  
      const { data } = await axios.get(`http://localhost:8000/api/shop/admin-all-sellers`, {
        withCredentials: true,
      });
  
      dispatch({
        type: "getAllSellersSuccess",
        payload: data.sellers,
      });
    } catch (error) {
      dispatch({
        type: "getAllSellerFailed",
      //   payload: error.response.data.message,
      });
    }
  };