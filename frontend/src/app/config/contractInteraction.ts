import { ethers, utils } from "ethers";
import addresses from "./addresses.json";
import usdcOut from "../../../../backend/out/USDC.sol/USDC.json";
import governanceOut from "../../../../backend/out/GovernanceToken.sol/GovernanceToken.json";
import treasuryOut from "../../../../backend/out/Treasury.sol/Treasury.json";

let governanceContract;
// let usdcContract;
// let treasuryContract;

export const providerHandler = async () => {
  if (typeof window.ethereum === "undefined") {
    throw new Error("Ethereum provider not found. Please install MetaMask.");
  }

  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.listAccounts();

    if (!accounts.length) {
      throw new Error("No accounts found. Please connect a wallet.");
    }

    const address = accounts[0];
    const signer = provider.getSigner();

    governanceContract = new ethers.Contract(
      addresses.governance,
      governanceOut.abi,
      signer
    );
    // usdcContract = new ethers.Contract(addresses.usdc, usdcOut.abi, signer);
    // treasuryContract = new ethers.Contract(
    //   addresses.treasury,
    //   treasuryOut.abi,
    //   signer
    // );

    return address;
  } catch (error) {
    console.error("Error connecting to Ethereum:", error);
    throw error;
  }
};

// Governance Read Functions

export const totalSupply = async () => {
  try {
    const n = await governanceContract.totalSupply();
    return {
      value: n.toNumber(), // Call `toNumber()` directly on BigNumber
    };
  } catch (error) {
    console.error("Error fetching total supply:", error);
    throw error;
  }
};

export const getUsdc = async () => {
  try {
    const n = await governanceContract.usdc();
    return {
      address: utils.getAddress(n),
    };
  } catch (error) {
    console.error("Error fetching USDC address:", error);
    throw error;
  }
};

export const getBalanceOf = async (address: string) => {
  try {
    const n = await governanceContract.balanceOf(address);
    return {
      value: n.toNumber(),
    };
  } catch (error) {
    console.error("Error fetching balance of address:", error);
    throw error;
  }
};
