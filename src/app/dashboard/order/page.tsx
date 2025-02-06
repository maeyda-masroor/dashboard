"use client";
import { useEffect, useState } from "react";
import { client } from "../../../../sanity/lib/client";
import Image from "next/image";
import { urlFor } from "../../../../sanity/lib/image";
import EditOrderModal from "../../../components/EditOrder";

export default function Dashboard() {
  const [products1, setProduct] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const query = `*[_type == "order"]{ _id, customerName, customerEmail, customerAddress}`;
      const data = await client.fetch(query);
      setProduct(data);
    };

    fetchProducts();
  }, []);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const handleUpdateOrder = (updatedOrder: any) => {
    setProduct((prevProducts) =>
      prevProducts.map((order) =>
        order._id === updatedOrder._id ? { ...order, ...updatedOrder } : order
      )
    );
  };
  
  const handleDeleteOrder = async (orderId: string) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
  
    try {
      await client.delete(orderId); // Delete from Sanity
  
      // Update local state to remove deleted order
      setProduct((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
  
      alert("Order deleted successfully!");
    } catch (error) {
      console.error("Error deleting order:", error);
      alert("Failed to delete order.");
    }
  };
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Image</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Description</th>
          </tr>
        </thead>
        <tbody>
          {products1.map((product) => (
            <tr key={product._id} className="text-center">
              <td className="border p-2">
              {product.image ? (
                        <Image
                          src={urlFor(product.image).url()} // Use category.image
                          alt={product.name || "Category Image"}
                          width={200}
                          height={200}
                        />
                      ) : (
                        <p>No image available</p>
                      )}
              </td>
              <td className="border p-2">{product.customerName}</td>
              <td className="border p-2">{product.customerEmail}</td>
              <td className="border p-2">{product.customerAddress}</td>
              <td className="border p-2">
                <button
                  className="px-3 py-1 bg-blue-500 text-white rounded"
                  onClick={() => setSelectedOrder(product)}
                >
                  Edit
                </button>
              </td>
              <td className="border p-2">
              <button
                className="px-3 py-1 bg-red-500 text-white rounded"
                onClick={() => handleDeleteOrder(product._id)}
              >
                Delete
              </button>
            </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedOrder && (
        <EditOrderModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onUpdate={handleUpdateOrder}
        />
      )}
    </div>
  );
}
