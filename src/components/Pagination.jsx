import React from "react"
import { Pagination as AntPagination } from "antd"

function Pagination({ currentPage, totalPages, onChange }) {
  return (
    <div className="flex justify-center mt-6 bg-white p-4 rounded-xl shadow-lg mb-2">
      <AntPagination
        current={currentPage}
        total={totalPages * 10}
        pageSize={10}
        onChange={(page) => onChange(page)}
        showSizeChanger={false}
      />
    </div>
  )
}

export default Pagination
