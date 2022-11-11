import React, { useEffect, useState } from "react";
import ethers from "ethers";
import { contractAddress, contractABI } from "../utils/constant";

export const AuctionContext = React.createContext();
const { ethereum } = window;

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const AuctionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  console.log({
    provider,
    signer,
    AuctionContract,
  });
};

export const AuctionProvider = ({ props }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [formData, setFormData] = useState({ bidAmount: "" });

  const connectWallet = async () => {
    const { ethereum } = window;
    if (ethereum) {
      console.log("yes");
      let chainId = await ethereum.request({ method: "eth_chainId" });
      let accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("connected to " + chainId);
      setCurrentAccount(accounts[0]);
      console.log("Found account is " + accounts[0]);
    } else {
      console.log("connect metamask");
    }
  };

  return (
    <AuctionContext.Provider value={{ value: "testing" }}>
      {props}
    </AuctionContext.Provider>
  );
};
