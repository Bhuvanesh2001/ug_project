import ReactWebcam from "react-webcam";
import Image from "next/image"; // Correct import
import React, { useState } from "react";
import captureIcon from "../../public/aperture.png"
import switchCamera from "../../public/switch-camera.png"

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
        className="rounded shadow-lg h-[80%]"
      >
        {({ getScreenshot }) => (
          <button
          className="capture-btn bg-blue-500 flex items-center gap-2 text-white py-2 px-4 rounded hover:bg-blue-600"
          onClick={() => {
            const imageSrc = getScreenshot();
            setCapturedImage(imageSrc);
          }}
        >
          <Image src={captureIcon} alt="Capture Icon" width={35} height={35} />
        </button>
        
        )}
      </ReactWebcam>
      {/* Toggle Camera Button */}
      <button
        className=" bg-blue-500 flex items-center gap-2 text-white py-1 px-3 rounded hover:bg-blue-600"
        onClick={() =>
          setFacingMode((prev) => (prev === "user" ? "environment" : "user"))
        }
      >
        <Image src={switchCamera} alt="Capture Icon" width={45} height={45} />
      </button>
    </div>
  );
}
