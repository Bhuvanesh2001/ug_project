import { useState } from "react"; // eslint-disable-next-line @typescript-eslint/no-unused-vars
// import { upload } from "../helpers/upload";

export default function UploadImage({ capturedImage, setCapturedImage }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const [uploading, setUploading] = useState(false);

  // const uploadImage = async () => {
  //   setUploading(true);
  //   await upload(capturedImage, onUpload);
  //   setUploading(false);
  // };

  return (
    <div className={`${!capturedImage && "no-capture"} preview`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={capturedImage}
        className="w-[80%] pl-[200px] rounded-2xl shadow-xl h-[80%]"
        alt="captured photo"
      />
      {/* <div className="actions flex justify-center mt-10 gap-10">
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
      {uploading && <span className="uploading-text">Uploading...</span>} */}
    </div>
  );
}
