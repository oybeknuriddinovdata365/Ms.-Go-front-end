import { useState } from "react"

const historyData = [
  {
    id: 1,
    doctorName: "Dr. Azamat Qodirov",
    doctorAvatar: "https://i.pravatar.cc/100?img=12",
    service: "Konsultatsiya",
    date: "25.07.2025 - 15:29:51",
    status: "pending",
  },
  {
    id: 2,
    doctorName: "Dr. Azamat Qodirov",
    doctorAvatar: "https://i.pravatar.cc/100?img=12",
    service: "Konsultatsiya",
    date: "25.07.2025 - 15:29:51",
    status: "rejected",
  },
  {
    id: 3,
    doctorName: "Dr. Azamat Qodirov",
    doctorAvatar: "https://i.pravatar.cc/100?img=12",
    service: "Konsultatsiya",
    date: "25.07.2025 - 15:29:51",
    status: "approved",
  },
  {
    id: 4,
    doctorName: "Dr. Azamat Qodirov",
    doctorAvatar: "https://i.pravatar.cc/100?img=12",
    service: "Konsultatsiya",
    date: "25.07.2025 - 15:29:51",
    status: "approved",
  },
]

const statusText = {
  pending: "Jarayonda",
  approved: "Muvaffaqiyatli",
  rejected: "Bekor qilingan",
}

const statusClass = {
  pending: "text-yellow-900 font-semibold",
  approved: "text-green-600 font-semibold",
  rejected: "text-red-500 font-semibold",
}

function ViewHistory() {

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Murojaatlari</h2>

      <div className="space-y-4">
        {historyData.map(item => (
          <div key={item.id} className="flex items-center justify-between rounded-xl px-6 py-4 border border-[#EAECF0] shadow-sm cursor-pointer transition">
            {/* Left */}
            <div className="flex items-center gap-4">
              <img
                src={item.doctorAvatar}
                alt={item.doctorName}
                className="w-12 h-12 rounded-md object-cover"
              />

              <div>
                <p className="font-semibold text-gray-900">
                  {item.doctorName}
                </p>

                <p className="text-sm text-gray-600">
                  {item.service} • {item.date} •{" "}
                  <span className={statusClass[item.status]}>
                    {statusText[item.status]}
                  </span>
                </p>
              </div>
            </div>

            {/* Right */}
            <button className="px-5 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50">
              Batafsil
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ViewHistory
