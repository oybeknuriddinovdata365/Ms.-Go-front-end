import Chart from "../components/Chart";

export default function Dashboard() {
  return (
    <div>
      <h2 className="text-[24px] leading-8 tracking-[0%]  font-semibold mb-4">Dashboard</h2>

      <div className="w-full mb-5">
        <div className="flex w-full justify-between gap-4">
          <div className="p-5 w-[33%] rounded-[10px] shadow-sm">
            <h3 className="text-lg font-semibold leading-7 tracking-[0%] mb-3">Shifokorlar</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-[#1067FF] mr-2"></div>
                <p className="text-[14px] text-[#475467]">Shifokorlar</p>
              </div>
              <div className="text-end">
                <h4>412</h4>
              </div>
            </div>
          </div>

          <div className="p-5 w-[33%] rounded-[10px] shadow-sm">
            <h3 className="text-lg font-semibold leading-7 tracking-[0%] mb-3">Bemorlar</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-[#6C788A] mr-2"></div>
                <p className="text-[14px] text-[#475467]">Bemorlar</p>
              </div>
              <div className="text-end">
                <h4>561</h4>
              </div>
            </div>
          </div>

          <div className="p-5 w-[33%] rounded-[10px] shadow-sm">
            <h3 className="text-lg font-semibold leading-7 tracking-[0%] mb-3">Qabullar soni</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-[#6C788A] mr-2"></div>
                <p className="text-[14px] text-[#475467]">Qabullar soni</p>
              </div>
              <div className="text-end">
                <h4>36</h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="shadow-sm p-5 rounded-[10px] border border-[#F2F4F7]">
        <div></div>
      </div> */}
      <Chart/>
    </div>
  );
}
