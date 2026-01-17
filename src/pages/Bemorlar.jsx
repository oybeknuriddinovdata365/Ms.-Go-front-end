import React from 'react'
import SearchIcon from "../assets/Images/search-icon.svg";
import BemorlarTable from '../components/BemorlarTable';


function Bemorlar() {
  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-[24px] leading-8 font-semibold">Bemorlar</h2>
            
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 w-[320px] border border-gray-300 rounded-xl px-4 py-2 bg-white">
            <input type="text" placeholder="Qidirish" className="w-full outline-none text-gray-700"/>
            <img src={SearchIcon} alt="search" className="w-4 h-4" />
          </div>
        </div>
      </div>

      <BemorlarTable/>
    </div>
  )
}

export default Bemorlar