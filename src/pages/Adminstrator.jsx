import React, { useEffect, useState } from "react"
import { PencilIcon, TrashIcon, X } from "lucide-react"
import SearchIcon from "../assets/Images/search-icon.svg"

const adminsData = [
  { id: 1, name: "Olivia Rhye", phone: "+998 94 426 0303", date: "Dec 07, 2025", status: "active" },
  { id: 2, name: "Phoenix Baker", phone: "+998 91 412 1212", date: "Dec 09, 2024", status: "blocked" },
  { id: 3, name: "Phoenix Baker", phone: "+998 99 907 4331", date: "Dec 09, 2024", status: "active" },
  { id: 4, name: "Demi Wilkinson", phone: "+998 98 180 0122", date: "Dec 01, 2025", status: "active" },
  { id: 5, name: "Toshpo'lat", phone: "+998 98 180 0122", date: "Jan 11, 2026", status: "blocked" },
]

const getAdmins = () => {
  const saved = localStorage.getItem("admins")
  return saved ? JSON.parse(saved) : adminsData
}


function StatusBadge({ status }) {
  const styles = {
    active: "bg-green-100 text-green-500",
    blocked: "bg-red-100 text-red-600",
  }

  const labels = {
    active: "Aktiv",
    blocked: "Bloklangan",
  }

  return (
  <span className={`inline-flex items-center gap-2 px-3 py-1 text-xs rounded-full font-medium ${styles[status]}`}>
    
    <span className={`w-2 h-2 rounded-full ${
      status === "active" ? "bg-green-500" : "bg-red-500"
      }`}/>
      {labels[status]}
    </span>
)
}

