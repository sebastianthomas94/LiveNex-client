import React, { useState, useEffect } from "react";
import { useSharedContext } from "../context/SharedContext.js";
import { sendBySocket } from "../helpers/liveStreamSocket.js";
import io from "socket.io-client";

const LiveStream = () => {
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [stream, setStream] = useState(null);
  const videoRef = React.createRef();

  const { isLive } = useSharedContext();

  useEffect(() => {
    const startWebcam = async () => {
      try {
        const userMedia = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setStream(userMedia);

        if (videoRef.current) {
          videoRef.current.srcObject = userMedia;
        }
        if (isLive) {
          console.log("going live!");
          // sendBySocket(webCamFeed);
          const videoElement = document.getElementById("video");
          videoElement.srcObject = userMedia;
          const youtube_rtmp = localStorage.getItem("youtube_rtmp");
          const facebook_rtmp = localStorage.getItem("facebook_rtmp");
          const twitch_rtmp = localStorage.getItem("twitch_rtmp");
          const socket = io("http://localhost:8200", {
            transports: ["websocket"],
            query: { youtube_rtmp, facebook_rtmp, twitch_rtmp },
            withCredentials: true,
          });
          const mediaRecorder = new MediaRecorder(userMedia, {
            mimeType: "video/webm;codecs=h264",
            videoBitsPerSecond: 3 * 1024 * 1024,
          });
          mediaRecorder.ondataavailable = (e) => {
            console.log("sending chunks", e.data);
            socket.send(e.data);
          };
          mediaRecorder.start(1000);
        }
        // else {
        //   mediaRecorder.stop();
        // }
      } catch (error) {
        console.error("Error accessing webcam:", error);
      }
    };

    startWebcam();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isLive]);

  const toggleVideo = () => {
    if (stream) {
      stream.getVideoTracks()[0].enabled = !videoEnabled;
      setVideoEnabled(!videoEnabled);
    }
  };

  const toggleAudio = () => {
    if (stream) {
      stream.getAudioTracks()[0].enabled = !audioEnabled;
      setAudioEnabled(!audioEnabled);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="w-full max-w-screen-md mx-auto relative">
        <div className="relative bg-black aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            id="video"
            style={{ transform: "scaleX(-1)" }} // Apply the mirror effect here
            autoPlay
            playsInline
          />
          <div className="absolute bottom-4 left-0 right-0 flex justify-center">
            <button
              className={`${
                videoEnabled ? "bg-red-500" : "bg-green-500"
              } w-12 h-12 rounded-lg flex items-center justify-center text-white transition-colors duration-300`}
              onClick={toggleVideo}
            >
              <i
                className={`fa fa-${
                  videoEnabled ? "video-camera" : "video-camera-off"
                }`}
              />
            </button>
            <button
              className={`${
                audioEnabled ? "bg-red-500" : "bg-green-500"
              } w-12 h-12 rounded-lg flex items-center justify-center text-white transition-colors duration-300 ml-4`}
              onClick={toggleAudio}
            >
              <i
                className={`fa fa-${
                  audioEnabled ? "microphone" : "microphone-slash"
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveStream;
