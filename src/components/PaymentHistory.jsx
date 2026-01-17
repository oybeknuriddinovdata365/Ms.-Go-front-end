import { Table } from "antd"
import StatusBadge from "./StatusBadge"

const PaymentsHistory = () => {
  const columns = [
    {
      title: "Xizmat turi",
      dataIndex: "service",
      render: text => (
        <span className="font-medium text-sm text-gray-900">{text}</span>
      ),
    },
    {
      title: "Qo'shilgan sana",
      dataIndex: "date",
      render: date => (
        <div className="text-gray-600">
          <div>{date.split(" ")[0]}</div>
          <div className="text-sm">{date.split(" ")[1]}</div>
        </div>
      ),
    },
    {
      title: "Summasi",
      dataIndex: "amount",
      render: amount => (
        <span className="text-gray-700">{amount} UZS</span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: status => <StatusBadge status={status} />,
    },
  ]

  const data = [
    {
      key: "1",
      service: "Konsultatsiya",
      date: "25.07.2025 15:29:51",
      amount: "50 000",
      status: "approved",
    },
    {
      key: "2",
      service: "Uyga chaqirish",
      date: "25.07.2025 15:29:51",
      amount: "150 000",
      status: "rejected",
    },
    {
      key: "3",
      service: "Shifoxonaga borish",
      date: "25.07.2025 15:29:51",
      amount: "150 000",
      status: "approved",
    },
  ]

  return (
    <div className="bg-white rounded-xl shadow-sm border  border-gray-200 overflow-hidden">
      <div className="px-6 py-4">
        <h2 className="text-lg font-bold">To'lovlar tarixi</h2>
      </div>

      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        className="payment-table w-full"
      />
    </div>
  )
}

export default PaymentsHistory