export default function Adminstrator() {
  const [admins, setAdmins] = useState(getAdmins)
  const [search, setSearch] = useState("")
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState(null)

  const [form, setForm] = useState({
    name: "",
    phone: "",
    status: "active",
    login: "",
    password: "",
  })

  const filtered = admins.filter(a =>
    a.name.toLowerCase().includes(search.toLowerCase())
  )

  const addAdmin = () => {
  if (!form.name || !form.phone || !form.login) return

  if (editing) {
    setAdmins(prev =>
      prev.map(a =>
        a.id === editing.id
          ? { ...a, name: form.name, phone: form.phone, status: form.status }
          : a
      )
    )

    setEditing(null)
  } else {
    const newAdmin = {
      id: Date.now(),
      name: form.name,
      phone: form.phone,
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
      status: form.status,
    }

    setAdmins(prev => [newAdmin, ...prev])
  }

  setOpen(false)
  setForm({ name: "", phone: "", status: "active", login: "", password: "" })
}


  const startEdit = (admin) => {
  setEditing(admin)

  setForm({
    name: admin.name,
    phone: admin.phone,
    status: admin.status,
    login: admin.login || "",
    password: ""
  })

  setOpen(true)
}


  const deleteAdmin = (id) => {
    setAdmins(prev => prev.filter(a => a.id !== id))
  }

  const closeModal = () => {
  setOpen(false)
  setEditing(null)
  setForm({
    name: "",
    phone: "",
    status: "active",
    login: "",
    password: ""
  })
}


  useEffect(() => {
  localStorage.setItem("admins", JSON.stringify(admins))
}, [admins])


  return (
    <div className="w-full space-y-11">

      {/* HEader */}
      <div className="flex items-center justify-between">
        <h2 className="text-[24px] font-semibold text-[#121212]">
          Adminstrator
        </h2>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 w-[320px] border border-[#D0D5DD] shadow-xs rounded-xl px-4 py-2 bg-white">
            <input
              type="text"
              placeholder="Qidirish"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full outline-none text-gray-700 text-sm"
            />
            <img src={SearchIcon} alt="search" className="w-4 h-4" />
          </div>

          <button onClick={() => {
            setEditing(null)
            setForm({
              name: "",
              phone: "",
              status: "active",
              login: "",
              password: ""
            })
            setOpen(true)
          }} 
          className="px-4 h-10 bg-[#1067FF] text-white rounded-lg hover:opacity-80 cursor-pointer">
            Qo'shish
          </button>
        </div>
      </div>

      {/* CARD */}
      <div className="bg-white rounded-xl border border-[#EAECF0] shadow-sm">
        {/* CARD HEADER */}
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <h3 className="text-lg leading-7 font-semibold text-[#121212]">Administrator</h3>
            <span className="text-xs font-medium text-[#0F5EE8]">{admins.length} users</span>
          </div>
        </div>

        {/* TABLE HEADER */}
        <div className="grid grid-cols-12 px-6 py-3 text-xs border-y border-[#EAECF0] text-gray-500 bg-gray-50">
          <div className="col-span-5">Ism familiya</div>
          <div className="col-span-2">Telefon raqami</div>
          <div className="col-span-2">Qo'shilgan sana</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-1"></div>
        </div>

        {/* ROWS */}
        {filtered.map(admin => (
          <div
            key={admin.id}
            className="grid grid-cols-12 px-6 py-4 border-b border-[#EAECF0] last:border-none items-center hover:bg-gray-50"
          >
            <div className="col-span-5 font-medium text-gray-900">
              {admin.name}
            </div>

            <div className="col-span-2 text-gray-600">
              {admin.phone}
            </div>

            <div className="col-span-2 text-gray-600">
              {admin.date}
            </div>

            <div className="col-span-2">
              <StatusBadge status={admin.status} />
            </div>

            <div className="col-span-1 flex items-center gap-3 text-gray-500">
              <div>
                <TrashIcon onClick={() => deleteAdmin(admin.id)} className="w-4 h-4 cursor-pointer text-red-500"/>
              </div>
              <div>
                <PencilIcon onClick={() => startEdit(admin)} className="w-4 h-4 cursor-pointer text-blue-600"/>
              </div>

            </div>
          </div>
        ))}

      </div>
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-[700px] p-6 relative">
            <button onClick={closeModal} className="absolute right-7 top-7">
              <X className="w-6 h-6"/>
            </button>

            <h3  className="text-lg font-bold text-[#2C3E50] mb-4">{editing ? "Tahrirlash" : "Administrator qo'shish"}</h3>

            <div className="border border-[#EAECF0] m-7 w-full mx-auto"/>

            <div className="flex flex-col gap-4">
              <label className="flex flex-col gap-2">
                <span className="font-medium text-sm leading-5 text-[#344054]">FISH</span>
                <input placeholder="Ismini kiriting" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full shadow-xs border border-[#D0D5DD] rounded-lg px-4 py-3"/> 
              </label>

              <div className="flex items-center justify-between w-full">
                <label className="w-[49%] flex flex-col gap-2">
                  <span className="font-medium text-sm leading-5 text-[#344054]">Telefon raqami</span>
                  <input placeholder="Telefon" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="w-full border shadow-xs rounded-lg px-4 py-3 border-[#D0D5DD]"/>
                </label>

                <label className="w-[49%] flex flex-col gap-2">
                  <span className="font-medium text-sm leading-5 text-[#344054]">Holati</span>
                  <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} className="w-full border rounded-lg text-[#667085] px-4 py-3 shadow-xs bg-[#F9FAFB] border-[#D0D5DD]">
                    <option value="active">Aktiv</option>
                    <option value="blocked">Bloklangan</option>
                  </select>
                </label>
              </div>

              <div className="flex items-start justify-between w-full">
                <label className="w-[49%] flex flex-col gap-2">
                  <span className="font-medium text-sm leading-5 text-[#344054]">Login*</span>
                  <input placeholder="Kiriting" value={form.login} onChange={e => setForm({ ...form, login: e.target.value })} className="w-full border border-[#D0D5DD] shadow-xs rounded-lg px-4 py-3"/>
                </label>
                <label className="w-[49%] flex flex-col gap-2">
                  <span className="font-medium text-sm leading-5 text-[#344054]">Password*</span>
                  <input placeholder="Kiriting" type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} className="w-full shadow-xs border border-[#D0D5DD] rounded-lg px-4 py-3"/>
                  <span className="text-sm leading-5 text-[#475467]">Must be at least 8 characters.</span>
                </label>
              </div>

              <div className="text-end">
                <button onClick={addAdmin} className="w-[100px] h-10 bg-[#1067FF] shadow-xs text-white rounded-lg mt-4 cursor-pointer">
                  {editing ? "Saqlash" : "Qo'shish"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    
  )
}