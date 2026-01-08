function SuccessModal({ open }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white px-6 py-4 rounded-xl shadow-lg">
        <p className="text-sm font-medium text-gray-800">
          Ma'lumotlar muvaffaqiyatli saqlandi
        </p>
      </div>
    </div>
  );
}

export default SuccessModal;
