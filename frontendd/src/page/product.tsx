const products = [
  {
    id: 1,
    name: "Wireless Mouse",
    price: 150000.0,
    stock: 25,
    description: "Mouse tanpa kabel dengan konektivitas USB",
    image: "https://via.placeholder.com/60?text=Mouse",
  },
  {
    id: 2,
    name: "Keyboard Mechanical",
    price: 300000.0,
    stock: 15,
    description: "Keyboard dengan switch biru untuk sensasi klik",
    image: "https://via.placeholder.com/60?text=Keyboard",
  },
  {
    id: 3,
    name: "Webcam Full HD",
    price: 250000.0,
    stock: 10,
    description: "Kamera 1080p cocok untuk video conference",
    image: "https://via.placeholder.com/60?text=Webcam",
  },
];

export default function Product() {
  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full border border-gray-300 divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">
              ID
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">
              Name
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">
              Price (IDR)
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">
              Stock
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">
              Description
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">
              Image
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">
              
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products.map(({ id, name, price, stock, description, image }) => (
            <tr key={id} className="hover:bg-gray-50">
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                {id}
              </td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                {name}
              </td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                {price.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })}
              </td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                {stock}
              </td>
              <td className="px-4 py-2 text-sm text-gray-700 max-w-xs">
                {description}
              </td>
              <td className="px-4 py-2 whitespace-nowrap">
                <img
                  src={image}
                  alt={name}
                  className="w-16 h-16 object-cover rounded"
                />
              </td>
              <td>
                <div className="px-4 py-2 whitespace-nowrap flex flex-row">
                  <button>edit</button>
                  <button>delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
