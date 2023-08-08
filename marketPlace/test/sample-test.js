
const { expect } = require("chai");
const { ethers, waffle } = require("hardhat");

describe("Greeter", function () {
  let Aura;
  let Solic;
  let nftMarketplace;
  let nft;
  let nft1;
  let nftOwner;
  let nftOwner1;
  let nftOwner2;
  let ethuser
  let auraUser;
  let bider1;
  let bider2;
  let solicUser;
  let solicUser1;
  const provider = waffle.provider;

  it("deployment  ", async function () {
    [owner, nftOwner, nftOwner1, nftOwner2, auraUser, auraUser1, fakeowner, bider1, bider2, wethUser, wethUser1, solicUser, solicUser1,ethuser] = await ethers.getSigners();

    console.log(owner.address, "owner");
    console.log(nftOwner.address, "nftowner");
    console.log(nftOwner1.address, "nftowner1");

    // Deploy test
    const test = await hre.ethers.getContractFactory("test");
    nft = await test.deploy("dragon/");
    console.log("test address", nft.address);

    // Deploy test1
    const test1 = await hre.ethers.getContractFactory("test1");
    nft1 = await test1.deploy("turtle/");
    console.log("test1 address", nft1.address);


    // Deploy AURA
    const AURA = await hre.ethers.getContractFactory("AURA");
    Aura = await AURA.deploy();
    console.log("AURA address", Aura.address);

    // Deploy WETH
    const WETH = await hre.ethers.getContractFactory("WETH9");
    Weth = await WETH.deploy();
    console.log("Weth address", Weth.address);

    //Deploy Solic
    const SOLIC = await hre.ethers.getContractFactory("Solic");
    Solic = await SOLIC.deploy();
    console.log("Solic Address", Solic.address);


    //Deploy NFTMarketplace
    const NFTMarketplace = await hre.ethers.getContractFactory("NFTMarketplace");
    nftMarketplace = await NFTMarketplace.deploy();
    console.log(" NFTMarketplace", nftMarketplace.address);

  });



  //minting  one  nft from test.sol contract and one from  test1.sol contract
  it("nft Minting of test", async function () {
    await nft.flipPauseStatus();
    const mint = await nft.connect(nftOwner).mint(1);
    const mint1 = await nft.connect(nftOwner).mint(2);
    const mint2= await nft.connect(nftOwner).mint(3);
    expect(await nft.ownerOf(0)).to.equal(nftOwner.address);
    expect(await nft.ownerOf(1)).to.equal(nftOwner.address);
    expect(await nft.ownerOf(2)).to.equal(nftOwner.address);
  });

  it("nft Minting of test1 contract", async function () {
    await nft1.flipPauseStatus();
    const mint = await nft1.connect(nftOwner1).mint(1);
    console.log(await nft1.ownerOf(0), "owner of nft test1");
    expect(await nft1.ownerOf(0)).to.equal(nftOwner1.address);
  });

  // approving the marketplace for both nfts of both contract
  it("aprove the marketplace for nft of nftowner", async function () {
    const approve = await nft.connect(nftOwner).approve(nftMarketplace.address, 0);
    const approve1 = await nft.connect(nftOwner).approve(nftMarketplace.address, 1);
    const approve2 = await nft.connect(nftOwner).approve(nftMarketplace.address, 2);
  });

  it("approve the marketplace for nft of nftowner1", async function () {
    const approve = await nft1.connect(nftOwner1).approve(nftMarketplace.address, 0);
  });

  //***************************************Balance of Token Owner ***************************************

  //checking the balance of AuraOwner.
  it("checking the balnce of Auraowner ", async function () {
    const balance = await Aura.balanceOf(owner.address);
    expect(ethers.utils.formatEther(balance)).to.equal('100000000.0');
  });
  //checking the balance of SolicOwner.
  it("checking the balnce of Solic owner ", async function () {
    const balance = await Solic.balanceOf(owner.address);
    expect(ethers.utils.formatEther(balance)).to.equal('100000000.0');
  });



  //Deposit the weth
  it("Deposite the Weth to owner", async function () {
    const deposite = await Weth.connect(wethUser).deposit({ from: wethUser.address, value: "20000000000000000000" });

  });
  //Deposit the weth
  it("Deposite the Weth to owner", async function () {
    const deposite = await Weth.connect(wethUser1).deposit({ from: wethUser1.address, value: "20000000000000000000" });
  });

  // checking the balance of WethUser.
  it("checking the balnce of WETHowner ", async function () {
    const balance = await Weth.balanceOf(wethUser.address);
    console.log(balance, "balance");
    const balance1 = await Weth.balanceOf(wethUser1.address);
    expect(ethers.utils.formatEther(balance)).to.equal('20.0');
    expect(ethers.utils.formatEther(balance1)).to.equal('20.0');
  });

  //***************************************transfer tokens ***************************************
  //transfer the aura to buyer of nft
  it("transfer the aura to buyer of nft ", async function () {
    const approve = await Aura.connect(owner).transfer(auraUser.address, ethers.utils.parseEther("100"));
    expect(await Aura.balanceOf(auraUser.address)).to.equal(ethers.utils.parseEther("100"));
  });
  it("transfer the aura to second buyer of nft", async function () {
    const approve = await Aura.connect(owner).transfer(auraUser1.address, ethers.utils.parseEther("100"));
    expect(await Aura.balanceOf(auraUser1.address)).to.equal(ethers.utils.parseEther("100"));
  });

  //transfer the Solic to buyer of nft
  it("transfer the solic to buyer of nft", async function () {
    const approve = await Solic.connect(owner).transfer(solicUser.address, ethers.utils.parseEther("200"));
    expect(await Solic.balanceOf(solicUser.address)).to.equal(ethers.utils.parseEther("200"));
  })
  //transfer the Solic to buyer of nft
  it("transfer the solic to buyer of nft", async function () {
    const approve = await Solic.connect(owner).transfer(solicUser1.address, ethers.utils.parseEther("200"));
    expect(await Solic.balanceOf(solicUser1.address)).to.equal(ethers.utils.parseEther("200"));
  });

  //***************************************approve marketplace by aura ***************************************

  //approve the marketplace  by aurauser and aurausr1
  it("approve the marketplace by aurauser", async function () {
    const approve = await Aura.connect(auraUser).approve(nftMarketplace.address, "20000000000000000000");

  });


  it("approve the marketplace by aurauser1", async function () {
    const approve = await Aura.connect(auraUser1).approve(nftMarketplace.address, "20000000000000000000");
  });

  //***************************************approve marketplace by Solic ***************************************

  it("approve the marketplace by SolicUser", async function () {
    const approve = await Solic.connect(solicUser).approve(nftMarketplace.address, "20000000000000000000");
  });
  it("approve the marketplace by SolicUser", async function () {
    const approve = await Solic.connect(solicUser1).approve(nftMarketplace.address, "20000000000000000000");
  });

  //***************************************set royalities ***************************************

  it("set market Owner", async function () {
    const setmarketOwner = await nftMarketplace.setmarketOwner(owner.address);
    expect(await nftMarketplace.marketOwner()).to.equal(owner.address);
  })


  //   //***************************************set royalities ***************************************

  //set royalities of both Contract
  it("set royalities test owner ", async function () {
    const Setroyalities = await nftMarketplace.connect(owner).setRoyaltie(nft.address, ethers.utils.parseEther('10'));
    const royalities = await nftMarketplace.connect(owner).Royalties(nft.address);
  });
  it("set Royalities test1 owner", async function () {
    const Setroyalities = await nftMarketplace.connect(owner).setRoyaltie(nft1.address, ethers.utils.parseEther('7'));
    const royalities = await nftMarketplace.connect(owner).Royalties(nft1.address);
  })

  //failing the test by run function not by the owner.
  it("Failing:not the owner", async function () {
    try {
      const Setroyalities = await nftMarketplace.connect(fakeowner).setRoyaltie(nft.address, "10000000000000000000");
      const royalities = await nftMarketplace.connect(fakeowner).Royalties(nft1.address);
    } catch (error) {
      console.log("ERROR", error.message);
    }
  });

  //failing the test by passing  greater percentage than allowed
  it("Failing: execute the royalities function by passing  greater percentage than allowed", async function () {
    try {
      const Setroyalities = await nftMarketplace.connect(owner).setRoyaltie(nft.address, "10000000000000000001");
      const royalities = await nftMarketplace.connect(owner).Royalties(nft1.address);
    } catch (error) {
      console.log("ERROR", error.message);
    }
  });



  //set Marketplace fee 
  it("set Marketplacefee", async function () {
    const setmarketplaceFEE = await nftMarketplace.connect(owner).setmarketplaceFEE(ethers.utils.parseEther('1'));
    const marketplacefee = await nftMarketplace.marketplaceFEE();
    expect(marketplacefee).to.equal("1000000000000000000");
  });

  //failing the Marketplace fee function called by other person
  it("failing: only owner can call it", async function () {
    try {
      const setmarketplaceFEE = await nftMarketplace.connect(fakeowner).setmarketplaceFEE(ethers.utils.parseEther('2.5'));
      const marketplacefee = await nftMarketplace.marketplaceFEE();
      expect(marketplacefee).to.equal("2500000000000000000");
    } catch (error) {
      console.log(error.message);
    }
  });

  //***************************************Create Order***************************************

  //failig test by creating order by other person not owner
  it("Failing:caller is not owner", async function () {
    try {
      const createOrder = await nftMarketplace.connect(fakeowner).createOrder(nft.address, 0, ethers.utils.parseEther('5'), "7000000000000000000", Solic.address);
    } catch (error) {
      console.log("Error", error.message);
    }
  });


  //failing the test by passing wrong number of nft of nft smart contract
  it("Failing:wrong number nft of nft smart contract", async function () {
    try {
      const createOrder = await nftMarketplace.connect(nftOwner).createOrder(nft.address, 2, ethers.utils.parseEther('5'), "7000000000000000000", Solic.address);

    } catch (error) {
      console.log("ERROR", error.message);
    }
  });


  //failing the test by passing WRONG ADDRESS OF NFTSMART CONTRACT 
  it("Failing:WRONG ADDRESS OF NFTSMART CONTRACT ", async function () {
    try {
      const createOrder = await nftMarketplace.connect(nftOwner).createOrder(nftOwner2.address, 0, ethers.utils.parseEther('5'), "7000000000000000000", Solic.address);
    } catch (error) {
      console.log("ERROR", error.message);
    }
  });


  //failing  the test by missing the argument
  it("Failing:Missing Argument ", async function () {
    try {
      const createOrder = await nftMarketplace.connect(nftOwner).createOrder(nftOwner2.address, 0, ethers.utils.parseEther('5'), Solic.address);
    } catch (error) {
      console.log("ERROR", error.message);
    }
  });

  //creating order
  it("create order", async function () {
    const createOrder = await nftMarketplace.connect(nftOwner).createOrder(nft.address, 0, ethers.utils.parseEther('7'), "10000000000000000000", Solic.address);
    //  console.log(createOrder,"createorder");
  });

 // ***************************************safeExecuteOrderBySolic**************************************
 
//  it("failing:wrong nft contract address ",async function(){
//    try {
//      const safeExecuteOrderByToken = await nftMarketplace.connect(solicUser).safeExecuteOrderByToken(nft1.address,0,Solic.address);
//    } catch (error) {
//      console.log("ERROR",error.message);
//    }
//  });

//  it("failing:execute nft that not published  ",async function(){
//    try {
//    const  safeExecuteOrderByToken = await nftMarketplace.connect(solicUser).safeExecuteOrderByToken(nft.address,1,Solic.address);
//    } catch (error) {
//     console.log("ERROR",error.message);
//    }
//  });

// it("failing:execute that ",async function(){
//   try {
//     const safeExecuteOrderByEth = await nftMarketplace.connect(solicUser).safeExecuteOrderByToken(nft.address,0,Aura.address);
    
//   } catch (error) {
//     console.log("error",error.message);
//   }
// })

//    it(" safeExecuteOrderBySolicUser", async function () {
//     const safeExecuteOrderByEth = await nftMarketplace.connect(solicUser).safeExecuteOrderByToken(nft.address,0,Solic.address);
//     //console.log(safeExecuteOrderByEth,"safeexecution");
//   });

//   //after safeExecution checking  nft owner
//     it("after safeExecution nft owner", async function () {
//       expect(await nft.ownerOf(0)).to.equal(solicUser.address);
//     });


  //***************************************update the Order Aura***************************************
//calling update function by other address
  it("failing:only owner ",async function(){
    try {
    const updateOrder = await nftMarketplace.connect(owner).updateOrder(nft.address, 0, ethers.utils.parseEther('9'), "6000000000000000", Aura.address);
      
    } catch (error) {
      console.log("Error",error.message);
    }
  });
// wrong nft address
  it("failing:other contract address ",async function(){
    try {
    const updateOrder = await nftMarketplace.connect(nftOwner).updateOrder(nft1.address, 0, ethers.utils.parseEther('9'), "6000000000000000", Aura.address);
      
    } catch (error) {
      console.log("Error",error.message);
    }
  });

  //wrogn nft id 
  it("failing:other nft id",async function(){
    try {
    const updateOrder = await nftMarketplace.connect(nftOwner).updateOrder(nft.address, 1, ethers.utils.parseEther('9'), "6000000000000000", Aura.address);
      
    } catch (error) {
      console.log("Error",error.message);
    }
  });

  it("updateOrder", async function () {
    const updateOrder = await nftMarketplace.connect(nftOwner).updateOrder(nft.address, 0, ethers.utils.parseEther('9'), "6000000000000000", Aura.address);
  });
  it("transfer the aura to buyer of nft ", async function () {
    const approve = await Aura.connect(owner).transfer(auraUser.address, "10000000000000000000");
  });
  it("approve the marketplace by auraUser", async function () {
    const approve = await Aura.connect(auraUser).approve(nftMarketplace.address, "1000000000000000000"); 
  });

   //*************************************** safeExecuteOrderByAura ***************************************
 // transfer the auras for biding
  it("transfer the aura to buyer of nft ", async function () {
    const approve = await Aura.connect(owner).transfer(auraUser.address, "10000000000000000000");
  });
  it("approve the marketplace by auraUser", async function () {
    const approve = await Aura.connect(auraUser).approve(nftMarketplace.address, "1000000000000000000");
  });

//wrong nft contract address
  it("failing:false nft address", async function () {
    try {
      const safeExecuteOrderByEth = await nftMarketplace.connect(auraUser).safeExecuteOrderByToken(nft1.address,0,Aura.address);

    } catch (error) {
      console.log(error.message);
    }
  });
//wrong  nft address
  it("failing:false nft address", async function () {
    try {
      const safeExecuteOrderByEth = await nftMarketplace.connect(auraUser).safeExecuteOrderByToken(nft.address,1,Aura.address);

    } catch (error) {
      console.log(error.message);
    }
  });

//giving other token address
  it("failing:false token address", async function () {
    try {
      const safeExecuteOrderByEth = await nftMarketplace.connect(auraUser).safeExecuteOrderByToken(nft.address,0,Solic.address);

    } catch (error) {
      console.log(error.message);
    }
  });

//empty balance user
it("failing:false token address", async function () {
  try {
    const safeExecuteOrderByEth = await nftMarketplace.connect(solicUser).safeExecuteOrderByToken(nft.address,0,Aura.address);

  } catch (error) {
    console.log(error.message);
  }
});

 //safeExecuteOrderByToken 
  it(" safeExecuteOrderByToken", async function () {
    const safeExecuteOrderByEth = await nftMarketplace.connect(auraUser).safeExecuteOrderByToken(nft.address,0,Aura.address);
    expect(await nft.ownerOf(0)).to.equal(auraUser.address);
  });
  //***************************************Create Order***************************************
  //creating order
  it("create order", async function () {
    const createOrder = await nftMarketplace.connect(nftOwner).createOrder(nft.address, 1, ethers.utils.parseEther('7'), "10000000000000000000", Solic.address);
    //  console.log(createOrder,"createorder");
  });


  // ***************************************update the Order Eth***************************************
    it("updateOrder",async function(){
      const updateOrder = await nftMarketplace.connect(nftOwner).updateOrder(nft.address,1, ethers.utils.parseEther('9'), "6000000000000000",Solic.address);
    });

  //     //*************************************** safeExecuteOrderByEth ***************************************

  // FAILING THE  safeExecuteOrderByEth by  passing wrong value  of eth;
  it("Failing:Passing wrong value of eth", async function () {
    try {
      const safeExecuteOrderByEth = await nftMarketplace.connect(auraUser).safeExecuteOrderByEth(nft.address, 1, { from: auraUser.address, value: ethers.utils.parseEther('3') });

    } catch (error) {
      console.log("Error:", error.message);
    }
  });



  //Failing  by passing wrong id of nft
  it("Failing:by passing wrong id of nft", async function () {
    try {
      const safeExecuteOrderByEth = await nftMarketplace.connect(auraUser).safeExecuteOrderByEth(nft.address, 0, { from: auraUser.address, value: ethers.utils.parseEther('9') });
    } catch (error) {
      console.log("Error1:", error.message);
    }
  });

  //safeExecuteOrderByEth
  it(" safeExecuteOrderByEth", async function () {
    const safeExecuteOrderByEth = await nftMarketplace.connect(auraUser).safeExecuteOrderByEth(nft.address, 1, { from: auraUser.address, value: ethers.utils.parseEther('9') });
  })
  //after safeExecution checking  nft owner
  it("after safeExecution nft owner", async function () {
    expect(await nft.ownerOf(0)).to.equal(auraUser.address);
  });



     // ***************************************again create order to check cancel Order ***************************************




  //approve the marketplace for nft 
  it("aprove the marketplace for nft", async function () {
    const approve = await nft.connect(auraUser).approve(nftMarketplace.address, 0);
  });


//creating order
  it("again create order", async function () {
    const createOrder = await nftMarketplace.connect(auraUser).createOrder(nft.address, 0, ethers.utils.parseEther('7'), "10000000000000000000", Aura.address);
    //console.log(createOrder,"createorder");
  });

//checking ownership after creating order of nft
  it("checking the marketplace take ownership from auraUser", async function () {

    expect(await nft.ownerOf(0)).to.equal(nftMarketplace.address);
  })

  //failing the cancel order  because caller is not owner
  it("Failing:not owner", async function () {
    try {
      const approve = await nftMarketplace.connect(auraUser1).cancelOrder(nft.address, 0);
    } catch (error) {
      console.log("Error:", error.message);
    }
  });

   //failing the cancel order  because of wrong nft address
   it("Failing:wrong contrct address", async function () {
    try {
      const approve = await nftMarketplace.connect(auraUser).cancelOrder(nft1.address, 0);
    } catch (error) {
      console.log("Error:", error.message);
    }
  });

  //canceling the order
  it("cancel order", async function () {
    const approve = await nftMarketplace.connect(auraUser).cancelOrder(nft.address, 0);
  });

  //checking auraUser take ownership  or not
  it("checking the auraUser take ownership from marketplace or not after cancel order", async function () {
    expect(await nft.ownerOf(0)).to.equal(auraUser.address);
  });



  //***************************************Create Auction***************************************

  //approve the marketplace for nft

  it("aprove the marketplace for nft", async function () {
    const approve = await nft.connect(auraUser).approve(nftMarketplace.address, 0);
  });

  //transfer the auras for biding
  it("transfer the aura to buyer of nft ", async function () {
    const approve = await Aura.connect(owner).transfer(bider1.address, "20000000000000000000");
    const approve1 = await Aura.connect(owner).transfer(bider2.address, "30000000000000000000");
    expect(await Aura.balanceOf(bider1.address)).to.equal(ethers.utils.parseEther("20"));
    expect(await Aura.balanceOf(bider2.address)).to.equal(ethers.utils.parseEther("30"));
  });



  it("approve the marketplace by bider", async function () {
    const approve = await Aura.connect(bider1).approve(nftMarketplace.address, "2000000000000000000");
  });
  it("approve the marketplace by bider", async function () {
    const approve = await Aura.connect(bider2).approve(nftMarketplace.address, "3000000000000000000");
  });

  // //failing the acution
  // it("failing:createAuctionByAura",async function(){
  //   const createAcution=await nftMarketplace.connect(auraUser).createAuctionByAura(nft.address,0,"10000000000000000000",2,'ASAS');
  // });


  //checking acution
  it("createAuctionByToken", async function () {
    const createAcution = await nftMarketplace.connect(auraUser)._createAuctionByToken(nft.address, 0, "1000000000000000000",5, Aura.address);
    const balance = await Aura.balanceOf(auraUser.address);
    expect(await nft.ownerOf(0)).to.equal(nftMarketplace.address);
  });

  //***************************************PlaceBid Token***************************************

  //failing the 1st bid by passing wrong contract  address
  it("Failing:placeBid Aura", async function () {
    try {
      const biding = await nftMarketplace.connect(bider1).placeBidToken(nft1.address, 0, "10000000000000000000", Aura.address);

    } catch (error) {
      console.log("Error:", error.message);
    }
  });
  //failing the 1st bid by passing wrong nft the argument
  it("Failing:placeBid Aura", async function () {
    try {
      const biding = await nftMarketplace.connect(bider1).placeBidToken(nft.address, 1, "10000000000000000000", Aura.address);

    } catch (error) {
      console.log("Error:", error.message);
    }
  });
  //failing the 1st bid by  missing one argument
  it("Failing:placeBid Aura", async function () {
    try {
      const biding = await nftMarketplace.connect(bider1).placeBidToken(nft1.address, "2000000000000000000", Aura.address);

    } catch (error) {
      console.log("Error:", error.message);
    }
  });

  //failing the 1st bid by passing less amount 
  it("Failing:passing less amount ", async function () {
    try {
      const biding = await nftMarketplace.connect(bider1).placeBidToken(nft.address, 0, "1",Aura.address);

    } catch (error) {
      console.log("Error:", error.message);
    }
  });

  // place 1st bid with Aura
  it("placeBid tOKEN bid1", async function () {
    const biding = await nftMarketplace.connect(bider1).placeBidToken(nft.address, 0, "2000000000000000000", Aura.address);
    const balance = await Aura.balanceOf(bider1.address);
    console.log(balance, "bider1");
  });

  //place 2nd bid with Aura
  it("placeBid Aura bid2", async function () {
    const balance1 = await Aura.balanceOf(bider2.address);
    console.log(balance1, "bider2");
    const biding = await nftMarketplace.connect(bider2).placeBidToken(nft.address, 0, "3000000000000000000", Aura.address);
    const balance = await Aura.balanceOf(bider2.address);
    console.log(balance, "bider2");
  });


  //***************************************acceptBid in AURA***************************************

  //   //acceptBid in AURA
  //   it("acceptBid",async function(){
  //     const acceptBid=await  nftMarketplace.connect(auraUser).acceptBid(nft.address,0);
  //     expect(await nft.ownerOf(0)).to.equal(bider2.address);
  //     const balance = await Aura.balanceOf(bider2.address);
  //     console.log(balance,"bider2");

  //   });

  //   it("failing:caller not owner",async function(){
  //     try {
  //       const acceptBid=await  nftMarketplace.connect(auraUser1).acceptBid(nft.address,0);
  //     } catch (error) {
  //       console.log(error.message);
  //        }
  //  });
  //  it("failing:passing wrong id",async function(){
  //    try {
  //     const acceptBid=await  nftMarketplace.connect(auraUser).acceptBid(nft.address,1);  
  //    } catch (error) {
  //     console.log(error.message);
  //    }
  //  });

  //  it("failing:missing argument",async function(){
  //    try {
  //     const acceptBid=await  nftMarketplace.connect(auraUser).acceptBid(1);  

  //    } catch (error) {
  //     console.log(error.message);
  //    }
  //  });

  //***************************************cancel acution in Aura***************************************
  // cancel acution in Aura
  it("cancel acution in Aura", async function () {
    const acution = await nftMarketplace.connect(auraUser).cancelAuction(nft.address, 0);
    const balance = await Aura.balanceOf(bider2.address);
    console.log(balance, "bider2CANCEL");
  });
  //caller is not owner
  it("Failing:not owner", async function () {
    try {
      const acution = await nftMarketplace.connect(auraUser1).cancelAuction(nft.address, 0);

    } catch (error) {
      console.log(error.message);
    }
  });
  //unpublished nft
  it("Failing:unpublished nft", async function () {
    try {
      const acution = await nftMarketplace.connect(auraUser).cancelAuction(nft.address, 1);

    } catch (error) {
      console.log(error.message);
    }
  });
  //passing wrong address of contract
  it("Failing:passing wrong address of contract", async function () {
    try {
      const acution = await nftMarketplace.connect(auraUser).cancelAuction(nft1.address, 0);

    } catch (error) {
      console.log(error.message);
    }
  });
  //calling function by marketplace owner
  it("Failing:calling by marketplace owner", async function () {
    try {
      const acution = await nftMarketplace.connect(owner).cancelAuction(nft.address, 0);

    } catch (error) {
      console.log(error.message);
    }
  });

  //      //***************************************Makeoffer by aura***************************************
  //Aura
  it("aprove the marketplace for nft", async function () {
    const approve = await nft.connect(auraUser).approve(nftMarketplace.address, 0);
  });
  it("approve the marketplace by bider", async function () {
    const approve = await Aura.connect(bider1).approve(nftMarketplace.address, "10000000000000000000");
  });
  it("approve the marketplace by bider", async function () {
    const approve = await Aura.connect(bider2).approve(nftMarketplace.address, "20000000000000000000");
  });
  //Solice
  it("approve the marketplace by aurauser", async function () {
    const approve = await Solic.connect(solicUser).approve(nftMarketplace.address, "20000000000000000000");
  });
  it("approve the marketplace by aurauser", async function () {
    const approve = await Solic.connect(solicUser1).approve(nftMarketplace.address, "20000000000000000000");
  });


  it(" makeOffer by bider1", async function () {
    const makeoffer = await nftMarketplace.connect(bider1).makeOffer(nft.address, "10000000000000000000", 0, 3600, Aura.address);
    const makeofferrr = await Aura.balanceOf(bider1.address);
    console.log(makeofferrr, "makeofferrr bider1");

  });

  it("makeOffer by bider2", async function () {
    const makeofferr = await Solic.balanceOf(solicUser.address);
    console.log(makeofferr, "makeofferrr bider2");
    const makeoffer = await nftMarketplace.connect(solicUser).makeOffer(nft.address, "20000000000000000000", 0, 3600, Solic.address);


  });



  //***************************************acceptOffer by Solic***************************************
  //failing not owner
  it("not owner", async function () {
    try {
      const acceptOffer = await nftMarketplace.connect(auraUser1).acceptOffer(nft.address, 0, "20000000000000000000", solicUser.address, Solic.address);

    } catch (error) {
      console.log(error.message);
    }
  });

  //wrong contract address
  it("wrong contract address", async function () {
    try {
      const acceptOffer = await nftMarketplace.connect(auraUser).acceptOffer(nft1.address, 0, "20000000000000000000", solicUser.address, Solic.address);

    } catch (error) {
      console.log(error.message);
    }
  });

//accept offer
  it(" AcceptOffer", async function () {
    const acceptOffer = await nftMarketplace.connect(auraUser).acceptOffer(nft.address, 0, "20000000000000000000", solicUser.address, Solic.address);
    const makeofferrr = await Solic.balanceOf(solicUser.address);
    expect(await nft.ownerOf(0)).to.equal(solicUser.address);
    console.log(makeofferrr, "makeofferrr after");
  });


      //***************************************CHecking biding  function of ETh***************************************

      //approve the marketplace for nft

      it("aprove the marketplace for nft of test1", async function () {
        // expect(await nft1.ownerOf(0)).to.equal(nftOwner1.address);
        const approve = await nft1.connect(nftOwner1).approve(nftMarketplace.address, 0);
      });

      //checking eth of bider1 and bider2
      it("checking eth of bider1 and bider2 ", async function () {
        const balanceETH = await provider.getBalance(bider1.address);
        const balanceETH1 = await provider.getBalance(bider2.address);
        console.log(balanceETH, "balance");
        console.log(balanceETH1, "balance");
      });

      //checking acution
      it("createAuctionByETH", async function () {
        const createAcution = await nftMarketplace.connect(nftOwner1)._createAuctionByEth(nft1.address, 0, ethers.utils.parseEther('1000'),8);
        expect(await nft1.ownerOf(0)).to.equal(nftMarketplace.address);
        const balanceeth = await provider.getBalance(bider1.address);
        console.log(balanceeth, "bider1");
      });

      //failing createAcuctionByEth
      it("Failing:createAcution not owner", async function () {
        try {
          const createAcution = await nftMarketplace.connect(nftOwner)._createAuctionByEth(nft1.address, 0, ethers.utils.parseEther('1000'),9);

        } catch (error) {
          console.log(error.message);
        }
      });
      //wrong contract address
      it("Failing:wrong contract address", async function () {
        try {
          const createAcution = await nftMarketplace.connect(nftOwner1)._createAuctionByEth(nft.address, 0, ethers.utils.parseEther('1000'),9);

        } catch (error) {
          console.log(error.message);
        }
      });
      //passing wrong id of nft
      it("Failing:passing wrong id of nft", async function () {
        try {
          const createAcution = await nftMarketplace.connect(nftOwner1)._createAuctionByEth(nft1.address, 1, ethers.utils.parseEther('1000'),9);

        } catch (error) {
          console.log(error.message);
        }
      });


   //   comment out first the accution order of eth first function
    //  passing wrong value of eth
      it("createAuctionByETH",async function(){
       try {
        const createAcution=await nftMarketplace.connect(nftOwner1)._createAuctionByEth(nft1.address,0,ethers.utils.parseEther('0'),3600,'ETH');

       } catch (error) {
        console.log(error.message);
       }
        });



      //***************************************place bid ETH ***************************************
      //wrong contract address
      it("Failing:wrong contract address", async function () {
        try {
          const biding = await nftMarketplace.connect(bider1).placeBidEth(owner.address, 0, { from: bider1.address, value: ethers.utils.parseEther('1000') });

        } catch (error) {
          console.log(error.message);
        }
      });

      //wrong  nft id
      it("Failing:wrong contract address", async function () {
        try {
          const biding = await nftMarketplace.connect(bider1).placeBidEth(nft1.address, 1, { from: bider1.address, value: ethers.utils.parseEther('1000') });
        } catch (error) {
          console.log(error.message);
        }
      });

      //passing less amount  of eth value
      it("Failing:passing less amount  of eth value", async function () {
        try {
          const biding = await nftMarketplace.connect(bider1).placeBidEth(nft1.address, 0, { from: bider1.address, value: ethers.utils.parseEther('0') });
        } catch (error) {
          console.log(error.message);
        }
      });
          //place bid eth
          it("placeBidEth", async function () {
            const biding = await nftMarketplace.connect(bider1).placeBidEth(nft1.address, 0, { from: bider1.address, value: ethers.utils.parseEther('1000') });
            const balanceeth = await provider.getBalance(bider1.address);
            console.log(balanceeth, "bider1");
          });

      it("placeBidEth2", async function () {
        const biding = await nftMarketplace.connect(bider2).placeBidEth(nft1.address, 0, { from: bider2.address, value: ethers.utils.parseEther('2000') });
        const balanceeth2 = await provider.getBalance(bider2.address);
        console.log(balanceeth2, "bider2");
        const balanceeth1 = await provider.getBalance(bider1.address);
        console.log(balanceeth1, "bider1");
      });
        //***************************************acceptBid in ETH***************************************
   
    //      it("failing:caller not owner",async function(){
    //       try {
    //         const acceptBid=await  nftMarketplace.connect(nftOwner).acceptBid(nft1.address,0);
    //       } catch (error) {
    //         console.log(error.message);
    //          }
    //    });
    //    it("failing:passing wrong id",async function(){
    //      try {
    //       const acceptBid=await  nftMarketplace.connect(nftOwner1).acceptBid(nft.address,1);  
    //      } catch (error) {
    //       console.log(error.message);
    //      }
    //    });

    //    it("failing:missing argument",async function(){
    //      try {
    //       const acceptBid=await  nftMarketplace.connect(auraUser).acceptBid(1);  

    //      } catch (error) {
    //       console.log(error.message);
    //      }
    //    });

    //  //acceptBid in ETH
    //  it("acceptBid in ETH",async function(){
    //   const balanceeth_nft= await provider.getBalance(nftOwner1.address);
    //   console.log(balanceeth_nft, "nftowner balce before accept bid");
    //   const acceptBid=await  nftMarketplace.connect(nftOwner1).acceptBid(nft1.address,0);
    //   expect(await nft1.ownerOf(0)).to.equal(bider2.address);
    //   const balanceeth_nftowner = await provider.getBalance(nftOwner1.address);
    //   console.log(balanceeth_nftowner, "nftowner after accept bid");
    // });  

     //***************************************cancel acution in ETH***************************************
     
      //passing wrong owner
      it("failing:not owner", async function () {
        try {
          const acution = await nftMarketplace.connect(nftOwner).cancelAuction(nft1.address, 0);
        } catch (error) {
          console.log(error.message);
        }
      });

      //passing wrong contract address
      it("failing:not owner", async function () {
        try {
          const acution = await nftMarketplace.connect(nftOwner1).cancelAuction(nft.address, 0);
        } catch (error) {
          console.log(error.message);
        }
      });
      //passing wrong nft id
      it("failing:not owner", async function () {
        try {
          const acution = await nftMarketplace.connect(nftOwner1).cancelAuction(nft1.address, 1);
        } catch (error) {
          console.log(error.message);
        }
      });

       //cancel acution in ETH
       it("cancel acution in ETH", async function () {
        const acution = await nftMarketplace.connect(nftOwner1).cancelAuction(nft1.address, 0);
        expect(await nft1.ownerOf(0)).to.equal(nftOwner1.address);
        const balanceeth1 = await provider.getBalance(bider2.address);
        console.log(balanceeth1, "bider2");
      });


  //      //***************************************Makeoffer by WETH***************************************
  //     it("aprove the marketplace for nft of test1", async function () {
  //       const approve = await nft1.connect(nftOwner1).approve(nftMarketplace.address, 0);
  //     });
  //     it("approve the marketplace by bider", async function () {
  //       const approve = await Weth.connect(wethUser).approve(nftMarketplace.address, "10000000000000000000");
  //     });
  //     it("approve the marketplace by bider", async function () {
  //       const approve = await Weth.connect(wethUser1).approve(nftMarketplace.address, "10000000000000000000");
  //     });


  //     it(" makeOffer by wethuser1",async function(){
  //       const makeoffer=await nftMarketplace.connect(wethUser).makeOffer(nft1.address,"10000000000000000000",0,3600,"WETH");
  //       const makeofferrr=await Weth.balanceOf(wethUser.address);
  //       console.log(makeofferrr,"makeofferrr Wethuser");

  //     });

  //   it("makeOffer by wethuser2",async function(){
  //     const makeoffer=await nftMarketplace.connect(wethUser1).makeOffer(nft1.address,"10000000000000000000",0,3600,"WETH");
  //     const makeofferrr=await Weth.balanceOf(wethUser1.address);
  //       console.log(makeofferrr,"makeofferrr wethuser1");
  //   });

  //   //failing the test
  //   it("makeOffer by wethuser2",async function(){
  //     try {
  //     const makeoffer=await nftMarketplace.connect(wethUser1).makeOffer(nft1.address,"20000000000000000000",0,3600,"WETH");

  //     } catch (error) {
  //       console.log("ERROR makeoffer",error.message);
  //     }
  //   })

  //   //***************************************Acceptoffer by WETH***************************************
  //   //failing the test wrong owner
  //   it("not owner acceptoffer",async function(){
  //     try {
  //       const acceptOffer=await nftMarketplace.connect(nftOwner).acceptOffer(nft1.address,0,"10000000000000000000",wethUser1.address);
  //     } catch (error) {
  //       console.log("ERROR",error.message);
  //     }
  //   });
  //   //failing the test wrong owner
  //   it("not owner acceptoffer",async function(){
  //     try {
  //       const acceptOffer=await nftMarketplace.connect(nftOwner1).acceptOffer(nft.address,0,"10000000000000000000",wethUser1.address);
  //     } catch (error) {
  //       console.log("ERROR",error.message);
  //     }
  //   });

  //   //failing the test wrong nft id
  //   it("wrong nft id",async function(){
  //     try {
  //       const acceptOffer=await nftMarketplace.connect(nftOwner1).acceptOffer(nft1.address,1,"10000000000000000000",wethUser1.address); 
  //     } catch (error) {
  //       console.log("ERROR",error.message);
  //     }
  //   });

  //   //failing the test puting wrong amount
  //   it("invlid amount",async function(){
  //     try {
  //       const acceptOffer=await nftMarketplace.connect(nftOwner1).acceptOffer(nft1.address,1,"1000000000000000000",wethUser1.address); 
  //     } catch (error) {
  //       console.log("ERROR",error.message);
  //     }
  //   });

  //   it("AcceptOffer",async function(){
  //       const acceptOffer=await nftMarketplace.connect(nftOwner1).acceptOffer(nft1.address,0,"10000000000000000000",wethUser1.address); 
  //       const makeofferrr=await Weth.balanceOf(wethUser1.address);
  //       expect(await nft1.ownerOf(0)).to.equal(wethUser1.address);
  //     console.log(makeofferrr,"makeofferrr after wethuser");  

  //   })


});