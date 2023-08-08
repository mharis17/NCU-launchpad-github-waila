const { expect } = require("chai");
const { isValidName } = require("ethers/lib/utils");
// const { ethers } = require("hardhat");

describe(" NCU_Launchpad SET_FUNCTIONS", function () {
    let owner;
    let address1;
    let address2;
    let Ncu;
    let presale;
    let Public;
    beforeEach(async function () {
        [owner, address1, address2] = await ethers.getSigners();
        console.log("**************************************************** Addresses**************************************************** ")
        console.log(owner.address,"OWNER");
        console.log(address1.address,"ADDRESS1");
        console.log(address2.address, "ADDRESS2");
        console.log("**************************************************** Addresses**************************************************** ")
        
      });
    it("deployment  ", async function () {
        
      

        //deploy publicsaleLaunchpadToken
        const PublicsaleLaunchpadToken = await hre.ethers.getContractFactory("PublicsaleLaunchpadToken");
        Public = await PublicsaleLaunchpadToken.deploy();
        console.log("publicSale address", Public.address);


        // Deploy PresaleLaunchpadToken
        const PresaleLaunchpadToken = await hre.ethers.getContractFactory("PresaleLaunchpadToken");
        presale = await PresaleLaunchpadToken.deploy();
        console.log("presale address", presale.address);


        //Deploy NcuLaunchpad
        const NCU_Launchpad = await hre.ethers.getContractFactory("NCU_Launchpad");
        Ncu = await NCU_Launchpad.deploy();


        //checking owner of NCU_Launchpad;
        const ownerNcu = await Ncu.NCUowner();
        console.log("ownerNcu", ownerNcu);

    });

    it("testing set function ", async function () {
        console.log(await Ncu.presalecontractTax(), "presalecontractTax");
        const setpresalecontractTax = await Ncu.connect(owner).setpresalecontractTax("1000000000000000000");
        expect(await Ncu.presalecontractTax()).to.equal("1000000000000000000");
        console.log(await Ncu.presalecontractTax(), "setpresalecontractTax");
    });

    it("Failing the testing payment function by giving another owner address", async function () {


        try {
            const setpresalecontractTax2 = await Ncu.connect(address2).setpresalecontractTax("1000000000000000000");
            expect(await setpresalecontractTax2).to.equal("1000000000000000000");
        }
        catch (Error) {

            console.log("error : ", Error.message);
        }
    })

    it("testing setpubliccontractTax function", async function () {
        console.log(await Ncu.publiccontractTax(), "publiccontracttax");
        const setpubliccontractTax = await Ncu.connect(owner).setpubliccontractTax("1000000000000000000");
        expect(await Ncu.publiccontractTax()).to.equal("1000000000000000000");
        console.log(await Ncu.publiccontractTax(), "setpubliccontracttax");


    });
    it("Failing the testing by giving another owner address", async function () {
        try {
            const setpubliccontractTax2 = await Ncu.connect(address2).setpubliccontractTax("1000000000000000000");
            expect(await Ncu.publiccontractTax()).to.equal("1000000000000000000");
        }
        catch (Error) {

            console.log("error : ", Error.message);
        }
    });


    it("testing setgenerationTax function", async function () {
        console.log(await Ncu.generationTax(), "generationTax");
        const setgenerationTax = await Ncu.connect(owner).setgenerationTax("1000000000000000000");
        expect(await Ncu.generationTax()).to.equal("1000000000000000000");
        console.log(await Ncu.generationTax(), "setgenerationTax");

    });

    it("Failing the testing by giving another owner address", async function () {
        try {
            const setgenerationTax2 = await Ncu.connect(address2).setgenerationTax("1000000000000000000");
            expect(await Ncu.generationTax()).to.equal("1000000000000000000");
        }
        catch (Error) {

            console.log("error: ", Error.message);
        }

    });


    it("testing setRankingNFTTax function", async function () {
        console.log(await Ncu.RankingNFTTax(), "RankingNFTTax ");
        const setRankingNFTTax = await Ncu.connect(owner).setRankingNFTTax("1000000000000000000");
        expect(await Ncu.RankingNFTTax()).to.equal("1000000000000000000");
        console.log(await Ncu.RankingNFTTax(), "setRankingNFTTax");
    });

    it("Failing the testing by giving another owner address", async function () {
        try {
            const setRankingNFTTax2 = await Ncu.connect(address2).setRankingNFTTax("1000000000000000000");
            expect(await Ncu.RankingNFTTax()).to.equal("1000000000000000000");
        }
        catch (Error) {

            console.log("error : ", Error.message);
        }

    });

    it("testing setuploadIPFStax function", async function () {
        console.log(await Ncu.uploadIPFStax(), "uploadIPFStax");
        const setuploadIPFStax = await Ncu.connect(owner).setuploadIPFStax("1000000000000000000");
        expect(await Ncu.uploadIPFStax()).to.equal("1000000000000000000");
        console.log(await Ncu.uploadIPFStax(), "setuploadIPFStax");

    });

    it("Failing the testing by giving another owner address", async function () {
        try {
            const setuploadIPFStax2 = await Ncu.connect(address2).setuploadIPFStax("1000000000000000000");
            expect(await setuploadIPFStax2).to.equal("1000000000000000000");
        }
        catch (Error) {

            console.log("error", Error.message);
        }

    });

    it("testing _transferOwnership function", async function () {
        console.log(await Ncu.NCUowner(), "Owner of NCU");
        const NCUowner = await Ncu.connect(owner)._transferOwnership(address2.address);
        expect(await Ncu.NCUowner()).to.equal(address2.address);
        console.log(await Ncu.NCUowner(), "NCU new owner");
        const NCUowner1 = await Ncu.connect(address2)._transferOwnership(address1.address);
        console.log(await Ncu.NCUowner(), "Owner of NCU");

    });
    it("Failing the testing by try to tranfer ownership by other address not by owner", async function () {
        try {
            console.log(await Ncu.NCUowner(), "Owner1 of NCU");
            const NCUowner = await Ncu.connect(address2)._transferOwnership(address1.address);
            expect(await Ncu.NCUowner()).to.equal(address1.address);
        }
        catch (Error) {

            console.log("error", Error.message);
        }

    });

    it("testing setwallet function", async function () {
        console.log(await Ncu.wallet(), "wallet address");
        const Setwallet = await Ncu.connect(address1).setwallet(address2.address);
        console.log(await Ncu.wallet(), "new wallet address set");


    });
    it("failing the the test by try to setwallet  by other address not by owner", async function () {
        try {
            console.log(await Ncu.wallet(), "wallet address");
            const Setwallet2 = await Ncu.connect(owner).setwallet(address1.address);
            expect(await Ncu.wallet()).to.equal(address1.address);
            
        }
        catch (Error) {

            console.log("error : ", Error.message);
        }

    })

        it("testing payment", async function(){

            const presalecontractTax = await Ncu.presalecontractTax();
            const payment = await Ncu.connect(owner).payment('generation', { from: owner.address, value: presalecontractTax });
        });

        it("FAILING THE TESTING BY GIVING GREATER AMOUNT",async function(){
            try {
                const payment2=await Ncu.connect(address1).payment("generation",{from:address1.address, value:"3000000000000000000"});
                      
                  }
                  catch (Error) {
          
                      console.log("error : ", Error.message);
                  }
        });

        it("Failing the test by giving function  wrong input generationss",async function(){
            try {
                const payment2=await Ncu.connect(address1).payment("generationss",{from:address1.address, value:"1000000000000000000"});
                      
                  }
                  catch (Error) {
          
                      console.log("error : ", Error.message);
                  }
        });

});


