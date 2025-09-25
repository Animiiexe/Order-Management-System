'use client';
import API from '../utils/api';
import { useDispatch } from 'react-redux';
import { updateOrder, removeOrder } from '../store/slices/ordersSlice';

export default function AdminOrders({ orders }) {
  const dispatch = useDispatch();

  const handleUpdateQty = async (id, qty) => {
    const token = localStorage.getItem('adminToken');
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const res = await API.patch(`/orders/${id}/quantity`, { quantity: qty });
    dispatch(updateOrder(res.data));
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('adminToken');
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    await API.delete(`/orders/${id}`);
    dispatch(removeOrder(id));
  };

  return (
    <table className="w-full">
      <thead>{/* headings */}</thead>
      <tbody>
        {orders.map(o => (
          <tr key={o._id}>
            <td>{o.customerName}</td>
            <td>{o.productName}</td>
            <td>
              <input type="number" defaultValue={o.quantity} min={1} max={100}
                onBlur={(e)=>handleUpdateQty(o._id, Number(e.target.value))} />
            </td>
            <td>
              <button onClick={()=>handleDelete(o._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
