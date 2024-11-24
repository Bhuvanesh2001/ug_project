import React, { useState } from "react";
import ReactWebcam from "react-webcam";

const aspectRatios = {
  landscape: {
    width: 1920,
    height: 1080,
  },
  portrait: {
    height: 1920,
    width: 1080,
  },
};

const Webcam = ({ setCapturedImage, type = "landscape" }) => {
  const [facingMode, setFacingMode] = useState("user"); // Default to front camera

  return (
    <div className="webcam flex flex-col items-center">
      <ReactWebcam
        mirrored={facingMode === "user"} // Mirror the front camera
        screenshotFormat="image/jpeg"
        screenshotQuality={1}
        videoConstraints={{
          facingMode: facingMode, // Use the state to toggle between cameras
          ...aspectRatios[type],
        }}
        className="rounded shadow-lg"
      />
      <div className="flex space-x-4 mt-4">
        {/* Capture Button */}
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          onClick={() => {
            const webcamRef = document.querySelector("video");
            const imageSrc = webcamRef.getAttribute("src"); // Captures the image
            setCapturedImage(imageSrc || "");
          }}
        >
          Capture Photo
        </button>

        {/* Toggle Camera Button */}
        <button
          className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
          onClick={() =>
            setFacingMode((prev) => (prev === "user" ? "environment" : "user"))
          }
        >
          Toggle Camera
        </button>
      </div>
    </div>
  );
};

export default Webcam;
