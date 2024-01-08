import axios from 'axios';

export const createevent = (newForm) => async (dispatch) => {
    try {
        dispatch({
            type: "eventCreateRequest"
        });

        const config = {headers: {"Content-Type": "multipart/form-data"}};

        const {data} = await axios.post(`http://localhost:8000/api/event/create-event`, newForm, config);

        dispatch({
            type: "eventCreateSuccess",
            payload: data.event,
        });
    } catch (error) {
        dispatch({
            type: "eventCreateFail",
            payload: error.response.data.message
        })
    }
};

// get all events of a shop
export const getAllEventsShop = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "getAlleventsShopRequest",
        });

        const {data} = await axios.get(`http://localhost:8000/api/event/get-all-events/${id}`);
        dispatch({
            type: "getAlleventsShopSuccess",
            payload: data.shopEvents,
        });

    } catch (error) {
        dispatch({
            type: "getAlleventsShopFailed",
            payload: error.response.data.message,
        })
    }
};

// delete an event
export const deleteEvent = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "deleteeventRequest",
        });

        const {data} = await axios.delete(`http://localhost:8000/api/event/delete-shop-event/${id}`, {withCredentials: true});

        dispatch({
            type: "deleteeventSuccess",
            payload: data.message,
        })

    } catch (error) {
        dispatch({
            type: "deleteeventFailed",
            payload: error.response.data.message,
        });
    }
};

// get all events (for admin)
export const getAllEvents = () => async(dispatch) => {
    try {
        dispatch({
            type: "getAlleventsRequest",
        });

        const {data} = await axios.get(`http://localhost:8000/api/event/get-all-events`);

        dispatch({
            type: "getAlleventsSuccess",
            payload: data.events,
        });

    } catch (error) {
        dispatch({
            type: "getAlleventsFailed",
            payload: error.response.data.message,
        });
    }
}