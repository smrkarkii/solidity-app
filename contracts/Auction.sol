//SPDX-License-Identifier:MIT

pragma solidity ^0.8.0;

contract Auction {
    // current state of the auction
    uint256 assetId;
    string assetName;
    address payable public beneficiary;
    uint256 public auctionEndTime;

    address public highestBidder;
    uint256 public highestbid;

    enum Auc_State {
        Running,
        Ended,
        Cancelled
    }
    Auc_State public auctionState;

    mapping(address => uint256) pendingReturns;

    event highestBidIncreased(address bidder, uint256 amount);
    event auctionEnded(address winner, uint256 amount);

    constructor(
        uint256 _biddingTime,
        address payable _beneficiary,
        uint256 _id,
        string memory _name
    ) {
        auctionState = Auc_State.Running;
        assetId = _id;
        assetName = _name;
        beneficiary = _beneficiary;
        auctionEndTime = block.timestamp + _biddingTime;
    }

    modifier notOwner() {
        require(msg.sender != beneficiary, "Owner cannot bid");
        _;
    }

    modifier Owner() {
        require(msg.sender == beneficiary, "Caller must be auctioner");
        _;
    }

    modifier TimeLimit() {
        require(block.timestamp < auctionEndTime, "The Auction Time Is Over");
        _;
    }

    function bid() public payable notOwner TimeLimit {
        require(
            auctionState == Auc_State.Running,
            "The Auction Is not Running"
        );
        if (msg.value > highestbid) {
            if (pendingReturns[msg.sender] > 0) {
                uint256 amount = pendingReturns[msg.sender];
                payable(msg.sender).transfer(amount);
            }

            pendingReturns[msg.sender] = msg.value;
            highestBidder = msg.sender;
            highestbid = msg.value;
            emit highestBidIncreased(msg.sender, msg.value);
        } else {
            revert("sorry, the bid is not high enough!");
        }
    }

    function withdraw() public payable {
        require(
            auctionState == Auc_State.Cancelled ||
                auctionState == Auc_State.Ended,
            "You Cannot Withdraw when the auction is Running"
        );
        uint256 amount = pendingReturns[msg.sender];
        if (amount > 0) {
            pendingReturns[msg.sender] = 0;
        } else {
            revert("No amount to withdraw");
        }

        if (!payable(msg.sender).send(amount)) {
            pendingReturns[msg.sender] = amount;
        }
    }

    function auctionCancel() public Owner TimeLimit {
        require(
            auctionState == Auc_State.Running,
            "The Auction is already Stopped"
        );
        auctionState = Auc_State.Cancelled;
    }

    function auctionEnd() public Owner {
        if (
            auctionState == Auc_State.Cancelled ||
            auctionState == Auc_State.Ended
        ) revert("the auction is already over!");
        require(
            block.timestamp > auctionEndTime,
            "The Auction Cannot End Before The Specified Time"
        );
        auctionState = Auc_State.Ended;
        emit auctionEnded(highestBidder, highestbid);
        beneficiary.transfer(highestbid);
        pendingReturns[highestBidder] = 0;
    }
}
