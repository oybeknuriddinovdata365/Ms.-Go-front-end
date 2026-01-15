function ProfileSettings() {
  return (
    <div className="space-y-6">
      {/* Avatar */}
      <h2 className="text-[#171822] font-semibold text-[24px] leading-8">Profil ma'lumotlari</h2>

      <div className="bg-white border border-[#E4E9EF] rounded-xl p-5 mt-3 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-4">
          <img src="https://i.pravatar.cc/100" className="w-16 h-16 rounded-full"/>

          <div className="w-[255px]">
            <p className="text-sm text-[#344054] leading-5">
              You can upload jpg, gif or png image files. Max size of 3MB
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <button className="px-4 py-2 font-semibold border border-[#D0D5DD] shadow-xs rounded-lg text-red-500 cursor-pointer">
            O'chirish
          </button>
          <button className="px-4 py-2 font-semibold border border-[#D0D5DD] shadow-xs rounded-lg text-blue-500 cursor-pointer">
            Rasm yuklash
          </button>
        </div>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-[#344054] font-medium text-[14px]">Ism</label>
          <input placeholder="Enter your first name" className="w-full mt-1 border border-[#D0D5DD] shadow-xs rounded-lg px-3 py-2"/>
        </div>

        <div>
          <label className="text-sm text-[#344054] font-medium text-[14px]">Familiya</label>
          <input placeholder="Enter your first name" className="w-full mt-1 border border-[#D0D5DD] shadow-xs rounded-lg px-3 py-2"/>
        </div>

        <div>
          <label className="text-sm text-[#344054] font-medium text-[14px]">Telefon raqami</label>
          <input placeholder="+998" className="w-full mt-1 border border-[#D0D5DD] shadow-xs rounded-lg px-3 py-2"/>
        </div>

        <div>
          <label className="text-sm text-[#344054] font-medium text-[14px]">Holati</label>
          <select className="w-full mt-1 border shadow-xs border-[#D0D5DD] bg-[#F0F1F3] font-[450] rounded-lg px-3 py-2 text-[#00C900]">
            <option>Aktiv</option>
            <option>Bloklangan</option>
          </select>
        </div>
      </div>

      {/* Save button */}
      <div className="flex justify-end">
        <button className="bg-[#0F5EE8] font-semibold cursor-pointer hover:opacity-80 text-white px-6 py-3 rounded-lg">
          Saqlash
        </button>
      </div>
    </div>
  )
}

export default ProfileSettings;