import React from "react";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

const BidSec = () => {
  const [sigvalue, setSigvalue] = useState();
  const SIGNING_DOMAIN_NAME = "Voucher-Domain";
  const SIGNING_DOMAIN_VERSION = "1";
  const chainId = 1;
  const contractAddress = "0xa131AD247055FD2e2aA8b156A11bdEc81b9eAD95"; // Put the address here from remix
  const signer = new ethers.Wallet(
    "7e5bfb82febc4c2c8529167104271ceec190eafdca277314912eaabdb67c6e5f"
  ); // private key that I use for address 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4

  const domain = {
    name: SIGNING_DOMAIN_NAME,
    version: SIGNING_DOMAIN_VERSION,
    verifyingContract: contractAddress,
    chainId,
  };

  //   const getJsonWallet = async () => {
  //     const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  //     // Prompt user for account connections
  //     await provider.send("eth_requestAccounts", []);
  //     signer = provider.getSigner();
  //     console.log("Account:", await signer.getAddress());
  //   };

  async function createBidVoucher(
    tokenId,
    tokenPrice,
    tokenAddress,
    coinAddress
  ) {
    const voucher = { tokenId, tokenPrice, tokenAddress, coinAddress };
    const types = {
      BidData: [
        { name: "tokenId", type: "uint256" },
        { name: "tokenPrice", type: "uint256" },
        { name: "tokenAddress", type: "address" },
        { name: "coinAddress", type: "address" },
      ],
    };

    const signature = await signer._signTypedData(domain, types, voucher);
    // debugger;
    // console.log("data", { ...voucher, signature });
    return {
      ...voucher,
      signature,
    };
  }

  async function main() {
    const voucher = await createBidVoucher(
      0,
      30000000000000000n,
      "0x417Bf7C9dc415FEEb693B6FE313d1186C692600F",
      "0x9bF88fAe8CF8BaB76041c1db6467E7b37b977dD7"
    ); // the address is the address which receives the NFT

    const a = `[${voucher.tokenId}, ${voucher.tokenPrice}, "${voucher.tokenAddress}", "${voucher.coinAddress}","${voucher.Bidder}", "${voucher.signature}"]`;

    console.log(a);
    setSigvalue(a);
  }

  return (
    <div>
      <button
        type="button"
        className="btnn "
        style={{}}
        onClick={() => {
          main();
        }}
      >
        GET your bidvoucher 3
      </button>
      <h3 className="text-white" style={{ fontFamily: "Burbank" }}>
        Vocher : <p>{sigvalue}</p>
      </h3>
    </div>
  );
};

export default BidSec;
