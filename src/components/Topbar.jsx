import { useNavigate } from "react-router-dom";
import Avatar from "../assets/Images/Avatar.png"

export default function Topbar() {
  const navigate = useNavigate();

  return (
    <div className="w-full mb-5 bg-[#2A313A] py-4.5 flex items-center justify-end pr-6">
      <button onClick={() => navigate("/profile")} className="flex items-center gap-3">
        <img src={Avatar} alt="avatar" className="w-10 h-10 rounded-full"/>
        <div className="text-right">
          <p className="font-medium text-white text-start">Superadmin</p>
          <p className="text-gray-100 text-sm">+998 91 478 0101</p>
        </div>
      </button>
    </div>
  );
}
