import React, { useEffect, useState } from "react"
import { PencilIcon, TrashIcon, X } from "lucide-react"
import SearchIcon from "../assets/Images/search-icon.svg"
import { getAdmins, createAdmin, updateAdmin, deleteAdmin } from "../services/admin";


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
  const [admins, setAdmins] = useState([])
  const [search, setSearch] = useState("")
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    email: "",
    password: ""
  });

  const [form, setForm] = useState({
    name: "",
    phone: "",
    status: "active",
    email: "",
    password: "",
  })

  // Email validatsiya funksiyasi
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Form validatsiya
  const validateForm = () => {
    const newErrors = {
      name: "",
      phone: "",
      email: "",
      password: ""
    };

    let isValid = true;

    // Ism tekshirish (har doim majburiy)
    if (!form.name.trim()) {
      newErrors.name = "Ism majburiy";
      isValid = false;
    }

    // Telefon tekshirish (har doim majburiy)
    if (!form.phone.trim()) {
      newErrors.phone = "Telefon raqami majburiy";
      isValid = false;
    }

    if (!editing) {
      // CREATE uchun - email va password MAJBURIY
      if (!form.email.trim()) {
        newErrors.email = "Email majburiy";
        isValid = false;
      } else if (!isValidEmail(form.email)) {
        newErrors.email = "Email formati noto'g'ri";
        isValid = false;
      }

      if (!form.password.trim()) {
        newErrors.password = "Password majburiy";
        isValid = false;
      } else if (form.password.length < 8) {
        newErrors.password = "Password kamida 8 ta belgidan iborat bo'lishi kerak";
        isValid = false;
      }
    } else {
      // UPDATE uchun - email va password OPTIONAL, lekin to'ldirilsa validatsiya qilinadi
      if (form.email.trim() && !isValidEmail(form.email)) {
        newErrors.email = "Email formati noto'g'ri";
        isValid = false;
      }

      if (form.password.trim() && form.password.length < 8) {
        newErrors.password = "Password kamida 8 ta belgidan iborat bo'lishi kerak";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const addAdmin = async () => {
    // Validatsiya
    if (!validateForm()) {
      return;
    }

    try {
      if (editing) {
        // UPDATE - barcha maydonlar yuboriladi, lekin backend bo'sh bo'lganlarni ignore qiladi
        const payload = {
          fullname: form.name,
          phone: form.phone,
          is_active: form.status === "active",
        };

        // Email to'ldirilgan bo'lsa qo'shamiz
        if (form.email.trim()) {
          payload.email = form.email;
        }

        // Password to'ldirilgan bo'lsa qo'shamiz
        if (form.password.trim()) {
          payload.password = form.password;
        }

        await updateAdmin(editing.id, payload);
      } else {
        // CREATE - barcha maydonlar majburiy
        await createAdmin({
          fullname: form.name,
          phone: form.phone,
          email: form.email,
          password: form.password,
          role: "admin",
          is_active: form.status === "active",
        });
      }

      await fetchAdmins();
      closeModal();
    } catch (err) {
      console.log("Error found:", err?.response?.data);
      
      // Backend dan kelgan xatoliklarni ko'rsatish
      if (err?.response?.data?.message) {
        const message = Array.isArray(err.response.data.message) 
          ? err.response.data.message.join(", ") 
          : err.response.data.message;
        alert(message);
      }
    }
  };

  const startEdit = (admin) => {
    setEditing(admin);
    setForm({
      name: admin.name,
      phone: admin.phone,
      status: admin.status,
      email: admin.email, // Eski email ko'rsatiladi
      password: "", // Password bo'sh (xavfsizlik uchun)
    });
    setOpen(true);
  };

  const removeAdmin = async (id) => {
    if (!confirm("Rostdan o'chirasizmi?")) return;

    try {
      await deleteAdmin(id);
      await fetchAdmins();
    } catch (err) {
      console.log("Delete error:", err?.response?.data);
      alert("O'chirishda xatolik yuz berdi");
    }
  };

  const closeModal = () => {
    setOpen(false);
    setEditing(null);
    setForm({
      name: "",
      phone: "",
      status: "active",
      email: "",
      password: "",
    });
    setErrors({
      name: "",
      phone: "",
      email: "",
      password: ""
    });
  };

  const fetchAdmins = async () => {
    try {
      const res = await getAdmins();

      const mapped = res.data.map(a => ({
        id: a.id,
        name: a.fullname,
        phone: a.phone,
        email: a.email,
        date: new Date(a.created_at).toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
        status: a.is_active ? "active" : "blocked",
      }));

      setAdmins(mapped);
    } catch (err) {
      console.log("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  // Qidiruv funksiyasi
  const filteredAdmins = admins.filter(admin => 
    admin.name.toLowerCase().includes(search.toLowerCase()) ||
    admin.phone.includes(search) ||
    admin.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full space-y-11">
      {/* HEADER */}
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

          <button 
            onClick={() => {
              setEditing(null)
              setForm({
                name: "",
                phone: "",
                status: "active",
                email: "",
                password: ""
              })
              setErrors({
                name: "",
                phone: "",
                email: "",
                password: ""
              })
              setOpen(true)
            }} 
            className="px-4 h-10 bg-[#1067FF] text-white rounded-lg hover:opacity-80 cursor-pointer"
          >
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
            <span className="text-xs font-medium text-[#0F5EE8]">{filteredAdmins.length} users</span>
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
        {filteredAdmins.length === 0 ? (
          <div className="px-6 py-8 text-center text-gray-500">
            Ma'lumot topilmadi
          </div>
        ) : (
          filteredAdmins.map(admin => (
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
                  <TrashIcon 
                    onClick={() => removeAdmin(admin.id)} 
                    className="w-4 h-4 cursor-pointer text-red-500 hover:text-red-700"
                  />
                </div>
                <div>
                  <PencilIcon 
                    onClick={() => startEdit(admin)} 
                    className="w-4 h-4 cursor-pointer text-blue-600 hover:text-blue-800"
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-[700px] p-6 relative">
            <button onClick={closeModal} className="absolute right-7 top-7">
              <X className="w-6 h-6"/>
            </button>

            <h3 className="text-lg font-bold text-[#2C3E50] mb-4">
              {editing ? "Tahrirlash" : "Administrator qo'shish"}
            </h3>

            <div className="border border-[#EAECF0] m-7 w-full mx-auto"/>

            <div className="flex flex-col gap-4">
              {/* FISH */}
              <label className="flex flex-col gap-2">
                <span className="font-medium text-sm leading-5 text-[#344054]">
                  FISH*
                </span>
                <input 
                  placeholder="Ismini kiriting" 
                  value={form.name} 
                  onChange={e => {
                    setForm({ ...form, name: e.target.value })
                    if (errors.name) {
                      setErrors({ ...errors, name: "" })
                    }
                  }} 
                  className={`w-full shadow-xs border rounded-lg px-4 py-3 ${
                    errors.name ? "border-red-500" : "border-[#D0D5DD]"
                  }`}
                /> 
                {errors.name && (
                  <span className="text-sm text-red-500">{errors.name}</span>
                )}
              </label>

              {/* TELEFON VA HOLAT */}
              <div className="flex items-start justify-between w-full gap-4">
                <label className="w-[49%] flex flex-col gap-2">
                  <span className="font-medium text-sm leading-5 text-[#344054]">
                    Telefon raqami*
                  </span>
                  <input 
                    placeholder="+998 90 123 45 67" 
                    value={form.phone} 
                    onChange={e => {
                      setForm({ ...form, phone: e.target.value })
                      if (errors.phone) {
                        setErrors({ ...errors, phone: "" })
                      }
                    }} 
                    className={`w-full border shadow-xs rounded-lg px-4 py-3 ${
                      errors.phone ? "border-red-500" : "border-[#D0D5DD]"
                    }`}
                  />
                  {errors.phone && (
                    <span className="text-sm text-red-500">{errors.phone}</span>
                  )}
                </label>

                <label className="w-[49%] flex flex-col gap-2">
                  <span className="font-medium text-sm leading-5 text-[#344054]">
                    Holati
                  </span>
                  <select 
                    value={form.status} 
                    onChange={e => setForm({ ...form, status: e.target.value })} 
                    className="w-full border rounded-lg text-[#667085] px-4 py-3 shadow-xs bg-[#F9FAFB] border-[#D0D5DD]"
                  >
                    <option value="active">Aktiv</option>
                    <option value="blocked">Bloklangan</option>
                  </select>
                </label>
              </div>

              {/* EMAIL VA PASSWORD */}
              <div className="flex items-start justify-between w-full gap-4">
                <label className="w-[49%] flex flex-col gap-2">
                  <span className="font-medium text-sm leading-5 text-[#344054]">
                    Email{!editing && "*"}
                  </span>
                  <input
                    type="email"
                    placeholder="example@gmail.com"
                    value={form.email}
                    onChange={(e) => {
                      setForm({ ...form, email: e.target.value });
                      if (errors.email) {
                        setErrors({ ...errors, email: "" });
                      }
                    }}
                    className={`w-full border shadow-xs rounded-lg px-4 py-3 ${
                      errors.email ? "border-red-500" : "border-[#D0D5DD]"
                    }`}
                  />
                  {errors.email && (
                    <span className="text-sm text-red-500">{errors.email}</span>
                  )}
                  {editing && !errors.email && (
                    <span className="text-sm leading-5 text-[#475467]">
                      O'zgartirish ixtiyoriy
                    </span>
                  )}
                </label>

                <label className="w-[49%] flex flex-col gap-2">
                  <span className="font-medium text-sm leading-5 text-[#344054]">
                    Password{!editing && "*"}
                  </span>
                  <input 
                    placeholder={editing ? "Yangi parol (ixtiyoriy)" : "Kamida 8 ta belgi"} 
                    type="password" 
                    value={form.password} 
                    onChange={e => {
                      setForm({ ...form, password: e.target.value })
                      if (errors.password) {
                        setErrors({ ...errors, password: "" })
                      }
                    }} 
                    className={`w-full shadow-xs border rounded-lg px-4 py-3 ${
                      errors.password ? "border-red-500" : "border-[#D0D5DD]"
                    }`}
                  />
                  {errors.password && (
                    <span className="text-sm text-red-500">{errors.password}</span>
                  )}
                  {!errors.password && (
                    <span className="text-sm leading-5 text-[#475467]">
                      {editing 
                        ? "Bo'sh qoldiring agar o'zgartirmoqchi bo'lmasangiz" 
                        : "Kamida 8 ta belgidan iborat bo'lishi kerak"
                      }
                    </span>
                  )}
                </label>
              </div>

              {/* SAQLASH TUGMASI */}
              <div className="text-end">
                <button 
                  onClick={addAdmin} 
                  className="w-[100px] h-10 bg-[#1067FF] shadow-xs text-white rounded-lg mt-4 cursor-pointer hover:bg-[#0052CC]"
                >
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