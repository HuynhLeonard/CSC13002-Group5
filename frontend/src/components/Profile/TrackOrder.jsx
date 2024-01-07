import React, {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {getAllOrdersOfUser} from "../../redux/actions/order"

const TrackOrder = () => {
	const {orders} = useSelector((state) => state.order);
	const {user} = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const {id} = useParams();

	// get all order of user through redux
	useEffect(() => {
		dispatch(getAllOrdersOfUser(user._id));
	}, [dispatch]);

	// get info of order and status
	const data = orders && orders.find((item) => item._id = id);
  return (
    <div className="w-full h-[80vh] flex justify-center items-center">
			{" "}
			<>
				{data && data?.status === "Processing" ? (
					<h1 className="text-[20px]">Shop has received your order</h1>
				) : data?.status === "Transferred to delivery partners" ? (
					<h1 className="text-[20px]">Delivery partners has received your order</h1>
				): data?.status === "Shipping" ? (
          <h1 className="text-[20px]">Your Order is on the way.</h1>
        ) : data?.status === "Received" ? (
          <h1 className="text-[20px]">Your Order will be delivered to you soon.</h1>
        ) : data?.status === "On the way" ? (
          <h1 className="text-[20px]">Our Delivery man is going to deliver your order.</h1>
        ) : data?.status === "Delivered" ? (
          <h1 className="text-[20px]">Your order is delivered!</h1>
        ) : data?.status === "Processing refund" ? (
          <h1 className="text-[20px]">Your refund is processing!</h1>
        ) : data?.status === "Refund Success" ? (
          <h1 className="text-[20px]">Your Refund is success!</h1>
        ) : null}
			</>
		</div>
  )
}

export default TrackOrder