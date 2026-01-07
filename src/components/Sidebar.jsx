import { NavLink } from "react-router-dom";
import MedicIcon from "../assets/Images/MedicLogo.svg"
import DashboardIcon from "../assets/Images/DashboardIcon.svg"
import ShifokorlarIcon from "../assets/Images/ShifokorlarIcon.svg"
import BemorlarIcon from "../assets/Images/BemorlarIcon.svg"
import ChiqishIcon from "../assets/Images/ChiqishIcon.svg"

export default function Sidebar() {
const menu = [
    { title: "Dashboard", icon: DashboardIcon, path: "/dashboard" },
    { title: "Shifokorlar", icon: ShifokorlarIcon, path: "/shifokorlar" },
    { title: "Arizalar", icon: ShifokorlarIcon, path: "/arizalar" },
    { title: "Bemorlar", icon: BemorlarIcon, path: "/bemorlar" },
    { title: "Administrator", icon: BemorlarIcon, path: "/administrator" },
  ];

  function openLogoutModal() {
    const event = new CustomEvent("openLogout");
    window.dispatchEvent(event);
    console.log("button bosildi")
  }

  return (
    <div className="py-10 px-5 flex flex-col">
      <div className="flex items-center justify-center mb-8">
        <img src={MedicIcon} alt="Logo" width={127} height={32}/>
      </div>

      <nav className="flex flex-col gap-2">
        {menu.map((item, i) => (
          <NavLink
            key={i}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                isActive
                  ? "bg-blue-100 text-blue-600 font-semibold"
                  : "text-gray-600 hover:bg-gray-100"
              }`
            }
          >
            <img src={item.icon} alt="icon" className="w-5 h-5" />
            <span>{item.title}</span>
          </NavLink>
          
        ))}

        <button
          onClick={openLogoutModal}
          className="flex items-center cursor-pointer mt-7 gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100"
        >
          <img src={ChiqishIcon} width={20} />
          Chiqish
        </button>
      </nav>
    </div>
  );
}
