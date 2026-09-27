import React, { useEffect, useState } from "react";
import API_URL from "../api";

function Orders() {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const user = JSON.parse(localStorage.getItem("dinebite_user"));

    useEffect(() => {

        if (!user?.id) {
            setLoading(false);
            return;
        }

        fetch(`${API_URL}/api/orders/user/${user.id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to load orders");
                }
                return response.json();
            })
            .then(data => {
                setOrders(data);
            })
            .catch(error => {
                console.error("Orders error:", error);
            })
            .finally(() => {
                setLoading(false);
            });

    }, [user?.id]);

    if (loading) {
        return <div>Loading orders...</div>;
    }

    if (!user) {
        return <div>Please login to view your orders.</div>;
    }

    return (
        <div className="container mt-5">

            <h2>My Orders</h2>

            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (

                orders.map(order => (

                    <div
                        key={order.id}
                        className="card mb-3 p-3"
                    >

                        <h5>
                            Order #{order.id}
                        </h5>

                        <p>
                            Amount: ₹{order.totalAmount}
                        </p>

                        <p>
                            Status: {order.status}
                        </p>

                        <p>
                            Date: {order.orderDate}
                        </p>

                        <p>
                            Delivery Address: {order.address}, {order.city} - {order.pincode}
                        </p>

                    </div>

                ))

            )}

        </div>
    );
}

export default Orders;