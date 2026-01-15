import { useState } from "react"
import ProfileSettings from "./ProfileSettings"
import ChangePassword from "./ChangePassword"

export default function ProfileTabs() {
  const [activeTab, setActiveTab] = useState("profile")

  const TABS = [
  { key: "profile", label: "Profil sozlamalari" },
  { key: "password", label: "Parolni o'zgartirish" },
]


  return (
    <div className="w-full">

      {/* Tabs header */}
      <div className="flex gap-2 bg-gray-50 p-2 rounded-xl w-fit">
        {TABS.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-lg text-sm cursor-pointer transition
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
        {activeTab === "profile" && <ProfileSettings />}
        {activeTab === "password" && <ChangePassword />}
      </div>
    </div>
  )
}
