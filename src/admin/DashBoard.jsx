import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

import loadingGif from "../assets/images/shopping-loader.gif";
import noOrdersImg from "../assets/images/no-orders.jpeg";

export default function DashBoard() {
  const [orders, setOrders] = useState([]); // State for storing orders
  const [loading, setLoading] = useState(true); // State for tracking loading

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordersSnapshot = await getDocs(collection(db, "orders"));
        const fetchedOrders = ordersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setOrders(fetchedOrders);
      } catch (error) {
        console.error("Error fetching orders: ", error);
      } finally {
        setLoading(false); // Set loading to false when data is fetched
      }
    };

    fetchData();
  }, []);

  return (
    <section>
      <div>
        <h1 className="mt-8 text-slate-900 text-2xl font-bold flex items-center justify-center flex-wrap">
          Order List
        </h1>
        {loading ? (
          <div className="flex items-start justify-center">
            <img src={loadingGif} alt="loading-gif" />
          </div>
        ) : orders.length > 0 ? (
          <table className="table-auto border-collapse w-full text-left my-8">
            <thead>
              <tr>
                <th className="border px-4 py-2">Order ID</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Message</th>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Phone Number</th>
                <th className="border px-4 py-2">Product ID</th>
                <th className="border px-4 py-2">Product Name</th>
                <th className="border px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="border px-4 py-2">{order.id}</td>
                  <td className="border px-4 py-2">{order.email}</td>
                  <td className="border px-4 py-2">{order.message}</td>
                  <td className="border px-4 py-2">{order.name}</td>
                  <td className="border px-4 py-2">{order.phoneNumber}</td>
                  <td className="border px-4 py-2">{order.productId}</td>
                  <td className="border px-4 py-2">{order.productName}</td>
                  <td className="border px-4 py-2">{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="flex flex-col my-[50px] items-center justify-center">
            <p className="mb-[10px] font-bold">No orders available.</p>
            <img src={noOrdersImg} alt="no-orders" />
          </div>
        )}
      </div>
    </section>
  );
}
