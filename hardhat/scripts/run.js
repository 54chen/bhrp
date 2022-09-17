const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners();

  const HGTContractFactory = await hre.ethers.getContractFactory("HGToken");
  const HGTContract = await HGTContractFactory.deploy("Housing Governance Token","HGT");
  await HGTContract.deployed();
  console.log("HGT deployed to:", HGTContract.address);
  console.log("HGT deployed by:", owner.address);
  let hgt = await HGTContract.balanceOf(owner.address);
  console.log("He has HGT:", hgt);

  const HMTContractFactory = await hre.ethers.getContractFactory("HMToken");
  const HMTContract = await HMTContractFactory.deploy("Housing Maintenance Token","HGT");
  await HMTContract.deployed();
  console.log("HMT deployed to:", HMTContract.address);
  console.log("HMT deployed by:", owner.address);
  let hmt = await HMTContract.balanceOf(owner.address);
  console.log("He has HMT:", hmt);

  const HouseNFTContractFactory = await hre.ethers.getContractFactory("House");
  const HouseNFTContract = await HouseNFTContractFactory.deploy();
  await HouseNFTContract.deployed();
  console.log("HouseNFT deployed to:", HouseNFTContract.address);
  console.log("HouseNFT deployed by:", owner.address);
  HouseNFTContract.awardItem(owner.address, "https://www.google.com", 1);
  let houseNFT = await HouseNFTContract.balanceOf(owner.address);
  console.log("He has House:", houseNFT);

  const RentalNFTContractFactory = await hre.ethers.getContractFactory("Rental");
  const RentalNFTContract = await RentalNFTContractFactory.deploy();
  await RentalNFTContract.deployed();
  console.log("RentalNFT deployed to:", RentalNFTContract.address);
  console.log("RentalNFT deployed by:", owner.address);
  RentalNFTContract.awardItem(owner.address, "https://www.google.com", 2);
  let rentalNFT = await RentalNFTContract.balanceOf(owner.address);
  console.log("He has Rental:", rentalNFT);


  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  const waveContract = await waveContractFactory.deploy(HMTContract.address, HGTContract.address, HouseNFTContract.address, RentalNFTContract.address,{
    value: hre.ethers.utils.parseEther("0.1"),
  });
  await waveContract.deployed();
  console.log("Contract deployed to:", waveContract.address);
  console.log("Contract deployed by:", owner.address);

  // reward settings
  await HGTContract.approve(waveContract.address,1000000);
  await waveContract.addRewardAmount(1000000);
  await waveContract.setRewardsDuration(100);
  await waveContract.notifyRewardAmount(100);


  // stake
  await HMTContract.approve(waveContract.address,10)
  await waveContract.stake(1);
  // paid
  await HMTContract.approve(waveContract.address,10)
  await waveContract.paid(10,1);
  // agree
  await waveContract.agree(10,owner.address,1);
  // get no 1 all paid map 
  let paids = await waveContract.getAllWhoPaid(1);
  console.log('count of No.1 house paid list: %d',paids.length);

  await new Promise(r => setTimeout(r, 1000));

  let earned = await waveContract.earned(owner.address);
  console.log("I earned:", earned);

  await waveContract.getReward();

  let contractBalance = await hre.ethers.provider.getBalance(
    waveContract.address
  );
  console.log(
    "Contract balance:",
    hre.ethers.utils.formatEther(contractBalance)
  );


  let waveCount;
  waveCount = await waveContract.getTotalWaves();
  console.log('Count of waves',waveCount.toNumber());



  contractBalance = await hre.ethers.provider.getBalance(
    waveContract.address
  );
  console.log(
    "Contract balance:",
    hre.ethers.utils.formatEther(contractBalance)
  );

  waveCount = await waveContract.getTotalWaves();
  console.log('wave count:',waveCount.toNumber());


  waveTxn = await waveContract.wave("Another message!", "" + waveContract.address);
  await waveTxn.wait();
  contractBalance = await hre.ethers.provider.getBalance(
    waveContract.address
  );
  console.log(
    "Contract balance:",
    hre.ethers.utils.formatEther(contractBalance)
  );

  waveCount = await waveContract.getTotalWaves();
  console.log('all of the waves cnt:%d', waveCount.toNumber());

  let allWaves = await waveContract.getAllWaves();
  console.log('count of my waves: %d',allWaves.length);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0); // exit Node process without error
  } catch (error) {
    console.log(error);
    process.exit(1); // exit Node process while indicating 'Uncaught Fatal Exception' error
  }
  // Read more about Node exit ('process.exit(num)') status codes here: https://stackoverflow.com/a/47163396/7974948
};

runMain();
