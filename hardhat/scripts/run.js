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


  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  const waveContract = await waveContractFactory.deploy(HMTContract.address, HGTContract.address,{
    value: hre.ethers.utils.parseEther("0.1"),
  });
  await waveContract.deployed();
  console.log("Contract deployed to:", waveContract.address);
  console.log("Contract deployed by:", owner.address);

  // reward settings
  await waveContract.setRewardsDuration(1);
  await HMTContract.approve(waveContract.address,10)
  await waveContract.stake(10);

  await new Promise(r => setTimeout(r, 2000));

  let earned = await waveContract.earned(owner.address);
  console.log("I earned:", earned);

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
