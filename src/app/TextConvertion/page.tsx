"use client";
import {
    Block,
    DetectDocumentTextCommand,
    TextractClient,
} from "@aws-sdk/client-textract";
import { Buffer } from "buffer";
import { useState } from "react";
import UploadImage from "../../components/UploadImage";
import Webcam from "../../components/Webcam";

// Required for Buffer in the browser
globalThis.Buffer = Buffer;

function App() {
    const [capturedImage, setCapturedImage] = useState<string>(); // Store image data as Base64
    const [data, setData] = useState<Block[]>([]); // Store OCR results

    const onRunOCR = async () => {
        if (!capturedImage) {
            alert("No image captured to process!");
            return;
        }

        const client = new TextractClient({
            region: process.env.NEXT_PUBLIC_AWS_REGION as string, // Replace with your AWS region
            credentials: {
                accessKeyId: process.env
                    .NEXT_PUBLIC_AWS_ACCESS_KEY_ID as string, // Replace with your AWS Access Key
                secretAccessKey: process.env
                    .NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY as string, // Replace with your AWS Secret Key
            },
        });
        console.log(JSON.stringify(client, null, 2), "AA");
        // Convert the captured image (Base64) to byte Uint8Array
        const blob = Buffer.from(
            capturedImage?.toString().split(",")[1],
            "base64"
        );

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
    };
    console.log(data, "data");
    return (
        <div className="App">
            <div className="container">
                {!capturedImage && (
                    <Webcam
                        type="landscape"
                        setCapturedImage={setCapturedImage}
                    />
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
                    <>
                        <button onClick={onRunOCR} style={{ margin: "10px" }}>
                            Run OCR
                        </button>
                        <button
                            onClick={() => setCapturedImage(undefined)}
                            style={{ margin: "10px" }}
                        >
                            Retake Image
                        </button>
                    </>
                )}
                <div>
                    {data?.map((item, index) => (
                        <span
                            key={index}
                            style={{ margin: "2px", padding: "2px" }}
                        >
                            {item.Text}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;