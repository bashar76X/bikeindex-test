const DetailsTab = ({ bike }) => {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800">Bike Details</h2>
      <p className="mt-2 text-gray-600">
        <strong>Manufacturer:</strong> {bike?.manufacturer_name}
      </p>
      <p className="mt-2 text-gray-600">
        <strong>Frame Model:</strong> {bike?.frame_model}
      </p>
      <p className="mt-2 text-gray-600">
        <strong>Frame Colors:</strong> {bike?.frame_colors.join(", ")}
      </p>
      <p className="mt-2 text-gray-600">
        <strong>Description:</strong> {bike?.description}
      </p>
    </div>
  );
};

export default DetailsTab;
