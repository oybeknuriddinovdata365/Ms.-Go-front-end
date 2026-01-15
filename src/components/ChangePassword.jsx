import { Eye, EyeOff } from "lucide-react"
import { useState } from "react";

function ChangePassword() {
  const [passwords, setPasswords] = useState({
  current: "",
  next: "",
  confirm: ""
})

const [show, setShow] = useState({
  current: false,
  next: false,
  confirm: false,
})


  return (
    <div className="space-y-6 w-[420px]">
      <h2 className="text-[#171822] font-semibold text-[24px] leading-8">Parolni o'zgartirish</h2>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-[#344054]">
          Joriy parol
        </label>

        <div className="relative">
          <input type={show.current ? "text" : "password"} placeholder="Joriy parolni kiriting" className="w-full border border-[#D0D5DD] rounded-lg px-4 py-3 pr-10 shadow-xs"/>
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
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-[#344054]">
          Yangi parol
        </label>

        <div className="relative">
          <input type={show.next ? "text" : "password"} placeholder="Enter password" className="w-full border border-[#D0D5DD] rounded-lg px-4 py-3 pr-10 shadow-xs"/>
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
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-[#344054]">
          Parolni tasdiqlang
        </label>

        <div className="relative">
          <input type={show.confirm ? "text" : "password"} placeholder="Re-enter password" className="w-full border border-[#D0D5DD] rounded-lg px-4 py-3 pr-10 shadow-xs"/>
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
      </div>

      <div className="text-end">
        <button className="mt-1 bg-[#0F5EE8] text-white px-6 py-3 shadow-xs cursor-pointer hover:opacity-80 rounded-lg">O'zgartirish</button>
      </div>

    </div>
  )
}

export default ChangePassword;