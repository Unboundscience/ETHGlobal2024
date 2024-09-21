import { ethers, utils, Contract } from "ethers";
import addresses from "./addresses.json";
import usdcOut from "../../../../backend/out/USDC.sol/USDC.json";
import governanceOut from "../../../../backend/out/GovernanceToken.sol/GovernanceToken.json";
import treasuryOut from "../../../../backend/out/Treasury.sol/Treasury.json";
import { Address } from "viem";
// import { mintSepoliaTestnet } from "viem/chains";

declare global {
  interface Window {
    ethereum?: ethers.providers.ExternalProvider;
  }
}

let governanceContract: Contract;
let usdcContract: Contract;
let treasuryContract: Contract;

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

    usdcContract = new ethers.Contract(addresses.usdc, usdcOut.abi, signer);
    treasuryContract = new ethers.Contract(
      addresses.treasury,
      treasuryOut.abi,
      signer
    );

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

export const governanceDecimals = async () => {
  try {
    const n = await governanceContract.decimals();
    return n;
  } catch (error) {
    console.error("Error fetching governance decimals ", error);
    throw error;
  }
};

// Governance Write
// export const governanceMint = async (address: Address, value: number) => {
//     const n = await governanceContract.mint(address, value)
//     return {

//     }
// };

// USDC Read Functions
export const usdcDecimals = async () => {
  const n = await usdcContract.decimals();
  try {
    return n;
  } catch (error) {
    console.error("Error fetching usdcDecimals", error);
  }
};

export const getBalanceOf = async (address: Address) => {
  try {
    const n = await usdcContract.balanceOf(address);
    return {
      value: n.toNumber(),
    };
  } catch (error) {
    console.error("Error fetching balance of address:", error);
    throw error;
  }
};

export const allowance = async (owner: Address, spender: Address) => {
  const n = await usdcContract.allowance(owner, spender);
  try {
    return n.toNumber;
  } catch (error) {
    console.error("Error fetching the allowance value:", error);
    throw error;
  }
};

//USDC Write Functions
export const usdcApprove = async (spender: string, value: number) => {
  const trx = await usdcContract.approve(spender, value);
  return await trx.wait();
};

//Treasury Read Functions:
export const getProposals = async (value: number) => {
  const n = await treasuryContract.proposals(value);
  return n;
};

//Treasury Write Functions
