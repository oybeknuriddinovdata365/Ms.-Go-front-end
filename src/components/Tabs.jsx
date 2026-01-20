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
        {activeTab === "docs" && <Documents title="Diplom (Bakalavr va mutaxassislik)" fileName="PASSPORTIM2FAF-SD43-DAD.png"/>}
        {activeTab === "docs" && <Documents title="O'z-o'zini band qilish" fileName="PASSPORTIM2FAF-SD44-DAD.png"/>}
        {activeTab === "docs" && <Documents title="Sertifikat" fileName="PASSPORTIM2FAF-SD45-DAD.png"/>}
        {activeTab === "docs" && <Documents title="Shaxsiy tibbiy varaqa" fileName="PASSPORTIM2FAF-SD46-DAD.png"/>}
        {activeTab === "services" && <Services doctor={doctor} />}
        {activeTab === "info" && <DoctorInfo doctor={doctor} />}
      </div>
    </div>
  );
}

export default Tabs;