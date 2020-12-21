module.exports = {
  compilers: {
    solc: {
      version: "0.6.12",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        },
      }
    }
  },
  networks: {
    develop: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*",
      websockets: true,
      gasPrice: 1000000000,
      defaultEtherBalance: 9999
    },
    // Moonbase Alpha TestNet
    /*
    moonbase: {
      provider: new HDWalletProvider(
        mnemonic,
        "https://rpc.testnet.moonbeam.network"
      ),
       network_id: 1287,
       gasPrice: 0,
       gas: 12000000  // 0.006 -> 0.012   0.1
    }
    */
  }
}
