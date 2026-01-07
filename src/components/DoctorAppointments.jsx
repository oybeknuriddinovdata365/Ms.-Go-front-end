import { useParams } from "react-router-dom";

function DoctorAppointments() {
  const { id } = useParams();

  return (
    <div className="bg-white p-6 rounded-xl">
      <h2 className="text-xl font-semibold mb-4">
        Shifokorning qabullari
      </h2>

      <p className="text-gray-600 mb-4">
        Doctor ID: {id}
      </p>

    </div>
  );
}

export default DoctorAppointments;
