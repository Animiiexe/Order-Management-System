'use client';
import API from '../utils/api';
import { useDispatch } from 'react-redux';
import { updateOrder, removeOrder } from '@/redux/slices/ordersSlice';
import { useState } from 'react';

export default function AdminOrders({ orders }) {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({}); // keep per-row error messages

  const handleUpdateQty = async (id, qty) => {
    if (!Number.isInteger(qty) || qty < 1 || qty > 100) {
      setErrors(prev => ({ ...prev, [id]: "Quantity must be 1–100" }));
      return;
    }

    try {
      const token = localStorage.getItem('adminToken');
      API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const res = await API.patch(`/orders/${id}/quantity`, { quantity: qty });
      dispatch(updateOrder(res.data));
      setErrors(prev => ({ ...prev, [id]: null })); // clear error if successful
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('adminToken');
      API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      await API.delete(`/orders/${id}`);
      dispatch(removeOrder(id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <table className="w-full border">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2">Customer</th>
          <th className="p-2">Product</th>
          <th className="p-2">Quantity</th>
          <th className="p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {orders.map(o => (
          <tr key={o._id} className="border-t">
            <td className="p-2">{o.customerName}</td>
            <td className="p-2">{o.productName}</td>
            <td className="p-2">
              <input
                type="number"
                defaultValue={o.quantity}
                min={1}
                max={100}
                className="border p-1 rounded w-20"
                onBlur={(e) => handleUpdateQty(o._id, Number(e.target.value))}
              />
              {errors[o._id] && (
                <p className="text-red-500 text-sm">{errors[o._id]}</p>
              )}
            </td>
            <td className="p-2">
              <button
                onClick={() => handleDelete(o._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
