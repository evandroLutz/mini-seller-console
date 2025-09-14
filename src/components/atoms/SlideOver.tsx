import { JSX, useState } from "react";
import { useSelectedLead } from "../../contexts/SelectedLeadContext";
import { XIcon, Edit, Calendar } from "lucide-react";

function SlideOver(): JSX.Element {
  const { selectedLead, setSelectedLead } = useSelectedLead();

  const [isEditing, setIsEditing] = useState<boolean>(false);

  const reset = () => {
    setIsEditing(false);
    setSelectedLead(null)
  }

  return (
    <div
      className={`fixed inset-0 flex justify-end transition ${
        selectedLead ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-300 ${
          selectedLead ? "opacity-30" : "opacity-0"
        }`}
        onClick={() => reset()}
      />

      <div
        className={`relative bg-slate-800 text-gray-100 shadow-2xl h-full p-6 transform transition-transform duration-300 
        w-full sm:max-w-md md:w-96 
        ${selectedLead ? "translate-x-0" : "translate-x-full"}`}
      >
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          onClick={() => reset()}
        >
          <XIcon className="h-6 w-6" />
        </button>

        {selectedLead && (
          <>
            <h2 className="text-2xl font-bold mb-6">{selectedLead.name}</h2>
            <p className="mb-2">
              <span className="font-semibold">Company:</span> {selectedLead.company}
            </p>
            {
                isEditing ? null : 
                <p onClick={() => setIsEditing(true)}className="cursor-pointer mb-2">
                    <span className="font-semibold">Email:</span> {selectedLead.email}
                    <Edit className="h-6 w-6" />
                </p>
            }
            <p className="mb-2">
              <span className="font-semibold">Status:</span> {selectedLead.status}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Score:</span> {selectedLead.score}
            </p>
            <p className="text-sm text-gray-400">
              Created: {selectedLead.createdAt.toLocaleDateString()} <br />
              <Calendar className="h-6 w-6" />
              Last Updated: {selectedLead.updatedAt.toLocaleDateString()}
              <Calendar className="h-6 w-6" />
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default SlideOver;
