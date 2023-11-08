import React, { useEffect } from "react";
import LiveStream from "../components/LiveStream";
import Chat from "../components/Chat";
import { SharedProvider } from "../context/SharedContext.js"; //provider for go live button
import { useSetLiveDataMutation } from "../slices/userApiSlice";

export default function LiveStreamPage() {
  const [setLiveData] = useSetLiveDataMutation();
  useEffect(() => {
    let destinations = [];
    let broadcast;
    if (localStorage.getItem("youtube_rtmp")) destinations.push("youtube");
    if (localStorage.getItem("facebook_rtmp")) destinations.push("facebook");
    if (localStorage.getItem("twitch_rtmp")) destinations.push("twitch");
    if (localStorage.getItem("fileName")) broadcast = true;
    else broadcast = false;
    const title = localStorage.getItem("title");
    const startTime = new Date();
    const data = {
      startTime,
      title,
      destinations,
      broadcast,
    };
    console.log(data);
    setLiveData(data)
      .unwrap()
      .then((res) => {
        console.log("live data added");
      })
      .catch((e) => console.log(e.message));
  }, []);
  return (
    // Inside the LiveStream component
    <SharedProvider>
      <div className="flex">
        <div className="w-3/4">
          <LiveStream />
        </div>
        <div className="w-1/4">
          <Chat />
        </div>
      </div>
    </SharedProvider>
  );
}