describe(" NCU_Launchpad  ClonePresale", function () {
    let owner;
    let address1;
    let address2;
    let Ncu;
    let presale;
    let Public;
    beforeEach(async function () {
        [owner, address1, address2] = await ethers.getSigners();
        console.log("**************************************************** Addresses**************************************************** ")
        console.log(owner.address,"OWNER");
        console.log(address1.address,"ADDRESS1");
        console.log(address2.address, "ADDRESS2");
        console.log("**************************************************** Addresses**************************************************** ")
        
      });


    it("deployment  ", async function () {
        //deploy publicsaleLaunchpadToken
        const PublicsaleLaunchpadToken = await hre.ethers.getContractFactory("PublicsaleLaunchpadToken");
        Public = await PublicsaleLaunchpadToken.deploy();
        console.log("publicSale address", Public.address);


        // Deploy PresaleLaunchpadToken
        const PresaleLaunchpadToken = await hre.ethers.getContractFactory("PresaleLaunchpadToken");
        presale = await PresaleLaunchpadToken.deploy();
        console.log("presale address", presale.address);


        //Deploy NcuLaunchpad
        const NCU_Launchpad = await hre.ethers.getContractFactory("NCU_Launchpad");
        Ncu = await NCU_Launchpad.deploy();


        //checking owner of NCU_Launchpad;
        const ownerNcu = await Ncu.NCUowner();
        console.log("ownerNcu", ownerNcu);

    });


    it("testing clonePresale",async function(){

    //   const clonePresale=await Ncu.connect(address1).clonePresale("erc20","ERC",100000,1000,5,1000,2,1,"coyo/",5,"0xc70ae8cea38cf32b397edb25f7eccbe9421cc9d2b8263d6f910cfba0e41fec1b", { from: address1.address, value:"2000000000000000000"} );
      //console.log("clonepresale",clonePresale);
     await expect(Ncu.connect(address1).clonePresale("erc20","ERC",10000,1000,5,1000,2,1,"coyo/",5,"0xc70ae8cea38cf32b397edb25f7eccbe9421cc9d2b8263d6f910cfba0e41fec1b", { from: address1.address, value:"2000000000000000000"} )).to.emit(Ncu,"TokenDeployed").withArgs('0x4AE5AF759E17599107c1C688bfaCF6131C376D51');

    });
    it("failing the test by passing the string in int(you)", async function () {
        try {
      await expect(Ncu.connect(address1).clonePresale("erc20","ERC","you",1000,5,1000,2,1,"coyo/",5,"0xc70ae8cea38cf32b397edb25f7eccbe9421cc9d2b8263d6f910cfba0e41fec1b", { from: address1.address, value:"2000000000000000000"} )).to.emit(Ncu,"TokenDeployed").withArgs('0x05242D4AC717Cdf38C36AF290F2b0DA99AA82c67');
            
        }
        catch (Error) {

            console.log("error : ", Error.message);
        }

    });

    it("failing the test by missing one argument", async function () {
        try {
      await expect(Ncu.connect(address1).clonePresale("erc20","ERC",10000,1000,1000,2,1,"coyo/",5,"0xc70ae8cea38cf32b397edb25f7eccbe9421cc9d2b8263d6f910cfba0e41fec1b", { from: address1.address, value:"2000000000000000000"} )).to.emit(Ncu,"TokenDeployed").withArgs('0x05242D4AC717Cdf38C36AF290F2b0DA99AA82c67');
            
        }
        catch (Error) {

            console.log("error : ", Error.message);
        }
    });

    it("failing the test by passing wrong amount of eth ", async function () {
        try {
               const clonePresale=await Ncu.connect(address1).clonePresale("erc20","ERC",100000,1000,5,1000,2,1,"coyo/",5,"0xc70ae8cea38cf32b397edb25f7eccbe9421cc9d2b8263d6f910cfba0e41fec1b", { from: address1.address, value:"1000000000000000000"} );
              // console.log("clonepresale",clonePresale);
        }
        catch (Error) {

            console.log("error : ", Error.message);
        }

    });


});



