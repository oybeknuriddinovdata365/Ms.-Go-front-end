import { useState } from "react"
import PaymentsHistory from "./PaymentHistory"
import VisitsHistory from "./VisitsHistory"
import Reviews from "./Reviews"

export default function PatientTabs() {
  const [activeTab, setActiveTab] = useState("payments")

  const TABS = [
    { key: "payments", label: "To'lovlar tarixi" },
    { key: "visits", label: "Murojaatlar tarixi" },
    { key: "reviews", label: "Sharhlar" },
  ]

  return (
    <div className="w-full">

      {/* Tabs header */}
      <div className="flex gap-2 bg-gray-50 p-2 rounded-xl w-fit">
        {TABS.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-lg text-sm transition cursor-pointer
              ${
                activeTab === tab.key
                  ? "bg-white shadow text-[#0F5EE8] font-medium"
                  : "text-gray-500 font-semibold hover:text-gray-800"
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tabs content */}
      <div className="mt-6">
        {activeTab === "payments" && <PaymentsHistory />}
        {activeTab === "visits" && <VisitsHistory />}
        {activeTab === "reviews" && <Reviews />}
      </div>

    </div>
  )
}
