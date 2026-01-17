import { useParams, Link } from "react-router-dom";
import StarIcon from "../assets/Images/star-icon.svg";
import CheckIcon from "../assets/Images/check-icon.svg";
import ArrowLeft from "../assets/Images/arrow-left.svg";
import EditIcon from "../assets/Images/edit-icon.svg";
import LikeIcon from "../assets/Images/like-icon.svg";
import PhoneIcon from "../assets/Images/phone-icon.svg";
import { patientData } from "../utils/patientData";
import ProfileTabs from "../components/ProfileTabs";
import PatientTabs from "../components/PatientTabs";

function PatientDetail() {
  const { id } = useParams();

  const patient = patientData.find(p => p.id === Number(id));

  const handleArrowClick = () => {
    window.history.back();
  };

  if (!patient) {
    return <p>Ma'lumot topilmadi</p>;
  }

  return (
    <div className="w-full">
      {/* Back to patient page section */}
      <div className="mb-6 flex items-center gap-2 text-[18px] font-medium text-[#1067FF]">
        <img onClick={handleArrowClick} className="cursor-pointer" src={ArrowLeft} alt="Back to patients page" width={24} height={24}/>
        <Link to="/bemorlar">Bemorlar</Link>
        <span> / {patient.name}</span>
      </div>

        {/* Patient details section */}
        <div className="flex gap-7 items-start">
          {/* Patient left side  */}
          <div className="w-[30%] bg-white rounded-2xl py-7 px-[76px] text-center shadow-sm">
            <img src={patient.avatar} alt="doctor image" className="w-24 h-24 rounded-full mx-auto mb-2"/>
            <h3 className="font-semibold">{patient.name}</h3>
            <div className="flex items-center gap-1 justify-center space-y-2">
              <p className="text-sm text-green-500 mt-1">Aktiv</p>
              <img src={EditIcon} alt="Edit status" width={18} height={18}/>
            </div>
            <div className="w-[60px] mt-2 mb-4 px-3 py-1 rounded-sm flex bg-[#F2F3FD] mx-auto justify-center items-center gap-1">
              <img src={StarIcon} className="w-4" />
              <span className="text-sm">{patient.rating}</span>
            </div>
            <div className="flex items-center justify-center gap-2 mb-2">
              <img src={LikeIcon} alt="Rating" width={19} height={19}/>
              <p className="text-xs font-medium text-gray-700">98% (250 sharhlar)</p>
            </div>
            <div className="flex items-center justify-center gap-2 mb-2">
              <img src={PhoneIcon} alt="Rating" width={14} height={14}/>
              <p className="text-sm mt-3">{patient.phone}</p>
            </div>
            <div className="flex items-center justify-center gap-2 font-medium text-[12px] text-gray-700">
              <img src={CheckIcon} className="w-4"/>
              Medical Registration Verified
            </div>
          </div>
  
          {/* Patient right side */}
          <div className="w-[70%]">
            <PatientTabs/>
          </div>
        </div>
    </div>
  );
}

export default PatientDetail;
