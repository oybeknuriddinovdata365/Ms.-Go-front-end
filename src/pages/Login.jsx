import { useEffect, useState } from "react";
import LoginDocImage from "../assets/Images/LoginDocImage.webp"
import Logo from "../assets/Images/Logo.svg"
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../services/auth";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  async function handleLogin(e) {
  e.preventDefault()

  const newErrors = { email: "", password: "" }

  if (!formData.email) {
    newErrors.email = "Email manzilini kiriting"
  } else if (!formData.email.includes("@")) {
    newErrors.email = '"@" mavjud emas'
  }

  if (!formData.password) {
    newErrors.password = "Parolni kiriting"
  } else if (formData.password.length < 8) {
    newErrors.password = "Kamida 8 ta belgi"
  }

  setErrors(newErrors)

  if (newErrors.email || newErrors.password) return

  try {
    const res = await adminLogin(formData)

    localStorage.setItem("accessToken", res.accessToken)
    localStorage.setItem("refreshToken", res.refreshToken)
    localStorage.setItem("admin", JSON.stringify(res.admin))


    navigate("/dashboard")
  } catch (err) {
    setServerError(err.message)
    }
  }

    useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) navigate("/dashboard");
  }, [navigate]);

  return (
    <div className="flex items-start w-full min-h-screen bg-gray-50">
      <div className="w-[60%] flex flex-col mt-[45px] items-center justify-center">
        <div className="mb-20">
          <img src={Logo} alt="MS.go logo" width={127} height={32}/>
        </div>
        
        <div className="flex flex-col gap-4 w-[360px]">
          <h1 className="font-semibold text-[30px] leading-[38px] tracking-[-2px] mb-5 text-center">
            Hisobga kirish
          </h1>
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Login<span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Enter your e-mail"
                value={formData.email}
                onChange={(e) => {
                  setFormData({...formData, email: e.target.value});
                  if (errors.email) setErrors({...errors, email: ''});
                }}
                className={`w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'} px-3 py-2 rounded-lg focus:outline-none focus:ring-2 ${errors.email ? 'focus:ring-red-500' : 'focus:ring-blue-500'} focus:border-transparent`}
              />
              {errors.email && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
            {errors.email && (
              <p className="text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Password<span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => {
                  setFormData({...formData, password: e.target.value});
                  if (errors.password) setErrors({...errors, password: ''});
                }}
                className={`w-full border ${errors.password ? 'border-red-500' : 'border-gray-300'} px-3 py-2 rounded-lg focus:outline-none focus:ring-2 ${errors.password ? 'focus:ring-red-500' : 'focus:ring-blue-500'} focus:border-transparent pr-20`}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                {errors.password && (
                  <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                )}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            {errors.password && (
              <p className="text-sm text-red-600">{errors.password}</p>
            )}
            {serverError && (
              <p className="text-sm text-red-600 text-center">
                {serverError}
              </p>
            )}
          </div>
          <button type="submit" onClick={handleLogin} className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white font-medium py-3 rounded-lg mt-2 transition-colors">
            Kirish
          </button>
        </div>
      </div>

      <div className="w-[40%] h-screen flex items-start justify-start overflow-hidden p-6">
        <img src={LoginDocImage} alt="Doctor" loading="lazy" className="w-full h-full object-contain rounded-2xl"/>
      </div>
    </div>
  );
}