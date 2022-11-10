import { useState, useEffect } from "react";
import "./App.css";
import { Auction } from "./utils/Auction.json";
import { AuctionContractAddress } from "./config.js";
import axios from "axios";
import { ethers } from "ethers";

function App() {
  const [currentAccount, setCurrentAccount] = useState("");

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

  const startAuction = async () => {
    console.log("running");
  };

  const bidAuction = async () => {};

  return (
    <div className="home">
      <button onClick={connectWallet}> Connect Wallet</button>
      <div className="startAuction">
        <button id="start" onClick={startAuction}>
          Start Auction
        </button>
        <input type="text" placeholder="Enter asset name" />
        <input type="text" placeholder="Enter asset id" />
      </div>
      <div className="bidAuction">
        <button id="start" onClick={bidAuction}>
          Bid
        </button>
        <input type="text" placeholder="Enter your bid amount" />
      </div>

      <button>Withdraw</button>
      <button>End auction</button>
      <button>Benificiary</button>
      <button>Highest Bid</button>
      <button>Highest Bidder</button>
    </div>
  );
}

export default App;
