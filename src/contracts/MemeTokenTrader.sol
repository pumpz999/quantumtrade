// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract MemeTokenTrader {
  struct Trade {
    address trader;
    address tokenAddress;
    uint256 amount;
    uint256 price;
    uint256 timestamp;
  }

  address public owner;
  uint256 public platformFee = 1; // 1% default fee
  Trade[] public trades;

  event TradePlaced(
    address indexed trader, 
    address indexed tokenAddress, 
    uint256 amount, 
    uint256 price
  );

  constructor() {
    owner = msg.sender;
  }

  modifier onlyOwner() {
    require(msg.sender == owner, "Not authorized");
    _;
  }

  function placeTrade(
    address _token, 
    uint256 _amount, 
    uint256 _price
  ) external {
    require(_amount > 0, "Invalid trade amount");
    
    Trade memory newTrade = Trade({
      trader: msg.sender,
      tokenAddress: _token,
      amount: _amount,
      price: _price,
      timestamp: block.timestamp
    });

    trades.push(newTrade);
    emit TradePlaced(msg.sender, _token, _amount, _price);
  }

  function updatePlatformFee(uint256 _newFee) external onlyOwner {
    require(_newFee <= 10, "Fee cannot exceed 10%");
    platformFee = _newFee;
  }

  function getTrades() external view returns (Trade[] memory) {
    return trades;
  }
}
