function DoctorInfo({ doctor }) {
  return (
    <div className="space-y-3 text-sm">
      <p>
        <span className="font-medium">Mutaxassisligi:</span> {doctor.role}
      </p>
      <p>
        <span className="font-medium">Telefon:</span> {doctor.phone}
      </p>
      <p>
        <span className="font-medium">Tajriba:</span> {doctor.experience} yil
      </p>
      <p>
        <span className="font-medium">Bio:</span> {doctor.bio}
      </p>
    </div>
  );
}

export default DoctorInfo;
