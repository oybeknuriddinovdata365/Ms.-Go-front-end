export default function PatientStatusBadge({ status }) {
  const map = {
    Jarayonda: {
      text: "Jarayonda",
      bg: "bg-yellow-100",
      textColor: "text-yellow-700",
      dot: "bg-yellow-500",
    },
    Yakunlangan: {
      text: "Yakunlangan",
      bg: "bg-green-100",
      textColor: "text-green-700",
      dot: "bg-green-500",
    },
    "Bekor qilingan": {
      text: "Bekor qilingan",
      bg: "bg-red-100",
      textColor: "text-red-700",
      dot: "bg-red-500",
    },
  }

  const s = map[status]

  if (!s) {
    return (
      <span className="text-xs text-gray-400">
        {status}
      </span>
    )
  }

  return (
    <div
      className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${s.bg} ${s.textColor}`}
    >
      <span className={`w-2 h-2 rounded-full ${s.dot}`} />
      {s.text}
    </div>
  )
}
