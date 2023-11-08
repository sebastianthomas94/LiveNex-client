import React, { useEffect, useState } from "react";
import { useDeleteUserMutation, useGetUsersMutation } from "../../slices/userApiSlice";

const Dashboard = () => {
  const [getUsers] = useGetUsersMutation();
  const [users, setUsers] = useState([]);
  const [deleteUser] = useDeleteUserMutation();

  useEffect(() => {
    getUsers()
      .unwrap()
      .then((res) => {
        const transformedUsersData = res.map(transformUserData);
        setUsers(transformedUsersData);
      })
      .catch((e) => console.log(e));
  }, []);

  const transformUserData = (userData) => {
    console.log(userData);
    const {
      _id,
      name,
      youtube,
      createdAt,
      updatedAt,
      twitch,
      facebook,
      razorpayDetails,
    } = userData;

    let platform = [];
    if (youtube) platform.push("youtube");
    if (twitch) platform.push("twitch");
    if (facebook) platform.push("facebook");
    let sub;
    if (razorpayDetails) sub = "Basic";
    else sub = "No Plan";
    let formattedDate;
    if (razorpayDetails?.endDate) {
      const isoDateString = razorpayDetails?.endDate;
      const date = new Date(isoDateString);

      formattedDate = date.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    } else formattedDate = "";

    console.log(formattedDate); // Output: 12/05/2023

    const user = {
      id: _id,
      name: name || "Unknown Name",
      subscription: sub,
      validity: formattedDate,
      platforms: platform,
      blocked: false,
    };

    return user;
  };



  const deleteUserHandle = (userId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    deleteUser(userId).unwrap()
    // Make an API call to delete the user from the server
  };

  return (
    <div className="max-w-4xl mx-auto mt-4 p-4 rounded-lg shadow-md">
      <table className="w-full rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-4">Serial No</th>
            <th className="p-4">Username</th>
            <th className="p-4">Subscription Plan</th>
            <th className="p-4">Validity</th>
            <th className="p-4">Platform</th>
            <th className="p-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => (
            <tr key={user.id} className="text-left">
              <td className="p-4">{i + 1}</td>
              <td className="p-4">{user.name}</td>
              <td className="p-4">
                <span
                  className={`p-2 bg-${
                    user.subscription === "Basic" ? "green" : "blue"
                  }-100 text-xs rounded-lg`}
                >
                  {user.subscription}
                </span>
              </td>
              <td className="p-4">{user.validity}</td>
              <td className="p-4">
                <div className="flex items-center">
                  {user.platforms.includes("twitch") && (
                    <i className="fa fa-twitch text-purple-500 mr-2"></i>
                  )}
                  {user.platforms.includes("facebook") && (
                    <i className="fa fa-facebook text-blue-500 mr-2"></i>
                  )}
                  {user.platforms.includes("youtube") && (
                    <i className="fa fa-youtube text-red-500 mr-2"></i>
                  )}
                </div>
              </td>
              <td className="p-4">
                <button
                  onClick={() => deleteUserHandle(user.id)}
                  className="px-4 py-2 bg-red-500 rounded text-white"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
