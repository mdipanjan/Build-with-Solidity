# Base ERC20 Token

## Overview
Base (BASE) is an ERC20 token with enhanced functionalities, including ownership privileges, blacklisting addresses, burning tokens, and trading restrictions. It's built on the Ethereum blockchain using Solidity ^0.8.20 and leverages OpenZeppelin's ERC20 and Ownable contracts.

## Key Features
- **ERC20 Standard**: Implements all standard ERC20 functionalities.
- **Ownership**: Utilizes OpenZeppelin's `Ownable` for ownership control.
- **Blacklisting**: Ability to blacklist addresses, preventing them from transferring or receiving tokens.
- **Burning**: Allows the owner to burn tokens, reducing the total supply.
- **Trading Restrictions**: Limits on maximum and minimum holdings for specific addresses, typically used for maintaining stability.

## Contract Address
Deployed at: `0xC73e5681Ba79d7Eda245A38124654EB9054f5790` (Ethereum Sepolia Network)

## Token Details
- **Name**: Base
- **Symbol**: BASE
- **Decimals**: 18 (standard for ERC20)
- **Total Supply**: Defined at contract deployment

## Smart Contract Functions
### Blacklisting
- Ability to add or remove addresses from a blacklist.

```solidity
function blacklist(address _address, bool _isBlacklisting) external onlyOwner;
```
### Burning Tokens

- Token burning by the owner.

```solidity
function burn(uint256 value) external onlyOwner;
```
### Setting Restrictions

- Configure trading limits and Uniswap pair

```solidity
function setRestrictions(bool _limited, address _uniswapV2Pair, uint256 _maxHoldingAmount, uint256 _minHoldingAmount) external onlyOwner;
```

### Renouncing Ownership

- Permanently transfer ownership to a null address

```solidity
function renounceOwnership() public override onlyOwner;
```

## License
This project is licensed under the MIT License.

## Disclaimer

