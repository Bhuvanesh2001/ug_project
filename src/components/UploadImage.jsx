import { useState } from "react";
// import { upload } from "../helpers/upload"

export default function UploadImage({ capturedImage, setCapturedImage }) {
  const [uploading, setUploading] = useState(false);

  const uploadImage = async () => {
    setUploading(true);
    await upload(capturedImage, onUpload);
    setUploading(false);
  };

  return (
    <div className={`${!capturedImage && "no-capture"} preview`}>
      <img src={capturedImage} />
      <div className="actions flex justify-center mt-10 gap-10">
        <button
          onClick={uploadImage}
          className="upload-btn capture-btn bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          disabled={uploading}
        >
          Upload
        </button>
        <button
          onClick={() => setCapturedImage(null)}
          className="retake-btn bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
        >
          Retake
        </button>
      </div>
      {uploading && <span className="uploading-text">Uploading...</span>}
    </div>
  );
}
