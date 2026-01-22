import React, { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../services/profile";

function ProfileSettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [adminId, setAdminId] = useState(null);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    status: "active",
  });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    phone: "",
  });

  // Profil ma'lumotlarini yuklash
  const fetchProfile = async () => {
    try {
      setLoading(true);
      
      // Admin ID'sini olish
      const response = await getProfile();
      const admin = response.data;

      // ID'ni saqlash
      setAdminId(admin.id);

      // Fullname'ni ism va familiyaga ajratish
      const nameParts = admin.fullname ? admin.fullname.split(" ") : ["", ""];
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";

      setForm({
        firstName,
        lastName,
        phone: admin.phone || "",
        status: admin.is_active ? "active" : "blocked",
      });
    } catch (err) {
      console.error("Profil yuklashda xatolik:", err);
      
      if (err.message && err.message.includes("Admin ID topilmadi")) {
        alert("Sessiya tugagan. Iltimos, qaytadan login qiling.");
        // Login sahifasiga yo'naltirish
        window.location.href = "/login";
      } else {
        alert("Profil ma'lumotlarini yuklashda xatolik yuz berdi");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // Validatsiya
  const validateForm = () => {
    const newErrors = {
      firstName: "",
      lastName: "",
      phone: "",
    };

    let isValid = true;

    if (!form.firstName.trim()) {
      newErrors.firstName = "Ism majburiy";
      isValid = false;
    }

    if (!form.lastName.trim()) {
      newErrors.lastName = "Familiya majburiy";
      isValid = false;
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Telefon raqami majburiy";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Saqlash
  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    if (!adminId) {
      alert("Admin ID topilmadi. Iltimos, sahifani yangilang.");
      return;
    }

    try {
      setSaving(true);

      const payload = {
        fullname: `${form.firstName} ${form.lastName}`.trim(),
        phone: form.phone,
        is_active: form.status === "active",
      };

      await updateProfile(adminId, payload);
      alert("Profil muvaffaqiyatli yangilandi!");
      
      // Ma'lumotlarni qayta yuklash
      await fetchProfile();
    } catch (err) {
      console.error("Saqlashda xatolik:", err?.response?.data);
      
      const message = err?.response?.data?.message;
      if (message) {
        alert(Array.isArray(message) ? message.join(", ") : message);
      } else {
        alert("Profilni saqlashda xatolik yuz berdi");
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Yuklanmoqda...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <h2 className="text-[#171822] font-semibold text-[24px] leading-8">
        Profil ma'lumotlari
      </h2>

      {/* Avatar */}
      <div className="bg-white border border-[#E4E9EF] rounded-xl p-5 mt-3 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-4">
          <img 
            src="https://i.pravatar.cc/100" 
            alt="Avatar"
            className="w-16 h-16 rounded-full"
          />

          <div className="w-[255px]">
            <p className="text-sm text-[#344054] leading-5">
              You can upload jpg, gif or png image files. Max size of 3MB
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <button className="px-4 py-2 font-semibold border border-[#D0D5DD] shadow-xs rounded-lg text-red-500 cursor-pointer hover:bg-red-50">
            O'chirish
          </button>
          <button className="px-4 py-2 font-semibold border border-[#D0D5DD] shadow-xs rounded-lg text-blue-500 cursor-pointer hover:bg-blue-50">
            Rasm yuklash
          </button>
        </div>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-2 gap-4">
        {/* Ism */}
        <div>
          <label className="text-sm text-[#344054] font-medium text-[14px]">
            Ism*
          </label>
          <input 
            placeholder="Ismingizni kiriting" 
            value={form.firstName}
            onChange={(e) => {
              setForm({ ...form, firstName: e.target.value });
              if (errors.firstName) {
                setErrors({ ...errors, firstName: "" });
              }
            }}
            className={`w-full mt-1 border shadow-xs rounded-lg px-3 py-2 ${
              errors.firstName ? "border-red-500" : "border-[#D0D5DD]"
            }`}
          />
          {errors.firstName && (
            <span className="text-sm text-red-500 mt-1">{errors.firstName}</span>
          )}
        </div>

        {/* Familiya */}
        <div>
          <label className="text-sm text-[#344054] font-medium text-[14px]">
            Familiya*
          </label>
          <input 
            placeholder="Familiyangizni kiriting" 
            value={form.lastName}
            onChange={(e) => {
              setForm({ ...form, lastName: e.target.value });
              if (errors.lastName) {
                setErrors({ ...errors, lastName: "" });
              }
            }}
            className={`w-full mt-1 border shadow-xs rounded-lg px-3 py-2 ${
              errors.lastName ? "border-red-500" : "border-[#D0D5DD]"
            }`}
          />
          {errors.lastName && (
            <span className="text-sm text-red-500 mt-1">{errors.lastName}</span>
          )}
        </div>

        {/* Telefon */}
        <div>
          <label className="text-sm text-[#344054] font-medium text-[14px]">
            Telefon raqami*
          </label>
          <input 
            placeholder="+998 90 123 45 67" 
            value={form.phone}
            onChange={(e) => {
              setForm({ ...form, phone: e.target.value });
              if (errors.phone) {
                setErrors({ ...errors, phone: "" });
              }
            }}
            className={`w-full mt-1 border shadow-xs rounded-lg px-3 py-2 ${
              errors.phone ? "border-red-500" : "border-[#D0D5DD]"
            }`}
          />
          {errors.phone && (
            <span className="text-sm text-red-500 mt-1">{errors.phone}</span>
          )}
        </div>

        {/* Holati */}
        <div>
          <label className="text-sm text-[#344054] font-medium text-[14px]">
            Holati
          </label>
          <select 
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            className={`w-full mt-1 border shadow-xs rounded-lg px-3 py-2 ${
              form.status === "active" 
                ? "bg-[#F0F1F3] text-[#00C900]" 
                : "bg-[#FEF3F2] text-[#F04438]"
            } font-[450] border-[#D0D5DD]`}
          >
            <option value="active">Aktiv</option>
            <option value="blocked">Bloklangan</option>
          </select>
        </div>
      </div>

      {/* Save button */}
      <div className="flex justify-end">
        <button 
          onClick={handleSave}
          disabled={saving}
          className="bg-[#0F5EE8] font-semibold cursor-pointer hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg"
        >
          {saving ? "Saqlanmoqda..." : "Saqlash"}
        </button>
      </div>
    </div>
  );
}

export default ProfileSettings;