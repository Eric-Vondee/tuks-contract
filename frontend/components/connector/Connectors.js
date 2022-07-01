import * as UAuthWeb3Modal from "./uauth_web3modal";
import UAuthSPA from "@uauth/js";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { CHAIN_DATA_LIST } from "web3modal";

export const DEFAULT_CHAIN_ID = 80001;

// These options are used to construct the UAuthSPA instance.
export const uauthOptions = {
  clientID: "fb8788a0-9581-4681-82ee-cabd3fe97a37",
  redirectUri: "https://tuks.vercel.app/",
  scope: "openid wallet email:optional humanity_check:optional",
};

export const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      rpc: {
        80001: process.env.ALCHEMY_URL,
      },
      network: CHAIN_DATA_LIST[DEFAULT_CHAIN_ID].network,
      chainId: 80001,
    },
  },
  coinbasewallet: {
    package: CoinbaseWalletSDK, // Required
    options: {
      appName: "tuks", // Required

      rpc: process.env.ALCHEMY_URL, // Optional if `infuraId` is provided; otherwise it's required
      chainId: 80001, // Optional. It defaults to 1 if not provided
      darkMode: true, // Optional. Use dark theme, defaults to false
    },
  },
  // All custom `web3modal` providers must be registered using the "custom-"
  // // prefix.
  "custom-uauth": {
    display: UAuthWeb3Modal.display,
    connector: UAuthWeb3Modal.connector,
    package: UAuthSPA,
    options: uauthOptions,
  },
};
