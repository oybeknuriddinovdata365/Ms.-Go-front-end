import { Eye, EyeOff } from "lucide-react"
import { useState } from "react";
import { changePassword } from "../services/profile";

function ChangePassword() {
  const [passwords, setPasswords] = useState({
    current: "",
    next: "",
    confirm: ""
  });

  const [show, setShow] = useState({
    current: false,
    next: false,
    confirm: false,
  });

  const [errors, setErrors] = useState({
    current: "",
    next: "",
    confirm: ""
  });

  const [isLoading, setIsLoading] = useState(false);

  // Validatsiya
  const validateForm = () => {
    const newErrors = {
      current: "",
      next: "",
      confirm: ""
    };

    let isValid = true;

    // Joriy parol tekshirish
    if (!passwords.current.trim()) {
      newErrors.current = "Joriy parolni kiriting";
      isValid = false;
    }

    // Yangi parol tekshirish
    if (!passwords.next.trim()) {
      newErrors.next = "Yangi parolni kiriting";
      isValid = false;
    } else if (passwords.next.length < 8) {
      newErrors.next = "Parol kamida 8 ta belgidan iborat bo'lishi kerak";
      isValid = false;
    } else if (passwords.next === passwords.current) {
      newErrors.next = "Yangi parol joriy paroldan farq qilishi kerak";
      isValid = false;
    }

    // Tasdiqlash parol tekshirish
    if (!passwords.confirm.trim()) {
      newErrors.confirm = "Parolni tasdiqlang";
      isValid = false;
    } else if (passwords.confirm !== passwords.next) {
      newErrors.confirm = "Parollar mos kelmaydi";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Parolni o'zgartirish
  const handleChangePassword = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      setIsLoading(true);

      const payload = {
        currentPassword: passwords.current,
        newPassword: passwords.next,
        confirmPassword: passwords.confirm
      };

      await changePassword(payload);

      // Muvaffaqiyatli
      alert("Parol muvaffaqiyatli o'zgartirildi!");

      // Formani tozalash
      setPasswords({
        current: "",
        next: "",
        confirm: ""
      });

      setErrors({
        current: "",
        next: "",
        confirm: ""
      });

      // Ixtiyoriy: Logout qilish va qaytadan login qilishni talab qilish
      // logout();
      // navigate("/login");

    } catch (err) {
      console.error("Parol o'zgartirishda xatolik:", err?.response?.data);

      const message = err?.response?.data?.message;
      
      if (message) {
        // Backend xatoligini ko'rsatish
        if (message.includes("incorrect") || message.includes("noto'g'ri")) {
          setErrors({ ...errors, current: "Joriy parol noto'g'ri" });
        } else if (Array.isArray(message)) {
          alert(message.join(", "));
        } else {
          alert(message);
        }
      } else {
        alert("Parolni o'zgartirishda xatolik yuz berdi");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 w-[420px]">
      <h2 className="text-[#171822] font-semibold text-[24px] leading-8">
        Parolni o'zgartirish
      </h2>

      {/* Joriy parol */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-[#344054]">
          Joriy parol*
        </label>

        <div className="relative">
          <input 
            type={show.current ? "text" : "password"} 
            placeholder="Joriy parolni kiriting" 
            value={passwords.current}
            onChange={(e) => {
              setPasswords({ ...passwords, current: e.target.value });
              if (errors.current) {
                setErrors({ ...errors, current: "" });
              }
            }}
            className={`w-full border rounded-lg px-4 py-3 pr-10 shadow-xs ${
              errors.current ? "border-red-500" : "border-[#D0D5DD]"
            }`}
          />
          {show.current ? (
            <Eye
              onClick={() => setShow(s => ({ ...s, current: false }))}
              className="w-5 h-5 absolute right-3 top-3.5 text-gray-400 cursor-pointer"
            />
          ) : (
            <EyeOff
              onClick={() => setShow(s => ({ ...s, current: true }))}
              className="w-5 h-5 absolute right-3 top-3.5 text-gray-400 cursor-pointer"
            />
          )}
        </div>
        {errors.current && (
          <span className="text-sm text-red-500">{errors.current}</span>
        )}
      </div>

      {/* Yangi parol */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-[#344054]">
          Yangi parol*
        </label>

        <div className="relative">
          <input 
            type={show.next ? "text" : "password"} 
            placeholder="Kamida 8 ta belgi" 
            value={passwords.next}
            onChange={(e) => {
              setPasswords({ ...passwords, next: e.target.value });
              if (errors.next) {
                setErrors({ ...errors, next: "" });
              }
            }}
            className={`w-full border rounded-lg px-4 py-3 pr-10 shadow-xs ${
              errors.next ? "border-red-500" : "border-[#D0D5DD]"
            }`}
          />
          {show.next ? (
            <Eye
              onClick={() => setShow(s => ({ ...s, next: false }))}
              className="w-5 h-5 absolute right-3 top-3.5 text-gray-400 cursor-pointer"
            />
          ) : (
            <EyeOff
              onClick={() => setShow(s => ({ ...s, next: true }))}
              className="w-5 h-5 absolute right-3 top-3.5 text-gray-400 cursor-pointer"
            />
          )}
        </div>
        {errors.next && (
          <span className="text-sm text-red-500">{errors.next}</span>
        )}
        {!errors.next && passwords.next && (
          <span className="text-sm text-gray-500">
            Kamida 8 ta belgidan iborat bo'lishi kerak
          </span>
        )}
      </div>

      {/* Parolni tasdiqlash */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-[#344054]">
          Parolni tasdiqlang*
        </label>

        <div className="relative">
          <input 
            type={show.confirm ? "text" : "password"} 
            placeholder="Parolni qayta kiriting" 
            value={passwords.confirm}
            onChange={(e) => {
              setPasswords({ ...passwords, confirm: e.target.value });
              if (errors.confirm) {
                setErrors({ ...errors, confirm: "" });
              }
            }}
            className={`w-full border rounded-lg px-4 py-3 pr-10 shadow-xs ${
              errors.confirm ? "border-red-500" : "border-[#D0D5DD]"
            }`}
          />
          {show.confirm ? (
            <Eye
              onClick={() => setShow(s => ({ ...s, confirm: false }))}
              className="w-5 h-5 absolute right-3 top-3.5 text-gray-400 cursor-pointer"
            />
          ) : (
            <EyeOff
              onClick={() => setShow(s => ({ ...s, confirm: true }))}
              className="w-5 h-5 absolute right-3 top-3.5 text-gray-400 cursor-pointer"
            />
          )}
        </div>
        {errors.confirm && (
          <span className="text-sm text-red-500">{errors.confirm}</span>
        )}
        {!errors.confirm && passwords.confirm && passwords.confirm === passwords.next && (
          <span className="text-sm text-green-500 flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Parollar mos keladi
          </span>
        )}
      </div>

      {/* O'zgartirish tugmasi */}
      <div className="text-end">
        <button 
          onClick={handleChangePassword}
          disabled={isLoading}
          className="mt-1 bg-[#0F5EE8] text-white px-6 py-3 shadow-xs cursor-pointer hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg"
        >
          {isLoading ? "Yuklanmoqda..." : "O'zgartirish"}
        </button>
      </div>
    </div>
  );
}

export default ChangePassword;