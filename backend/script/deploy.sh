#!/bin/sh

# Multicall3.sol
out=$(forge create ./lib/illuminexswap/libraries/Multicall3.sol:Multicall3 --rpc-url "${RPC_URL:=sapphire-localnet}" --private-key $PRIVATE_KEY --legacy | grep "Deployed to:" | tr -d '[:space:]')
MULTICALL_ADDRESS=$(echo $out | cut -d':' -f2-)
echo "multicall contract address: $MULTICALL_ADDRESS"

# BalanceRegistry.sol
out=$(forge create ./lib/illuminexswap/confidentialERC20/BalanceRegistry.sol:ConfidentialBalanceRegistry --rpc-url "${RPC_URL:=sapphire-localnet}" --private-key $PRIVATE_KEY --legacy --constructor-args $COMMITER $OWNER $MULTICALL_ADDRESS | grep  "Deployed to:" | tr -d '[:space:]')
BALANCE_REGISTRY_ADDRESS=$(echo $out | cut -d':' -f2-)
echo "balance registry contract address: $BALANCE_REGISTRY_ADDRESS"

# USDC.sol
out=$(forge create ./src/PrivateUSDC.sol:PrivateUSDC --rpc-url "${RPC_URL:=sapphire-localnet}" --private-key $PRIVATE_KEY --legacy --constructor-args '(true,USDC,USDC,6)' $MULTICALL_ADDRESS $BALANCE_REGISTRY_ADDRESS | grep "Deployed to:" | tr -d '[:space:]')
USDC_ADDRESS=$(echo $out | cut -d':' -f2-)
echo "usdc contract address: $USDC_ADDRESS"

# # GovernanceToken.sol
# out=$(forge create ./src/PrivateGovernanceToken.sol:PrivateGovernanceToken --rpc-url "${RPC_URL:=sapphire-localnet}" --private-key $PRIVATE_KEY --legacy --constructor-args $OWNER $USDC_ADDRESS | grep "Deployed to:" | tr -d '[:space:]')
# GOVERNANCE_TOKEN_ADDRESS=$(echo $out | cut -d':' -f2-)
# echo "governance token contract address: $GOVERNANCE_TOKEN_ADDRESS"

# # Treasury.sol
# out=$(forge create ./src/Treasury.sol:Treasury --rpc-url "${RPC_URL:=sapphire-localnet}" --private-key $PRIVATE_KEY --legacy --constructor-args $OWNER $GOVERNANCE_TOKEN_ADDRESS | grep "Deployed to:" | tr -d '[:space:]')
# TREASURY_ADDRESS=$(echo $out | cut -d':'  -f2-)
# echo "treasury contract address: $TREASURY_ADDRESS"