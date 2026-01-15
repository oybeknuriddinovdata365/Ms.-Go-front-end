import { useState } from "react";
import Documents from "./Document";
import Services from "./Services";
import DoctorInfo from "./DoctorInfo";

const TABS = [
  { key: "docs", label: "Hujjatlar" },
  { key: "services", label: "Xizmat turlari" },
  { key: "info", label: "Shifokor haqida" },
];

function Tabs({ doctor }) {
  const [activeTab, setActiveTab] = useState("docs");

  return (
    <div className="w-full">
      
      {/* Tabs header */}
      <div className="flex gap-2 bg-gray-50 p-3 rounded-xl w-fit">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-lg text-sm transition cursor-pointer
              ${
                activeTab === tab.key
                  ? "bg-white shadow text-gray-900 font-medium"
                  : "text-gray-500 hover:text-gray-800"
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tabs content */}
      <div className="mt-6">
        {activeTab === "docs" && <Documents doctor={doctor} />}
        {activeTab === "services" && <Services doctor={doctor} />}
        {activeTab === "info" && <DoctorInfo doctor={doctor} />}
      </div>
    </div>
  );
}

export default Tabs;