import React, { useEffect, useState } from 'react';
import axios from 'axios';

const IPAddress = () => {
  const [ipAddress, setIPAddress] = useState('');

  useEffect(() => {
    // Fetch the IP address using ipify API
    axios
      .get('https://api64.ipify.org?format=json')
      .then((response) => {
        setIPAddress(response.data.ip);
      })
      .catch((error) => {
        console.error('Error fetching IP address:', error);
      });
  }, []);

  return (
    <div>
      <h1>Current IP Address: {ipAddress}</h1>
    </div>
  );
};

export default IPAddress;
