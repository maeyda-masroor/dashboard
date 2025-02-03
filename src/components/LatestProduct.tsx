"use client"
import { client } from "../../sanity/lib/client";
import { useState ,useEffect } from "react";
import Link from "next/link";
export default function Products() {
    const [products1, setProduct] = useState<any[]>([]);
  
    useEffect(() => {
      async function fetchData() {
        const query = `
        *[_type == "category1"] {
          _id,
          id,
          name,
          image
        }
        `;        
        const data = await client.fetch(query);
        setProduct(data);
      }
  
      fetchData();
    }, []);
    return <div>
     {products1.length === 0 ? (
        <p>No categories available</p> // Fallback if no categories found
      ) : (
        products1.map((c) => (
          <div key={c._id} className="flex justify-center" data-testid="product-category">
              <div className="h-auto text-center">
                <h3 className="hover:text-pink text-gray-800">{c.name}</h3>
                <Link href={`category/${c._id}`}>
                  <p className="underline decoration-2 decoration-blue">
                    Read More
                  </p>
                </Link>
              </div>
            </div>

        ))
      )}
      </div>
}
