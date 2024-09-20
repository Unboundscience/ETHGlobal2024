#!/bin/sh

# USDC.sol
out=$(forge clean && forge create ./src/USDC.sol:USDC --rpc-url "${RPC_URL:=sapphire-localnet}" --private-key $PRIVATE_KEY --legacy --force --constructor-args $OWNER | grep "Deployed to:" | tr -d '[:space:]')
USDC_ADDRESS=$(echo $out | cut -d':' -f2-)
echo "usdc contract address: $USDC_ADDRESS"

# GovernanceToken.sol
out=$(forge clean && forge create ./src/GovernanceToken.sol:GovernanceToken --rpc-url "${RPC_URL:=sapphire-localnet}" --private-key $PRIVATE_KEY --legacy --force --constructor-args $OWNER $USDC_ADDRESS | grep "Deployed to:" | tr -d '[:space:]')
GOVERNANCE_TOKEN_ADDRESS=$(echo $out | cut -d':' -f2-)
echo "governance token contract address: $GOVERNANCE_TOKEN_ADDRESS"

# Treasury.sol
out=$(forge clean && forge create ./src/Treasury.sol:Treasury --rpc-url "${RPC_URL:=sapphire-localnet}" --private-key $PRIVATE_KEY --legacy --force --constructor-args $OWNER $GOVERNANCE_TOKEN_ADDRESS | grep "Deployed to:" | tr -d '[:space:]')
TREASURY_ADDRESS=$(echo $out | cut -d':'  -f2-)
echo "treasury contract address: $TREASURY_ADDRESS"