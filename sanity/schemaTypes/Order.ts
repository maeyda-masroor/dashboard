export default {
    name: "order",
    type: "document",
    title: "Order",
    fields: [
      { name: "customerName", type: "string", title: "Customer Name" },
      { name: "customerEmail", type: "string", title: "Customer Email" },
      { name: "customerAddress", type: "string", title: "Customer Address" },
      { name: "total", type: "number", title: "Total Amount" },
      {
        name: 'products',
        title: 'Products',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              {
                name: 'productTitle',
                title: 'Product Title',
                type: 'string',
              },
              {
                name: 'price',
                title: 'Price',
                type: 'number',
              },
              {
                name: 'quantity',
                title: 'Quantity',
                type: 'number',
              },
            ],
          },
        ],
      },
    ],
  };
  
    