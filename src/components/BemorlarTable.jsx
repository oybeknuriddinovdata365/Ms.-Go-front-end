import React from "react";
import { Table, Avatar } from "antd";
import { Trash2, Pencil } from "lucide-react";
import { patientData } from "../utils/patientData";
import { useNavigate } from "react-router-dom";


const BemorlarTable = () => {
  const navigate = useNavigate();

  const columns = [
    {
      title: "Ism familiya",
      dataIndex: "name",
      render: (text, record) => (
        <div className="flex items-center gap-3">
          <Avatar src={record.avatar} />
          <span className="font-medium text-gray-900">{text}</span>
        </div>
      ),
    },
    {
      title: "Telefon raqami",
      dataIndex: "phone",
    },
    {
      title: "ID",
      dataIndex: "id",
      render: (id) => <span className="text-gray-500">{id}</span>,
    },
    {
      title: "Qo'shilgan sanasi",
      dataIndex: "createdAt",
    },
    {
      title: "Jinsi",
      dataIndex: "gender",
    },
    {
      title: "Yoshi",
      dataIndex: "age",
    },
    {
      title: "Amallar",
      render: (_, record) => (
        <div className="flex gap-3">
          <button className="text-red-500">
            <Trash2 size={18} />
          </button>

          <button
            onClick={() => navigate(`/bemorlar/${record.id}`)}
            className="text-blue-600"
          >
            <Pencil size={18} />
          </button>
        </div>
      ),
    }

  ];

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
      <div className="flex items-center gap-3 px-6 py-4">
        <h2 className="text-lg font-semibold text-gray-900">Bemorlar</h2>
        <span className="text-sm text-blue-600 font-medium">
          {patientData.length} users
        </span>
      </div>

      <Table
        className="custom-table"
        columns={columns}
        dataSource={patientData}
        pagination={false}
      />
    </div>
  );
};

export default BemorlarTable;
