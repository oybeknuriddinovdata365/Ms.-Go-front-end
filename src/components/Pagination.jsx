import React from "react";

function Pagination({ currentPage, totalPages, onChange }) {

  function getPages(current, total) {
    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    const pages = [1];

    if (current > 3) pages.push("...");

    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (current < total - 2) pages.push("...");

    pages.push(total);

    return pages;
  }

  const pages = getPages(currentPage, totalPages);

  return (
    <div className="flex items-center justify-between mt-6 bg-white p-4 rounded-xl shadow">
      <button
        disabled={currentPage === 1}
        onClick={() => onChange(currentPage - 1)}
        className="px-4 py-2 border rounded-lg disabled:opacity-50"
      >
        ← Previous
      </button>

      <div className="flex items-center gap-2">
        {pages.map((page, i) =>
          page === "..." ? (
            <span key={i} className="px-2 text-gray-400">
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onChange(page)}
              className={`w-9 h-9 rounded-lg text-sm
                ${
                  page === currentPage
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
            >
              {page}
            </button>
          )
        )}
      </div>

      <button
        disabled={currentPage === totalPages}
        onClick={() => onChange(currentPage + 1)}
        className="px-4 py-2 border rounded-lg disabled:opacity-50"
      >
        Next →
      </button>
    </div>
  );
}

export default Pagination;
