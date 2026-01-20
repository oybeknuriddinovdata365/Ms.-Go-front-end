import { useState } from "react"
import { Modal } from "antd"
import { Eye, Trash2, Image as ImageIcon } from "lucide-react"

function Document({
  title = "Passport fotosurati (oldi va orqasi)",
  fileName = "PASSPORTIM2FAF-SD42-DAD.png",
  imageUrl = "https://picsum.photos/600/400",
  onDelete,
}) {
  const [previewOpen, setPreviewOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)

  return (
    <div className="m-1">
      {/* Title */}
      <p className="text-sm text-[#62626E] mb-1 font-medium">{title}</p>

      {/* Card */}
      <div className="flex items-center gap-6 rounded-lg pr-4 py-3 bg-white">
        {/* Left */}
        <div className="flex items-center gap-3">
          <ImageIcon className="text-blue-600" size={22} />
          <span className="font-bold text-[#1F1F24] truncate max-w-[260px]">
            {fileName}
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPreviewOpen(true)}
            className="text-blue-600 hover:opacity-80"
          >
            <Eye size={20} />
          </button>

          <button
            onClick={() => setConfirmOpen(true)}
            className="text-red-500 hover:opacity-80"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>

      {/* Preview modal */}
      <Modal
        open={previewOpen}
        footer={null}
        onCancel={() => setPreviewOpen(false)}
        width={800}
      >
        <img
          src={imageUrl}
          alt={fileName}
          className="w-full rounded-lg"
        />
      </Modal>

      {/* Confirm delete modal */}
      <Modal
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        footer={null}
        title="Faylni o‘chirish"
      >
        <p className="text-sm text-gray-600 mb-6">
          Ushbu faylni o'chirishni tasdiqlaysizmi?
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={() => setConfirmOpen(false)}
            className="px-4 py-2 border rounded-md"
          >
            Bekor qilish
          </button>

          <button
            onClick={() => {
              onDelete?.()
              setConfirmOpen(false)
            }}
            className="px-4 py-2 bg-red-500 text-white rounded-md"
          >
            O'chirish
          </button>
        </div>
      </Modal>
    </div>
  )
}

export default Document
