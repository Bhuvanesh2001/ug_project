import ReactWebcam from "react-webcam";
import React, { useState } from "react";

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

export default function Webcam({ setCapturedImage, type = "landscape" }) {
  const [facingMode, setFacingMode] = useState("user"); // Default to front camera

  return (
    <div className="webcam flex flex-col items-center gap-5">
      <ReactWebcam
        mirrored={facingMode === "user"} // Mirror the front camera
        screenshotFormat="image/jpeg"
        screenshotQuality={1}
        videoConstraints={{
          facingMode: facingMode, // Use the state to toggle between cameras
          ...aspectRatios[type],
        }}
        className="rounded shadow-lg"
      >
        {({ getScreenshot }) => (
          <button
            className="capture-btn bg-blue-500 w-fit text-white py-2 px-4 rounded hover:bg-blue-600"
            onClick={() => {
              const imageSrc = getScreenshot();
              setCapturedImage(imageSrc);
            }}
          >
            Capture photo
          </button>
        )}
      </ReactWebcam>
      {/* Toggle Camera Button */}
      <button
        className="bg-gray-500 w-fit text-white py-2 px-4 rounded hover:bg-gray-600"
        onClick={() =>
          setFacingMode((prev) => (prev === "user" ? "environment" : "user"))
        }
      >
        Toggle Camera
      </button>
    </div>
  );
}
