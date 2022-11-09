import { useState, useEffect } from "react";
import "./App.css";
import { Auction } from "./utils/Auction.json";
import { AuctionContractAddress } from "./config.js";
import axios from "axios";
import { ethers } from "ethers";

function App() {
  const [currentAccount, setCurrentAccount] = useState("");

  const connectWallet = async () => {
    if (typeof window.ethereum != undefined) {
      const { ethereum } = window;
      console.log("yes");
      let chainId = await ethereum.request({ method: "eth_chainId" });
      let accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(`Found account is ${accounts[0]}`);
      console.log("connected to " + chainId);
      setCurrentAccount(accounts[0]);
    } else {
      console.log("connect metamask");
    }
  };

  return (
    <div className="home">
      <button onClick={connectWallet}>Connect Wallet</button>
      {/* <input id="bid-amount">Enter bid amount</input>

      <button>Bid</button>
      <button>Withdraw</button>
      <button>End auction</button>
      <button>Benificiary</button>
      <button>Highest Bid</button>
      <button>Highest Bidder</button> */}
    </div>
  );
}

export default App;
