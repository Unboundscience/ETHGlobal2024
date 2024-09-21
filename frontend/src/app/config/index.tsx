// config/index.tsx

import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";

import { cookieStorage, createStorage } from "wagmi";
import { mainnet, sepolia, sapphireTestnet } from "wagmi/chains";

// Your Reown Cloud project ID
export const projectId = "5bf772bec14a93f5b89e91c2e3994231";

// Create a metadata object
const metadata = {
  name: "unbound finance",
  description: "AppKit Example",
  url: "https://reown.com/appkit", // origin must match your domain & subdomain
  icons: ["https://assets.reown.com/reown-profile-pic.png"],
};

// Create wagmiConfig
const chains = [mainnet, sepolia, sapphireTestnet] as const;
export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
});
