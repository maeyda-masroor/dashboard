"use client"
import Link from "next/link"
import { useState ,useEffect } from "react";
import { client } from "../../../sanity/lib/client";
export default function Dashboard(){
    const [totalOrders, setTotalOrders] = useState(0);
    const [totalReviews, setTotalReviews] = useState(0);
    const [totalcategory,setCategory] = useState(0);
    const [totalProduct,setproduct] = useState(0);
    useEffect(() => {
        const fetchData = async () => {
          const orderQuery = `*[_type == "order"]{_id, customerName, customerEmail, customerAddress}`;
          const orderData = await client.fetch(orderQuery);
          setTotalOrders(orderData.length);
    
          const reviewQuery = `*[_type == "review"]{...}`; // Define the fields you need from reviews
          const reviewData = await client.fetch(reviewQuery);
          setTotalReviews(reviewData.length);
          const categoryQuery = `*[_type == "category1"]{...}`; // Define the fields you need from reviews
          const categoryData = await client.fetch(categoryQuery);
          setCategory(categoryData.length);
          const productQuery = `*[_type == "product"]{...}`; // Define the fields you need from reviews
          const productData = await client.fetch(productQuery);
          setproduct(productData.length);
         
        };
    
        fetchData();
      }, []);
    return <div>
     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
      <Link href="/card1" className="bg-blue-500 text-white p-4 rounded-lg">
      <p>Total Orders: {totalOrders}</p> 
      </Link>
      <Link href="/card2" className="bg-green-500 text-white p-4 rounded-lg">
      <p>Total Reviews: {totalReviews}</p> 
      </Link>
      <Link href="/card3" className="bg-yellow-500 text-white p-4 rounded-lg">
      <p>Total Category:{totalcategory}</p>
      </Link>
      <Link href="/card4" className="bg-purple-500 text-white p-4 rounded-lg">
        <p>Total Product:{totalProduct}</p>
      </Link>
      <Link href="/card5" className="bg-pink-500 text-white p-4 rounded-lg">
        Card 5
      </Link>
      <Link href="/card6" className="bg-indigo-500 text-white p-4 rounded-lg">
        Card 6
      </Link>
    </div>
    </div>
}
