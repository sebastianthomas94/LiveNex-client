import React, { useEffect } from "react";
import { io } from "socket.io-client";

const Broadcasting = () => {
  useEffect(() => {
    const youtube_rtmp = localStorage.getItem("youtube_rtmp");
    const facebook_rtmp = localStorage.getItem("facebook_rtmp");
    const twitch_rtmp = localStorage.getItem("twitch_rtmp");
    const YT_liveChatId = localStorage.getItem("YT_liveChatId");
    const facebook_liveVideoId = localStorage.getItem("facebook_liveVideoId");
    const facebook_accesstoken = localStorage.getItem("facebook_accesstoken");
    const fileName = localStorage.getItem("fileName");

    const socket = io("http://localhost:8200", {
      transports: ["websocket"],
      query: {
        youtube_rtmp,
        facebook_rtmp,
        twitch_rtmp,
        YT_liveChatId,
        facebook_liveVideoId,
        facebook_accesstoken,
        broadcast: true,
        fileName
      },
      withCredentials: true,
    });
  }, []);
  return (
    <div className="bg-gray-900 h-screen flex items-center justify-center">
      <div className="text-white text-3xl font-bold">Broadcasting Live!</div>
      <div className="mt-4">
        <div className="rounded-full h-3 w-3 bg-red-500 inline-block m-1 animate-bounce"></div>
        <div className="rounded-full h-3 w-3 bg-yellow-500 inline-block m-1 animate-bounce"></div>
        <div className="rounded-full h-3 w-3 bg-green-500 inline-block m-1 animate-bounce"></div>
      </div>
    </div>
  );
};

export default Broadcasting;
