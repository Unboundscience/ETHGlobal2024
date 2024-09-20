# treasury

## build
```
forge build --force ./src/Treasury.sol
```

## deployment

### prerequisites
```
chmod +x ./script/deploy.sh
```

### localnet
```
PRIVATE_KEY=xxx OWNER=xxx ./script/deploy.sh
```

### testnet
```
PRIVATE_KEY=xxx OWNER=xxx RPC_URL=sapphire-testnet ./script/deploy.sh
```