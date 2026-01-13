import { useNavigate } from "react-router-dom";

function DoctorCard({doctor}) {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-white border border-gray-200 rounded-md p-5 flex items-center justify-between shadow-sm">
      
      <div className="flex items-center gap-4">
        <img
          src={doctor.avatar}
          alt={doctor.name}
          className="w-14 h-14 rounded-xl object-cover"
        />

        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {doctor.name}
          </h3>

          <p className="text-sm text-gray-500">
            {doctor.role}
          </p>

          <p className="text-sm text-gray-500">
            {doctor.phone}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <button
          onClick={() => navigate(`/shifokorlar/${doctor.id}/qabullar`)}
          className="px-5 py-2 rounded-xl bg-blue-600 text-white text-sm font-medium">
          Shifokorning qabullari
        </button>

        <button
          onClick={() => navigate(`/shifokorlar/${doctor.id}`)}
          className="px-5 py-2 rounded-xl border border-gray-300 text-sm font-medium text-gray-700">
          Batafsil
        </button>
      </div>
    </div>
  );
}

export default DoctorCard;
