function Documents({ doctor }) {
  return (
    <div className="space-y-4">
      {doctor.documents.map((doc) => (
        <div
          key={doc.id}
          className="flex items-center justify-between border border-gray-200 rounded-lg p-4"
        >
          <div className="flex items-center gap-3">
            <span className="text-blue-600">📄</span>
            <p className="text-sm font-medium">{doc.name}</p>
          </div>

          <div className="flex items-center gap-4">
            <button className="text-blue-600">👁</button>
            <button className="text-red-500">🗑</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Documents;
