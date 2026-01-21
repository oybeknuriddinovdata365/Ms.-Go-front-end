import { useEffect, useState, useRef } from "react";

export default function LogoutModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("openLogout", handler);

    return () => window.removeEventListener("openLogout", handler);
  }, []);

  if (!open) return null;

  function doLogout() {
    localStorage.removeItem("accessToken");
    window.location.href = "/login";
  }

  return (
    <div className="fixed inset-0 backdrop-blur-xs backdrop-brightness-75 bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-[380px]">
        <h2 className="text-lg font-semibold mb-3">Chiqishni tasdiqlang</h2>
        <p className="text-gray-600 mb-6">
          Haqiqatan ham profilingizdan chiqmoqchimisiz?
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={() => setOpen(false)}
            className="px-4 py-2 bg-gray-200 rounded-lg cursor-pointer"
          >
            Bekor qilish
          </button>

          <button
            onClick={doLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg cursor-pointer"
          >
            Chiqish
          </button>
        </div>
      </div>
    </div>
  );
}
