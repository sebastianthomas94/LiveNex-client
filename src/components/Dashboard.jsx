import { useState } from "react";
import CreateLive from "../components/CreateLive";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to toggle the modal state
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Dummy data for upcoming and past live streams
  const upcomingStreams = [
    { id: 1, title: "Upcoming Stream 1", date: "2023-10-15" },
    { id: 2, title: "Upcoming Stream 2", date: "2023-10-20" },
  ];

  const pastStreams = [
    { id: 3, title: "Past Stream 1", date: "2023-10-10" },
    { id: 4, title: "Past Stream 2", date: "2023-10-05" },
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Streams and Recordings</h2>

      {/* Tabs for "Upcoming" and "Past" */}
      <div className="mb-4">
        <button
          onClick={() => setActiveTab("upcoming")}
          className={`mr-4 ${
            activeTab === "upcoming" ? "text-blue-500" : "text-gray-500"
          } hover:text-blue-600`}
        >
          Upcoming
        </button>
        <button
          onClick={() => setActiveTab("past")}
          className={`${
            activeTab === "past" ? "text-blue-500" : "text-gray-500"
          } hover:text-blue-600`}
        >
          Past
        </button>
      </div>

      {/* Content based on the selected tab */}
      {activeTab === "upcoming" ? (
        <div>
          <h3 className="text-lg font-semibold mb-2">Upcoming Lives</h3>
          <ul>
            {upcomingStreams.map((stream) => (
              <li key={stream.id}>{stream.title}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <h3 className="text-lg font-semibold mb-2">Past Lives</h3>
          <ul>
            {pastStreams.map((stream) => (
              <li key={stream.id}>{stream.title}</li>
            ))}
          </ul>
        </div>
      )}

      {/* "Create Live" button */}
      <button className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-full hover:bg-blue-600 transition duration-200 mt-4"
      onClick={toggleModal}>
        Create Live
      </button>
      <CreateLive isOpen={isModalOpen} onClose={toggleModal} />
    </div>
  );
}