describe(" NCU_Launchpad  ClonePublic", function () {
    let owner;
    let address1;
    let address2;
    let Ncu;
    let presale;
    let Public;
    beforeEach(async function () {
        [owner, address1, address2] = await ethers.getSigners();
        console.log("**************************************************** Addresses**************************************************** ")
        console.log(owner.address,"OWNER");
        console.log(address1.address,"ADDRESS1");
        console.log(address2.address, "ADDRESS2");
        console.log("**************************************************** Addresses**************************************************** ")
        
      });
    it("deployment  ", async function () {
        
      

        //deploy publicsaleLaunchpadToken
        const PublicsaleLaunchpadToken = await hre.ethers.getContractFactory("PublicsaleLaunchpadToken");
        Public = await PublicsaleLaunchpadToken.deploy();
        console.log("publicSale address", Public.address);


        // Deploy PresaleLaunchpadToken
        const PresaleLaunchpadToken = await hre.ethers.getContractFactory("PresaleLaunchpadToken");
        presale = await PresaleLaunchpadToken.deploy();
        console.log("presale address", presale.address);


        //Deploy NcuLaunchpad
        const NCU_Launchpad = await hre.ethers.getContractFactory("NCU_Launchpad");
        Ncu = await NCU_Launchpad.deploy();


        //checking owner of NCU_Launchpad;
        const ownerNcu = await Ncu.NCUowner();
        console.log("ownerNcu", ownerNcu);

    });


    it("testing clonePublic",async function(){
        // const clonePublic=await Ncu.connect(address1).clonePublic("erc20","ERC",100000,5,1000,1,"coyo/",{ from: address1.address, value:"2000000000000000000"} );
        //  console.log("clonePublic",clonePublic);
         await expect(Ncu.connect(address1).clonePublic("erc20","ERC",10000,5,1000,1,"coyo/",{ from: address1.address, value:"2000000000000000000"} )).to.emit(Ncu,"TokenDeployed").withArgs('0x29BDCBc116f3775698AE0ffE5F8fbBaf95F240CF');

    });
    it("failing the test by passing the string in int(hi)", async function () {
        try {
             const clonePublic=await Ncu.connect(address1).clonePublic("erc20","ERC","hi",5,1000,1,"coyo/",{ from: address1.address, value:"2000000000000000000"} );
             console.log("clonePublic",clonePublic);  
        }
        catch (Error) {

            console.log("error : ", Error.message);
        }
    });

    it("failing the test by missing one argument", async function () {
        try {
             const clonePublic=await Ncu.connect(address1).clonePublic("erc20","ERC",10000,5,1000,"coyo/",{ from: address1.address, value:"2000000000000000000"} );
             console.log("clonePublic",clonePublic);  
        }
        catch (Error) {

            console.log("error : ", Error.message);
        }
    });

    it("failing the test by passing wrong amount of eth ", async function () {
        try {
            const clonePublic=await Ncu.connect(address1).clonePublic("erc20","ERC",100000,5,1000,1,"coyo/",{ from: address1.address, value:"1000000000000000000"} );
             console.log("clonePublic",clonePublic);  
        }
        catch (Error) {

            console.log("error : ", Error.message);
        }
    });



});


