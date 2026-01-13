import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { doctors } from "../utils/doctor"
import { patients } from "../utils/patients"
import PatientsList from "./PatientsList"

function DoctorAppointments() {
  const { id } = useParams()
const [selectedPatient, setSelectedPatient] = useState(patients[0])


  const doctor = doctors.find(d => String(d.id) === id)

  return (
    <div className="bg-white p-6 rounded-xl">
      <div className="flex items-center gap-2 text-[18px] font-semibold text-[#1067FF] mb-6">
        <Link to="/shifokorlar" className="hover:underline">
          Shifokorlar
        </Link>
        <span>/</span>
        <Link to={`/shifokorlar/${id}`} className="hover:underline">
          {doctor?.name}
        </Link>
        <span>/</span>
        <span>
          Shifokorning qabullari
        </span>
      </div>

      <div className="shadow-xl w-full h-[100px] text-center p-5 font-bold text-2xl mb-6">Calendar place</div>

      <div className="grid grid-cols-12 gap-6">
       {/* Left place  */}
       <PatientsList patients={patients} selectedPatient={selectedPatient} onSelect={setSelectedPatient}/>

        {/* Right place */}
        <div className="col-span-6 flex flex-col gap-7">
          <h2 className="font-semibold text-2xl leading-7 text-gray-900">Bemor ma'lumotlari</h2>
          <div className="bg-white rounded-2xl border border-[#EAECF0] shadow-sm p-4 space-y-6">

            <div className="border-b border-[#EAECF0] pb-5">
              <div className="flex items-center pb-4 w-full">
                <div className="flex flex-col gap-1 w-[40%]">
                  <p className="font-semibold leading-5">{selectedPatient.name}</p>
                  <p className="text-xs text-gray-700 leading-[140%] tracking-[1%] font-medium">
                    {selectedPatient.age} Years {selectedPatient.gender}
                  </p>
                </div>

                <div className="border-l border-[#EAECF0] pl-6 w-[60%] flex flex-col gap-1">
                  <p className="text-sm font-semibold leading-4">Phone</p>
                  <p className="text-sm text-[#344054] leading-5">
                    {selectedPatient.phone}
                  </p>
                </div>
              </div>

              <div className="h-px bg-gray-200 mb-4"/>

              <div className="flex flex-col gap-y-4">
                <div className="flex w-full text-sm text-[#46494C]">
                  <span className="leading-5 w-[40%]">Sana:</span>
                  <span className="text-gray-900 w-[60%]">{selectedPatient.date}</span>
                </div>

                <div className="flex w-full text-sm text-[#46494C]">
                  <span className="leading-5 w-[40%]">Ish boshlanish vaqti:</span>
                  <span className="text-gray-900 w-[60%]">{selectedPatient.time}</span>
                </div>

                <div className="flex w-full text-sm text-[#46494C]">
                  <span className="leading-5 w-[40%]">Vazni (kg):</span>
                  <span className="text-gray-900 w-[60%]">{selectedPatient.weight}</span>
                </div>

                <div className="flex w-full text-sm text-[#46494C]">
                  <span className="leading-5 w-[40%]">Boyi (sm):</span>
                  <span className="text-gray-900 w-[60%]">{selectedPatient.height}</span>
                </div>
              </div>
            </div>


            <div className="space-y-5 text-sm">

              <div>
                <p className="text-blue-500 font-bold leading-5 pb-1">Qabuldagi shikoyat</p>
                <p className="text-[#1F1F24] leading-[140%]">
                  {selectedPatient.complaint}
                </p>
              </div>

              <div>
                <p className="text-blue-500 font-bold leading-5 pb-1">Anamnesis morbi</p>
                <p className="text-[#1F1F24] leading-[140%]">
                  {selectedPatient.anamnesis}
                </p>
              </div>

              <div>
                <p className="text-blue-500 font-bold leading-5 pb-1">Anamnesis vitae</p>
                <p className="text-[#1F1F24] leading-[140%]">
                  {selectedPatient.vita}
                </p>
              </div>

              <div>
                <p className="text-blue-500 font-bold leading-5 pb-1">Epidemiologik tarix</p>
                <p className="text-[#1F1F24] leading-[140%]">
                  {selectedPatient.epidemiology}
                </p>
              </div>

              <div>
                <p className="text-blue-500 font-bold leading-5 pb-1">Status praesens objectivus</p>
                <p className="text-[#1F1F24] leading-[140%]">
                  {selectedPatient.statusPraesens}
                </p>
              </div>

              <div>
                <p className="text-blue-500 font-bold leading-5 pb-1">Tashxis</p>
                <p className="text-[#1F1F24] leading-[140%]">
                  {selectedPatient.diagnosis}
                </p>
              </div>

              <div>
                <p className="text-blue-500 font-bold leading-5 pb-1">
                  Tekshiruv
                </p>
                <p className="text-[#1F1F24] leading-[140%]">
                  {selectedPatient.tests}
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DoctorAppointments
