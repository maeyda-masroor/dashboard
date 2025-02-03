"use client";
import { useEffect, useState } from "react";
import { client } from "../../../../sanity/lib/client";
import Image from "next/image";
import { urlFor } from "../../../../sanity/lib/image";

export default function Dashboard() {
  const [products1, setProduct] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const query = `*[_type == "order"]{_id, name, email, address, image}`;
      const data = await client.fetch(query);
      setProduct(data);
    };

    fetchProducts();
  }, []);

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
              <td className="border p-2">{product.name}</td>
              <td className="border p-2">{product.email}</td>
              <td className="border p-2">{product.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
