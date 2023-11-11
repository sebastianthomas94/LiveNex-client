import { useEffect, useState } from "react";
import CreateLive from "../components/CreateLive";
import { useGetPastLivesMutation } from "../slices/userApiSlice";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("past");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pastLives, setPastLives] = useState([]);

  const [getPastLives] = useGetPastLivesMutation();

  // Function to toggle the modal state
  const toggleModal = () => {
    localStorage.removeItem("youtube_rtmp");
    localStorage.removeItem("facebook_rtmp");
    localStorage.removeItem("twitch_rtmp");
    localStorage.removeItem("fileName");
    localStorage.removeItem("youtubeLiveUrl");
    setIsModalOpen(!isModalOpen);
  };

  // Dummy data for upcoming and past live streams

  useEffect(() => {
    getPastLives()
      .unwrap()
      .then((res) => {
        // console.log(res);
        setPastLives(res);
      })
      .catch((e) => {
        console.log("error at getting pastlives: ", e);
      });
  }, []);

  return (
    <div>
      {/* "Create Live" button */}
      <button
        className="bg-blue-500 text-white font-semibold my-5 px-4 py-2 rounded-full hover:bg-blue-600 transition duration-200 mt-4"
        onClick={toggleModal}
      >
        Create Live
      </button>
      <h2 className="text-2xl font-semibold mb-4">Streams and Recordings</h2>

      {/* Tabs for "Upcoming" and "Past" */}
      <div className="mb-4">
        {/* <button
          onClick={() => setActiveTab("upcoming")}
          className={`mr-4 ${
            activeTab === "upcoming" ? "text-blue-500" : "text-gray-500"
          } hover:text-blue-600`}
        >
          Upcoming
        </button> */}
        {/* <button
          onClick={() => setActiveTab("past")}
          className={`${
            activeTab === "past" ? "text-blue-500" : "text-gray-500"
          } hover:text-blue-600`}
        >
          Past Lives
        </button> */}
      </div>

      {/* Content based on the selected tab */}
      {activeTab === "upcoming" ? (
        <div>
          <h3 className="text-lg font-semibold mb-2">Upcoming Lives</h3>
          <ul>{}</ul>
        </div>
      ) : (
        <div>
          <h3 className="text-lg font-semibold mb-2">Past Lives</h3>

          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Destinations</h2>
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-100">Destination</th>
                  <th className="px-6 py-3 bg-gray-100">Title</th>
                  <th className="px-6 py-3 bg-gray-100">Link</th>
                  <th className="px-6 py-3 bg-gray-100">Start Time</th>
                  <th className="px-6 py-3 bg-gray-100">Broadcast Or Live</th>
                </tr>
              </thead>
              <tbody>
                {pastLives.map((live, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <td className="px-6 py-4">
                      {live.destinations.map((dest, i) => {
                        if (dest === "youtube")
                          return <i className="fa fa-youtube mr-2" />;
                        if (dest === "facebook")
                          return <i className="fa fa-facebook mr-2" />;
                        if (dest === "twitch")
                          return <i className="fa fa-twitch mr-2" />;
                      })}
                    </td>
                    <td className="px-6 py-4">{live.title}</td>
                    <td className="px-6 py-4">
                      {live.youtubeLiveUrl && (
                        <a
                          href={live.youtubeLiveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i
                            className="fa fa-youtube-play"
                            aria-hidden="true"
                          ></i>
                        </a>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {new Date(live.startTime).toLocaleDateString("en-GB")}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-block py-1 px-2 uppercase rounded font-semibold text-xs ${
                          live.broadcast
                            ? "bg-blue-500 text-white"
                            : "bg-green-500 text-gray-100"
                        }`}
                      >
                        {live.broadcast ? "Broadcast" : "Live"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <CreateLive isOpen={isModalOpen} onClose={toggleModal} />
    </div>
  );
}
