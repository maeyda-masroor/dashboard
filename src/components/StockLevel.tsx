"use client"
"use client";
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import { client } from '../../sanity/lib/client'; 
interface Product {
    name: string;
    stockLevel: number; 
  }
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const InventoryChart = () => {
    const [inventoryData, setInventoryData] = useState<Product[]>([]);
  useEffect(() => {
    const fetchInventoryData = async () => {
      try {
        const query = `*[_type == "product"]{
          name, 
          stockLevel 
        }`; 
        const data = await client.fetch(query); 
        setInventoryData(data);
      } catch (error) {
        console.error("Error fetching inventory data:", error);
      }
    };

    fetchInventoryData();
  }, []);

  const chartData = {
    labels: inventoryData.map((product) => product.name),
    datasets: inventoryData.map((product) => ({
      label: product.name,
      data: [product.stockLevel], 
      borderColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.8)`,
      borderWidth: 2, 
    })),
  };

  return (
    <div className=''>
      <h2>Inventory Levels</h2>
      {inventoryData.length > 0 && <Line data={chartData} />} 
    </div>
  );
};

export default InventoryChart;