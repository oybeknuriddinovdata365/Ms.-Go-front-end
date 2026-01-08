import { useEffect, useState } from "react";
import SuccessModal from "./SuccessModal";

const STORAGE_KEY = "doctor_extra_info";

function DoctorInfo() {
  const [form, setForm] = useState({
    achievements: "",
    education: "",
    experience: "",
  });
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setForm(JSON.parse(saved));
    }
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSave() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(form));

        setOpenModal(true);

    setTimeout(() => {
      setOpenModal(false);
    }, 2000);
  }

  return (
    <div className="flex flex-col gap-6 max-w-[700px]">
      
      <div>
        <label className="block text-sm text-gray-700 mb-2">
          Erishgan yutuqlari
        </label>
        <textarea
          name="achievements"
          value={form.achievements}
          onChange={handleChange}
          placeholder="Erishgan yutuqlarini kiriting"
          className="w-full min-h-[100px] border border-gray-300 rounded-xl px-4 py-3 outline-none resize-none"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-700 mb-2">
          Ta’lim
        </label>
        <textarea
          name="education"
          value={form.education}
          onChange={handleChange}
          placeholder="Ta’limini kiriting"
          className="w-full min-h-[100px] border border-gray-300 rounded-xl px-4 py-3 outline-none resize-none"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-700 mb-2">
          Ish tajribasi
        </label>
        <textarea
          name="experience"
          value={form.experience}
          onChange={handleChange}
          placeholder="Ish tajribasini kiriting"
          className="w-full min-h-[100px] border border-gray-300 rounded-xl px-4 py-3 outline-none resize-none"
        />
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="px-6 py-2 rounded-xl bg-blue-600 text-white text-sm font-medium"
        >
          Saqlash
        </button>
      </div>
      <SuccessModal open={openModal} />
    </div>
  );
}

export default DoctorInfo;
