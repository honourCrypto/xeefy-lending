require("@nomicfoundation/hardhat-toolbox");
require("@zama-fhe/hardhat-fhevm-plugin");

module.exports = {
  solidity: "0.8.19",
  networks: {
    hardhat: {
      forking: {
        enabled: false
      },
      // 👇 Important: Enable FHEVM mode
      fhevm: true
    },
  },
};
