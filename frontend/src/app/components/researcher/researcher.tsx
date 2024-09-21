"use client";

import { useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Researcher = () => {
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const inputFile = useRef<HTMLInputElement | null>(null);

  const uploadFile = async () => {
    if (!file) {
      toast.error("Please select a file first.", {
        style: { backgroundColor: "yellow", color: "black" },
      });
      return;
    }

    try {
      setUploading(true);
      const data = new FormData();
      data.set("file", file);
      const uploadRequest = await fetch("/api/files", {
        method: "POST",
        body: data,
      });

      const signedUrl = await uploadRequest.json();
      setUrl(signedUrl);

      setUploading(false);
      toast.success("PDF uploaded successfully!", {
        style: { backgroundColor: "yellow", color: "green" },
      });
    } catch (e) {
      console.log(e);
      setUploading(false);
      toast.error("There was an error uploading the file.", {
        style: { backgroundColor: "yellow", color: "black" },
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <main className="max-w-[500px] min-h-screen m-auto flex flex-col gap-4 justify-center items-center">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        closeOnClick
        pauseOnHover
      />
      <input
        type="file"
        ref={inputFile}
        onChange={handleChange}
        className="border p-2 rounded-md"
      />
      <button
        className={`bg-blue-500 text-white p-2 rounded-md ${
          uploading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={uploading}
        onClick={uploadFile}
      >
        {uploading ? "Uploading..." : "Upload PDF"}
      </button>
      {url && (
        <a
          href={url}
          className="underline text-blue-600 mt-4"
          target="_blank"
          rel="noopener noreferrer"
        >
          View Uploaded PDF
        </a>
      )}
    </main>
  );
};

export default Researcher;
