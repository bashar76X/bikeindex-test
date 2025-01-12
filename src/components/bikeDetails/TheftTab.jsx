const TheftTab = ({ stolenRecord }) => {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800">Theft Information</h2>
      <p className="mt-2 text-gray-600">
        <strong>Location:</strong> {stolenRecord?.location}
      </p>
      <p className="mt-2 text-gray-600">
        <strong>Description:</strong> {stolenRecord?.theft_description}
      </p>
      <p className="mt-2 text-gray-600">
        <strong>Police Report:</strong> {stolenRecord?.police_report_number} (
        {stolenRecord?.police_report_department})
      </p>
    </div>
  );
};

export default TheftTab;
