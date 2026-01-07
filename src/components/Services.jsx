import { useState } from "react";
import Toggle from "./Toggle";

const initialServices = [
  {
    id: 1,
    title: "Onlayn konsultatsiya",
    price: "30 000",
    active: true,
  },
  {
    id: 2,
    title: "Shifoxonaga borish",
    price: "",
    active: true,
  },
  {
    id: 3,
    title: "Uyga chaqiruv",
    price: "",
    active: false,
  },
];

function Services() {
  const [services, setServices] = useState(initialServices);

  function toggleService(id) {
    setServices((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, active: !s.active } : s
      )
    );
  }

  function changePrice(id, value) {
    setServices((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, price: value } : s
      )
    );
  }

  return (
    <div className="space-y-5">
      {services.map((service) => (
        <div key={service.id} className={`border-[0.92px] border-gray-50 shadow-sm shadow-[#1018280F] rounded-xl p-5 transition
            ${
              service.active
                ? "bg-white border-gray-200"
                : "bg-gray-50 border-gray-200 opacity-60"
            }`}>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">{service.title}</h3>
            <Toggle checked={service.active} onChange={() => toggleService(service.id)}/>
          </div>

          {service.active && (
            <div className="mt-4">
              <label className="text-sm text-gray-600 block mb-1">Xizmat narxi</label>

              <input type="number" placeholder="Xizmat narxini kiriting" value={service.price}
                onChange={(e) =>
                  changePrice(service.id, e.target.value)
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none"/>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Services;
