import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Sample data for the chart
const data = [
  { name: 'Jan', users: 400, revenue: 2400 },
  { name: 'Feb', users: 300, revenue: 2210 },
  { name: 'Mar', users: 200, revenue: 2290 },
  { name: 'Apr', users: 278, revenue: 2000 },
  { name: 'May', users: 189, revenue: 2181 },
  { name: 'Jun', users: 239, revenue: 2500 },
];

const Dashboard = () => {
  return (
    <main className="flex-1 p-6 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold">Total Users</h3>
          <p className="text-2xl">1,234</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold">Revenue</h3>
          <p className="text-2xl">$12,345</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold">Active Subscriptions</h3>
          <p className="text-2xl">567</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold">New Signups</h3>
          <p className="text-2xl">89</p>
        </div>
      </div>

      {/* Line Chart */}
      <div className="mt-8 bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-4">Users and Revenue Over Time</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line  type="" dataKey="users" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="revenue" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
};

export default Dashboard;
