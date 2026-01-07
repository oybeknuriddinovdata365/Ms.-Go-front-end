import { useParams, Link } from "react-router-dom";
import StarIcon from "../assets/Images/star-icon.svg";
import CheckIcon from "../assets/Images/check-icon.svg";
import FileIcon from "../assets/Images/file-icon.svg";
import EyeIcon from "../assets/Images/eye-icon.svg";
import TrashIcon from "../assets/Images/trash-icon.svg";
import ArrowLeft from "../assets/Images/arrow-left.svg";
import EditIcon from "../assets/Images/edit-icon.svg";
import LikeIcon from "../assets/Images/like-icon.svg";
import PhoneIcon from "../assets/Images/phone-icon.svg";
import CalendarIcon from "../assets/Images/calendar-icon.svg";
import HospitalIcon from "../assets/Images/hospital-icon.svg";
import { doctors } from "../utils/doctor";
import Tabs from "./Tabs"

function DoctorDetail() {
  const { id } = useParams();

  const doctor = doctors.find(d => d.id === Number(id));

  const handleArrowClick = () => {
    window.history.back();
  };

  if (!doctor) {
    return <p>Ma'lumot topilmadi</p>;
  }

  return (
    <div className="w-full">
      {/* Back to doctors page section */}
      <div className="mb-6 flex items-center gap-2 text-[18px] font-medium text-[#1067FF]">
        <img onClick={handleArrowClick} className="cursor-pointer" src={ArrowLeft} alt="Back to doctors page" width={24} height={24}/>
        <Link to="/shifokorlar">Shifokorlar</Link>
        <span> / {doctor.name}</span>
      </div>

        {/* Doctor details section */}
        <div className="flex gap-7 items-start">
          {/* Doctor left side  */}
          <div className="w-[30%] bg-white rounded-2xl py-7 px-[76px] text-center shadow-sm">
            <img src={doctor.avatar} alt="doctor image" className="w-24 h-24 rounded-full mx-auto mb-2"/>
            <h3 className="font-semibold text-lg">{doctor.name}</h3>
            <div className="flex items-center gap-1 justify-center space-y-2">
              <p className="text-sm text-green-500 mt-1">Aktiv</p>
              <img src={EditIcon} alt="Edit status" width={18} height={18}/>
            </div>
            <div className="w-[60px] mt-2 mb-4 px-3 py-1 rounded-sm flex bg-[#F2F3FD] mx-auto justify-center items-center gap-1">
              <img src={StarIcon} className="w-4" />
              <span className="text-sm">{doctor.rating}</span>
            </div>
            <div className="flex items-center justify-center gap-2 mb-2">
              <img src={LikeIcon} alt="Rating" width={19} height={19}/>
              <p className="text-xs font-medium text-gray-700">98% (250 sharhlar)</p>
            </div>
            <div className="flex items-center justify-center gap-2 mb-2">
              <img src={PhoneIcon} alt="Rating" width={14} height={14}/>
              <p className="text-sm mt-3">{doctor.phone}</p>
            </div>
            <div className="flex items-center justify-center gap-2 font-medium text-[12px] text-gray-700">
              <img src={CheckIcon} className="w-4"/>
              Medical Registration Verified
            </div>
          </div>
  
          {/* Doctor right side */}
          <div className="w-[70%]">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-[#F2F3FD] border-[0.5px] border-[#CCD0F8] rounded-lg p-4 text-center flex flex-col items-center">
                <img className="mb-6" src={CalendarIcon} alt="Visites icon" width={24} height={24}/>
                <p className="text-[24px] font-semibold">{doctor.visits}</p>
                <p className="text-xs font-medium text-[12px] leading-5">Qabullar soni</p>
              </div>

              <div className="bg-[#F2F3FD] border-[0.5px] border-[#CCD0F8] rounded-lg p-4 text-center flex flex-col items-center">
                <img className="mb-6" src={HospitalIcon} alt="Visites icon" width={30} height={30}/>
                <p className="text-[24px] font-semibold">{doctor.income}</p>
                <p className="text-xs font-medium text-[12px] leading-5">Umumiy daromadi</p>
              </div>
            </div>

            <div className="mb-6">
              <p className="font-medium text-[16px] text-[#171822]">Mutaxassisligi</p>
              <div className="flex gap-2 mt-4">
                {doctor.speciality.map(item => (
                  <span key={item} className="px-3 py-1 text-[12px] font-medium border border-[#EAECF0] bg-white rounded-full">{item}</span>
                ))}
              </div>
            </div>
            
            <hr className="h-[0.92px] mb-6 text-[#E1DFEC]"/>

            <Tabs doctor={doctor}/>
          </div>
        </div>
      </div>
  );
}

export default DoctorDetail;
