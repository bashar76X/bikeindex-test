import { useState } from "react";
import TheftTab from "./TheftTab";
import DetailsTab from "./DetailsTab";
import ImagesTab from "./ImagesTab";

const Tabs = ({ bike }) => {
  const [activeTab, setActiveTab] = useState("details");

  const tabs = [
    { id: "details", label: "Details" },
    { id: "theft", label: "Theft Info" },
    { id: "images", label: "Images" },
  ];

  return (
    <div>
      <div className="flex border-b">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === tab.id
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-4">
        {activeTab === "details" && <DetailsTab bike={bike} />}
        {activeTab === "theft" && (
          <TheftTab stolenRecord={bike?.stolen_record} />
        )}
        {activeTab === "images" && <ImagesTab images={bike?.public_images} />}
      </div>
    </div>
  );
};

export default Tabs;
