const main = async () => {
  const [deployer] = await hre.ethers.getSigners();
  const accountBalance = await deployer.getBalance();

  console.log("accountBalance:", accountBalance);

  const HGTContractFactory = await hre.ethers.getContractFactory("HGToken");
  const HGTContract = await HGTContractFactory.deploy("Housing Governance Token", "HGT");
  await HGTContract.deployed();
  console.log("HGT deployed to:", HGTContract.address);
  console.log("HGT deployed by:", deployer.address);
  let hgt = await HGTContract.balanceOf(deployer.address);
  console.log("He has HGT:", hgt);

  const HMTContractFactory = await hre.ethers.getContractFactory("HMToken");
  const HMTContract = await HMTContractFactory.deploy("Housing Maintenance Token", "HGT");
  await HMTContract.deployed();
  console.log("HMT deployed to:", HMTContract.address);
  console.log("HMT deployed by:", deployer.address);
  let hmt = await HMTContract.balanceOf(deployer.address);
  console.log("He has HMT:", hmt);


  console.log("Deploying contracts with account: ", deployer.address);
  console.log("Account balance: ", accountBalance.toString());

  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  const waveContract = await waveContractFactory.deploy(HMTContract.address, HGTContract.address, {
    value: hre.ethers.utils.parseEther("0.001"),
  });
  await waveContract.deployed();

  console.log("WavePortal address: ", waveContract.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
