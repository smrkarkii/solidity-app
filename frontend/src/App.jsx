import { useState, useEffect } from "react";
import "./App.css";
import { Auction } from "./utils/Auction.json";
import { AuctionContractAddress } from "./config.js";
import axios from "axios";
import { ethers } from "ethers";

function App() {
  return (
    <div className="home">
      <button>Connect Wallet</button>
      <input id="bid-amount">Enter bid amount</input>

      <button>Bid</button>
      <button>Withdraw</button>
      <button>End auction</button>
      <button>Benificiary</button>
      <button>Highest Bid</button>
      <button>Highest Bidder</button>
    </div>
  );
}

export default App;
