function DonorSection() {
  const handleMint = () => {
    console.log("Mint");
  };

  return (
    <>
      <div className="w-[40rem] flex flex-col justify-center">
        <button
          className="p-2 bg-cyan-600 rounded-lg m-4 "
          onClick={handleMint}
        >
          <span className="text-white">Mint</span>
        </button>
      </div>
    </>
  );
}

export default DonorSection;
