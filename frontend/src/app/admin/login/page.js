'use client';
import { useState } from 'react';
import API from '../../../utils/api';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [err, setErr] = useState('');
  const router = useRouter();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/admin/login', form);
      const data = res.data;
      localStorage.setItem('adminToken', data.token);
      router.push('/admin');
    } catch (e) {
      setErr(e.response?.data?.message || e.message);
    }
  };

  return (
    <form onSubmit={submit} className="...">
      {/* inputs */}
    </form>
  );
}
