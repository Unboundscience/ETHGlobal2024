// config/index.tsx

import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";

import { cookieStorage, createStorage } from "wagmi";
import { sapphireTestnet } from "wagmi/chains";

import { mainnet, arbitrum } from "@reown/appkit/networks";

export const networks = [mainnet];
// Your Reown Cloud project ID
export const projectId = "5bf772bec14a93f5b89e91c2e3994231";
export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  projectId,
  networks,
});

// Create a metadata object
const metadata = {
  name: "unbound finance",
  description: "AppKit Example",
  url: "https://reown.com/appkit", // origin must match your domain & subdomain
  icons: ["https://assets.reown.com/reown-profile-pic.png"],
};

// Create wagmiConfig
const chains = [sapphireTestnet] as const;
export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
});
