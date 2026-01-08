import React, { useState } from 'react';
import { Modal, Input, Table } from 'antd';
import StatusBadge from './StatusBadge';

const ArizalarTable = () => {
  const columns = [
  {
    title: 'Ism familiya',
    dataIndex: 'name',
  },
  {
    title: 'Telefon raqami',
    dataIndex: 'phoneNumber',
  },
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: 'Yuborilgan sana',
    dataIndex: 'date',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    render: (status) => <StatusBadge status={status} />,
  },
  {
  title: "Action",
  dataIndex: "action",
  render: (_, record) => (
    <div className="flex gap-3 text-sm">
      <button
        onClick={() => handleCheck(record)}
        className="text-blue-600"
      >
        Tekshirish
      </button>

      {record.status !== "rejected" && (
        <button
          onClick={() => openRejectModal(record)}
          className="text-red-500"
        >
          Bekor qilish
        </button>
      )}
    </div>
  ),
}

];

const datas = [
  {
    key: "1",
    name: "Shahnoza Karimova",
    phoneNumber: "+998 99 444 55 66",
    id: "#123",
    date: "Jan 08, 2026",
    status: "pending",
  },
  {
    key: "2",
    name: "Farhodbek Sultonov",
    phoneNumber: "+998 99 444 55 66",
    id: "#124",
    date: "Jan 09, 2026",
    status: "approved",
  },
  {
    key: "3",
    name: "Azizbek Qodirov",
    phoneNumber: "+998 99 444 55 66",
    id: "#125",
    date: "Jan 10, 2026",
    status: "rejected",
  },
  {
    key: "4",
    name: "Azizbek Qodirov",
    phoneNumber: "+998 99 444 55 66",
    id: "#126",
    date: "Jan 10, 2026",
    status: "approved",
  },
  {
    key: "5",
    name: "G'aybulla Tursunov",
    phoneNumber: "+998 99 444 55 66",
    id: "#127",
    date: "Jan 10, 2026",
    status: "pending",
  },
  {
    key: "6",
    name: "Jasur Azizov",
    phoneNumber: "+998 99 444 55 66",
    id: "#128",
    date: "Jan 10, 2026",
    status: "pending",
  },
  {
    key: "7",
    name: "Akmal Yunusov",
    phoneNumber: "+998 99 444 55 66",
    id: "#129",
    date: "Jan 10, 2026",
    status: "rejected",
  },
  {
    key: "8",
    name: "Fayzulla Hamidov",
    phoneNumber: "+998 99 444 55 66",
    id: "#130",
    date: "Jan 10, 2026",
    status: "approved",
  },
  {
    key: "9",
    name: "Karim Hamidov",
    phoneNumber: "+998 99 444 55 66",
    id: "#131",
    date: "Jan 10, 2026",
    status: "pending",
  },
  {
    key: "10",
    name: "Fayzulla Ismoilov",
    phoneNumber: "+998 99 444 55 66",
    id: "#132",
    date: "Jan 10, 2026",
    status: "pending",
  },
  {
    key: "11",
    name: "Nodir Ochilov",
    phoneNumber: "+998 99 444 55 66",
    id: "#133",
    date: "Jan 10, 2026",
    status: "rejected",
  },
];

  const [open, setOpen] = useState(false);
   const [data, setData] = useState(datas);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [reason, setReason] = useState("");


  const handleCheck = (record) => {
    setSelectedRow(record);
    setOpen(true);
  };

  const openRejectModal = (record) => {
    setSelectedRow(record);
    setRejectModalOpen(true);
  };

  const submitReject = () => {
  setData(prev =>
    prev.map(item =>
      item.key === selectedRow.key
        ? { ...item, status: "rejected", rejectReason: reason }
        : item
    )
  );

  setRejectModalOpen(false);
  setReason("");
  setSelectedRow(null);
};


  
  return <>
    <div className="bg-white rounded-xl border border-gray-100">
      <div className="flex items-center gap-3 px-6 py-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Arizalar
        </h2>

        <span className="text-sm text-blue-600 font-medium">
          {data.length}
        </span>
      </div>

      <Table className='custom-table' columns={columns} dataSource={datas} size="middle" />
    </div>
    <Modal
  open={open}
  onCancel={() => setOpen(false)}
  footer={null}
  width={520}
  title={`#${selectedRow?.id} arizani tekshirish`}
>
  {selectedRow && (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-gray-500">Telefon raqami</label>
          <Input value={selectedRow.phoneNumber} disabled />
        </div>

        <div>
          <label className="text-xs text-gray-500">Holati</label>
          <Input
            value={
              selectedRow.status === "pending"
                ? "Kutilmoqda"
                : selectedRow.status === "approved"
                ? "Ruxsat berilgan"
                : "Rad etilgan"
            }
            disabled
          />
        </div>

        <div>
          <label className="text-xs text-gray-500">Yuborilgan sana</label>
          <Input value={selectedRow.date} disabled />
        </div>
      </div>

      <div>
        <p className="font-medium mb-2">Hujjatlar [5]</p>

        <div className="space-y-2 text-sm">
          {[
            "Passport fotosurati (oldi va orqasi)",
            "Diplom",
            "O‘z-o‘zini band qilish",
            "Sertifikat",
            "Tibbiy varaqa",
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between border rounded-md px-3 py-2"
            >
              <span>{item}</span>
              <button className="text-blue-600">Ko‘rish</button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <button
          onClick={() => setOpen(false)}
          className="px-4 py-2 border rounded-md"
        >
          Orqaga
        </button>

        <button className="px-4 py-2 bg-red-500 text-white rounded-md">
          Arizani bekor qilish
        </button>

        <button className="px-4 py-2 bg-blue-600 text-white rounded-md">
          Tasdiqlash
        </button>
      </div>
    </div>
  )}
</Modal>
<Modal
  open={rejectModalOpen}
  onCancel={() => setRejectModalOpen(false)}
  footer={null}
  title="Arizani bekor qilish"
>
  <div className="space-y-4">
    <div>
      <label className="text-sm font-medium">
        Bekor qilish sabablari
      </label>
      <Input
        placeholder="Sababni kiriting"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
      />
    </div>

    <div className="flex justify-end gap-3 pt-4">
      <button
        onClick={() => setRejectModalOpen(false)}
        className="px-4 py-2 border rounded-lg"
      >
        Ortga
      </button>

      <button
        onClick={submitReject}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        disabled={!reason}
      >
        Yuborish
      </button>
    </div>
  </div>
</Modal>


  </>
};
export default ArizalarTable;