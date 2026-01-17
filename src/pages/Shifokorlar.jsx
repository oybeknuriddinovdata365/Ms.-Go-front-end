import { useState } from "react";
import SearchIcon from "../assets/Images/search-icon.svg";
import FilterIcon from "../assets/Images/filter-icon.svg";
import DoctorCard from "../components/DoctorCard";
import Pagination from "../components/Pagination";
import { doctors } from "../utils/doctorData";

function Shifokorlar() {
  const [openFilter, setOpenFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 6;

  const totalPages = Math.ceil(doctors.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentDoctors = doctors.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-[24px] leading-8 font-semibold">
          Shifokorlar
        </h2>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 w-[320px] border border-gray-300 rounded-xl px-4 py-2 bg-white">
            <input
              type="text"
              placeholder="Qidirish"
              className="w-full outline-none text-gray-700"
            />
            <img src={SearchIcon} alt="search" className="w-4 h-4" />
          </div>

          <div className="relative">
            <button
              onClick={() => setOpenFilter(prev => !prev)}
              className="flex items-center gap-2 border border-gray-300 bg-white px-4 py-2 rounded-xl"
            >
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

      <div className="grid grid-cols-1 gap-4">
        {currentDoctors.map(doctor => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onChange={setCurrentPage}
      />
    </div>
  );
}

export default Shifokorlar;
