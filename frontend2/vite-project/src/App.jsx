import React, { useContext } from "react";
import { AuctionContext } from "./context/AuctionContext.jsx";
i; //mport { AuctionContext } from "./context/AucitonContext";
// import "./App.css";
// import { Auction } from "./utils/Auction.json";
// import { AuctionContractAddress } from "./config.js";
// import axios from "axios";
// import { ethers } from "ethers";

function App() {
  //
  const { connectWallet } = useContext(AuctionContext);

  // const { value } = useContext(AuctionContext);
  // console.log(value);
  // const startAuction = async () => {
  //   console.log("running");
  // };

  return (
    <div className="home">
      <button onClick={connectWallet}> Connect Wallet</button>
      <div className="startAuction">
        <button id="start">Start Auction</button>
        <input type="text" placeholder="Enter asset name" />
        <input type="text" placeholder="Enter asset id" />
      </div>
      <div className="bidAuction">
        <button id="start">Bid</button>
        <input type="text" placeholder="Enter your bid amount" />
      </div>

      <button>Withdraw</button>
      <button>End auction</button>
      <button>Benificiary</button>
      <button>Highest Bid</button>
      <button>Highest Bidder</button>
      <p>GHw</p>
    </div>
  );
}

export default App;
