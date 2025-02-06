import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import { client } from '../../sanity/lib/client'; // Import your Sanity client

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);
interface Product {
    name: string;
    stockLevel: number; 
  }
const ProductRatingChart = () => {
  const [reviews, setReviews] = useState([]);
  const [ratingCounts, setRatingCounts] = useState([0, 0, 0, 0, 0]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const query = `*[_type == "review"]{ 
          product -> {  
          name 
          },
          rating
        }`;
        const data = await client.fetch(query);
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  useEffect(() => {
    const calculateCounts = () => {
      const newCounts = [0, 0, 0, 0, 0]; 
      reviews.forEach((review:any) => {
        newCounts[review.rating - 1]++; 
      });
      setRatingCounts(newCounts);
    };

    calculateCounts();
  }, [reviews]);

  const chartData = {
    labels: ['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'],
    datasets: [
      {
        label: 'Product Ratings',
        data: ratingCounts,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h2>Product Ratings</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default ProductRatingChart;