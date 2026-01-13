import { useState, useMemo } from "react"
import PatientStatusBadge from "./PatientStatusBadge"

const statusOrder = {
  jarayonda: 1,
  yakunlangan: 2,
  "bekor qilingan": 3
}

export default function PatientsList({ patients = [], selectedPatient, onSelect }) {
  const [sortKey, setSortKey] = useState("name")
  const [asc, setAsc] = useState(true)

  const sorted = useMemo(() => {
    return [...patients].sort((a, b) => {
      let x = a[sortKey]
      let y = b[sortKey]

      if (sortKey === "status") {
        x = statusOrder[a.status] || 99
        y = statusOrder[b.status] || 99
      }

      if (typeof x === "string") x = x.toLowerCase()
      if (typeof y === "string") y = y.toLowerCase()

      if (x > y) return asc ? 1 : -1
      if (x < y) return asc ? -1 : 1
      return 0
    })
  }, [patients, sortKey, asc])

  const handleSort = key => {
    if (key === sortKey) setAsc(!asc)
    else {
      setSortKey(key)
      setAsc(true)
    }
  }

  return (
    <div className="bg-white rounded-xl border border-[#EAECF0] shadow-sm overflow-hidden col-span-6">

      <div className="px-6 py-5 shadow-xs space-x-2 text-[18px] flex items-center">
        <h2 className="font-semibold text-lg">Mijozlar ro'yxati</h2>
        <span className="text-blue-600 text-xs font-bold">{patients.length} users</span>
      </div>

      <div className="grid grid-cols-12 px-5 py-3 text-xs text-gray-600">
        <div className="col-span-5">Ism familiya</div>
        <div onClick={() => handleSort("gender")} className="col-span-2 cursor-pointer">Jinsi</div>
        <div onClick={() => handleSort("age")} className="col-span-2 cursor-pointer">Yoshi</div>
        <div onClick={() => handleSort("status")} className="col-span-3 cursor-pointer text-right">Status</div>
      </div>

      <div>
        {sorted.map(p => (
          <div
            key={p.id}
            onClick={() => onSelect(p)}
            className={`grid grid-cols-12 px-5 py-4 text-sm cursor-pointer transition
            ${selectedPatient?.id === p.id ? "bg-blue-50" : "hover:bg-gray-50"}`}
          >
            <div className="col-span-5">
              <p className="font-medium">{p.name}</p>
              <p className="text-xs text-gray-400">@{p.username}</p>
            </div>

            <div className="col-span-2 flex items-center text-gray-600">
              {p.gender}
            </div>

            <div className="col-span-2 flex items-center text-gray-600">
              {p.age}
            </div>

            <div className="col-span-3 flex items-center justify-end">
              <PatientStatusBadge status={p.status} />
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}
