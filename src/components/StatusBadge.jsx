function StatusBadge({ status }) {
  const config = {
    pending: {
      label: "Kutilmoqda",
      bg: "bg-yellow-50",
      text: "text-yellow-700",
      dot: "bg-yellow-400",
    },
    approved: {
      label: "Muvaffaqiyatli",
      bg: "bg-green-50",
      text: "text-green-700",
      dot: "bg-green-500",
    },
    rejected: {
      label: "Bekor qilingan",
      bg: "bg-red-50",
      text: "text-red-600",
      dot: "bg-red-500",
    },
  };

  const { label, bg, text, dot } = config[status];

  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${bg} ${text}`}
    >
      <span className={`w-2 h-2 rounded-full ${dot}`}></span>
      {label}
    </span>
  );
}

export default StatusBadge;
