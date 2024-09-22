import { useState, useRef } from "react";
import { ProposalBlock } from "../proposalBlock";
import { providerHandler, propose } from "@/app/config/contractInteraction";
import { useAccount } from "wagmi/dist/types/exports";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ResearcherSection() {
	const [inputFund, setInputFund] = useState(0);
	const [file, setFile] = useState<File | null>(null);
	const [url, setUrl] = useState("");
	const [uploading, setUploading] = useState(false);
	const inputFile = useRef<HTMLInputElement | null>(null);

	const handlePropose = async () => {
		await providerHandler();
		await propose(inputFund);
	};

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
		<>
			<div className="w-[30rem] p-4 shadow-lg rounded-md bg-gray-100">
				<ToastContainer
					position="top-center"
					autoClose={3000}
					hideProgressBar
					closeOnClick
					pauseOnHover
				/>
				<div className="mb-4">
					<h2 className="text-2xl font-semibold mb-4">
						Upload File
					</h2>
					<div className="mb-4">
						<input
							type="file"
							ref={inputFile}
							onChange={handleChange}
							className="border p-2 rounded-md mb-2 w-full"
						/>
						<button
							className={`w-full bg-blue-500 text-white p-2 rounded-md transition-opacity ${
								uploading
									? "opacity-50 cursor-not-allowed"
									: "hover:bg-blue-600"
							}`}
							disabled={uploading}
							onClick={uploadFile}>
							{uploading ? "Uploading..." : "Upload PDF"}
						</button>
						{url && (
							<a
								href={url}
								className="block underline text-blue-600 mt-2"
								target="_blank"
								rel="noopener noreferrer">
								View Uploaded PDF
							</a>
						)}
					</div>
				</div>

				<div className="mb-4">
					<h2 className="text-xl font-semibold mb-2">
						Fund Proposal
					</h2>
					<input
						type="number"
						id="fund"
						value={inputFund}
						onChange={(e: any) =>
							setInputFund(e.target.value)
						}
						className="border w-full rounded p-2 mb-2"
						placeholder="Enter fund amount"
					/>
				</div>

				<button
					className="w-full bg-cyan-600 text-white p-2 rounded-lg transition-colors hover:bg-cyan-700"
					onClick={handlePropose}>
					Submit
				</button>
			</div>
		</>
	);
}

export default ResearcherSection;
