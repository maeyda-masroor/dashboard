"use client"
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import  Order  from "../../sanity/schemaTypes/Order";

export default function EditOrderModal({ order, onClose, onUpdate }: { order: any; onClose: () => void; onUpdate: (updatedOrder: any) => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: order,
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/order/edit/${order._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to update order");

      onUpdate(data);
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">Edit Order</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div>
            <label className="block text-sm font-medium">Customer Name</label>
            <input {...register("customerName")} className="border p-2 w-full" />
            {errors.customerName && <p className="text-red-500 text-sm">{errors.customerName.message as string}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium">Customer Address</label>
            <input {...register("customerAddress")} className="border p-2 w-full" />
            {errors.customerAddress && <p className="text-red-500 text-sm">{errors.customerAddress.message as string}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium">Customer Name</label>
            <input {...register("customerEmail")} className="border p-2 w-full" />
            {errors.customerEmail && <p className="text-red-500 text-sm">{errors.customerEmail.message as string}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium">Product</label>
            <input {...register("product")} className="border p-2 w-full" />
            {errors.product && <p className="text-red-500 text-sm">{errors.product.message as string}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">Quantity</label>
            <input type="number" {...register("quantity", { valueAsNumber: true })} className="border p-2 w-full" />
            {errors.quantity && <p className="text-red-500 text-sm">{errors.quantity.message as string}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">Status</label>
            <select {...register("status")} className="border p-2 w-full">
              <option value="Pending">Pending</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
            </select>
            {errors.status && <p className="text-red-500 text-sm">{errors.status.message as string}</p>}
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-400 text-white rounded">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-500 text-white rounded">
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
