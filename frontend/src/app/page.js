'use client';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders, addOrder } from "@/redux/slices/ordersSlice"
import API from '@/utils/api';
import io from "socket.io-client"
import AdminOrders from '@/components/AdminOrders';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const orders = useSelector(s => s.orders.list);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');  // 🚨 redirect if not logged in
      return;
    }

    API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    dispatch(fetchOrders());

    const socket = io(process.env.NEXT_PUBLIC_API_URL?.replace('/api','') || 'http://localhost:5000');
    socket.on('newOrder', data => dispatch(addOrder(data)));

    return () => socket.disconnect();
  }, [dispatch, router]);

  return (
    <div className="p-4">
      <h2 className="text-xl mb-2">Orders</h2>
      <AdminOrders orders={orders} />
    </div>
  );
}
