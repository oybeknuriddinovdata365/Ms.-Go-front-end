import SearchIcon from "../assets/Images/search-icon.svg";
import FilterIcon from "../assets/Images/filter-icon.svg";
import { useState } from "react";
import StatusBadge from "../components/StatusBadge";
import ArizalarTable from "../components/ArizalarTable";
import { applications } from "../utils/applications"; 

function Arizalar() {
  const [openFilter, setOpenFilter] = useState(false);
  return (
    <div className='w-full'>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-[24px] leading-8 font-semibold">
          Arizalar
        </h2>
      
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 w-[320px] border border-gray-300 rounded-xl px-4 py-2 bg-white">
            <input type="text" placeholder="Qidirish" className="w-full outline-none text-gray-700"/>
            <img src={SearchIcon} alt="search" className="w-4 h-4" />
          </div>
      
          <div className="relative">
            <button onClick={() => setOpenFilter(prev => !prev)} className="flex items-center gap-2 border border-gray-300 bg-white px-4 py-2 rounded-xl">
              Filtr
              <img src={FilterIcon} alt="filter" className="w-4 h-4" />
            </button>
      
            {openFilter && (
              <div className="absolute right-0 mt-2 w-[220px] bg-white border border-gray-200 rounded-xl shadow-lg p-3 z-50">
                <p className="text-sm font-medium mb-2">Saralash</p>
      
                <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100">
                  Ism bo'yicha
                </button>
      
                <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100">
                  Tajriba bo'yicha
                </button>
      
                <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100">
                  Reyting bo'yicha
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <ArizalarTable/>
    </div>
  )
}

export default Arizalar