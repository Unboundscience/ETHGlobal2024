"use client";

const SelectRole: React.FC = () => {
  const handleSelectRole = (role: string) => {
    alert(`You selected ${role}`);
    // router.push(`/dashboard/${role}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center  text-white font-retro px-4">
      <h1 className="text-6xl mb-6">Choose Your Role</h1>
      <div className="flex space-x-4">
        <button
          className="mt-4 py-2 px-4 bg-green-600 hover:bg-green-700 text-black rounded-lg transition duration-300 retro-button"
          onClick={() => handleSelectRole("Researcher")}
        >
          Researcher
        </button>
        <button
          className="mt-4 py-2 px-4 bg-yellow-600 hover:bg-yellow-700 text-black rounded-lg transition duration-300 retro-button"
          onClick={() => handleSelectRole("Donor")}
        >
          Donor
        </button>
      </div>
    </div>
  );
};

export default SelectRole;
