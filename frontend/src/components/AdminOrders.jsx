"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders, deleteOrder, updateOrder } from "../redux/slices/ordersSlice";

export default function AdminOrders() {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((state) => state.orders);
  const [filter, setFilter] = useState("");
  const [editOrder, setEditOrder] = useState(null);
  const [newQty, setNewQty] = useState("");

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteOrder(id));
  };

  const handleUpdate = (id) => {
    dispatch(updateOrder({ id, quantity: newQty }));
    setEditOrder(null);
    setNewQty("");
  };

  const filteredOrders = list.filter((o) =>
    o.productName.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Orders</h2>

      {/* Filter */}
      <input
        type="text"
        placeholder="Filter by product"
        className="border p-2 mb-4 w-full"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Customer</th>
              <th className="p-2">Product</th>
              <th className="p-2">Quantity</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order._id} className="border-t">
                <td className="p-2">{order.customerName}</td>
                <td className="p-2">{order.productName}</td>
                <td className="p-2">
                  {editOrder === order._id ? (
                    <input
                      type="number"
                      value={newQty}
                      onChange={(e) => setNewQty(e.target.value)}
                      className="border p-1 w-16"
                    />
                  ) : (
                    order.quantity
                  )}
                </td>
                <td className="p-2 space-x-2">
                  {editOrder === order._id ? (
                    <button
                      className="bg-green-500 text-white px-2 py-1 rounded"
                      onClick={() => handleUpdate(order._id)}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                      onClick={() => setEditOrder(order._id)}
                    >
                      Edit
                    </button>
                  )}
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleDelete(order._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
