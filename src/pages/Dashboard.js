import React, { useState } from 'react';
import './Dashboard.css';
import PoolsMenu from '../components/PoolsMenu';
import LiveChat from '../components/LiveChat';
import BeReal from '../components/BeReal';

const Dashboard = () => {
  const [selectedPool, setSelectedPool] = useState(null);

  return (
    <div className="dashboard">
      <PoolsMenu selectPool={setSelectedPool} />
      <div className="main-content">
        <BeReal selectedPool={selectedPool} />
        <LiveChat selectedPool={selectedPool} />
      </div>
    </div>
  );
};

export default Dashboard;
