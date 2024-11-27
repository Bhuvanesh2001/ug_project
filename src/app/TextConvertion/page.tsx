"use client";
import {
  Block,
  DetectDocumentTextCommand,
  TextractClient,
} from "@aws-sdk/client-textract";
import Image from "next/image"; // Correct import
import { Buffer } from "buffer";
import { useState } from "react";
import UploadImage from "../../components/UploadImage";
import Webcam from "../../components/Webcam";
import playButton  from "../../../public/play.png"

// Required for Buffer in the browser
globalThis.Buffer = Buffer;

function App() {
  const [capturedImage, setCapturedImage] = useState<string>(); // Store image data as Base64
  const [data, setData] = useState<Block[]>([]); // Store OCR results
  const [loading, setLoading] = useState<boolean>(false);

  const onRunOCR = async () => {
    setLoading(true);
    if (!capturedImage) {
      alert("No image captured to process!");
      return;
    }

    const client = new TextractClient({
      region: process.env.NEXT_PUBLIC_AWS_REGION as string, // Replace with your AWS region
      credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID as string, // Replace with your AWS Access Key
        secretAccessKey: process.env
          .NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY as string, // Replace with your AWS Secret Key
      },
    });
    console.log(JSON.stringify(client, null, 2), "AA");
    // Convert the captured image (Base64) to byte Uint8Array
    const blob = Buffer.from(capturedImage?.toString().split(",")[1], "base64");

    const params = {
      Document: {
        Bytes: blob,
      },
      FeatureTypes: ["TABLES", "FORMS"], // Specify OCR feature types
    };

    const command = new DetectDocumentTextCommand(params);

    try {
      console.log(command, "command");

      const response = await client.send(command);
      console.log(response, "Res");

      if (response?.Blocks) {
        setData(response.Blocks);
      }
    } catch (error) {
      console.error("aa", error);
      alert("Failed to process OCR. Check console for details.");
    }
    setLoading(false);
  };
  console.log(data, "data");
  return (
    <div className="App flex flex-col items-center pl-[200px]">
      <div className="container">
        {!capturedImage && (
          <Webcam type="landscape" setCapturedImage={setCapturedImage} />
        )}
        {capturedImage && (
          <UploadImage
            capturedImage={capturedImage}
            setCapturedImage={setCapturedImage}
          />
        )}
      </div>

      <div>
        {capturedImage && (
          <div className="flex justify-center gap-10 mt-5">
            {loading ? (
              <div className="flex items-center justify-center mt-5">
                <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 border-solid"></div>
              </div>
            ) : (
              <button
                onClick={onRunOCR}
                className="text-white py-2 px-4 rounded hover:bg-blue-100"
              >
          <Image src={playButton} alt="Capture Icon" width={35} height={35} />
          </button>
            )}
            <button
              onClick={() => setCapturedImage(undefined)}
              className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
            >
              Retake Image
            </button>
          </div>
        )}
        <div className="text-lg p-5">
          Detected Text:
          {data?.map((item, index) => {
            if (item.BlockType === "LINE")
              return (
                <span key={index} style={{ margin: "2px", padding: "2px" }}>
                  {item.Text}
                </span>
              );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
