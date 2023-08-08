import React from "react";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

const AuctionSec2 = () => {
  const [sigvalue, setSigvalue] = useState();
  const SIGNING_DOMAIN_NAME = "Voucher-Domain";
  const SIGNING_DOMAIN_VERSION = "1";
  const chainId = 1;
  const contractAddress = "0xa131AD247055FD2e2aA8b156A11bdEc81b9eAD95"; // Put the address here from remix
  const signer = new ethers.Wallet(
    "503f38a9c967ed597e47fe25643985f032b072db8075426a92110f82df48dfcb"
  ); // private key that I use for address 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4

  const domain = {
    name: SIGNING_DOMAIN_NAME,
    version: SIGNING_DOMAIN_VERSION,
    verifyingContract: contractAddress,
    chainId,
  };

  async function createAuctionVoucher(
    tokenId,
    minBid,
    expiryTime,
    createdTime,
    tokenAddress,
    coinAddress
  ) {
    const voucher = {
      tokenId,
      minBid,
      expiryTime,
      createdTime,
      tokenAddress,
      coinAddress,
    };
    const types = {
      AuctionData: [
        { name: "tokenId", type: "uint256" },
        { name: "minBid", type: "uint256" },
        { name: "expiryTime", type: "uint256" },
        { name: "createdTime", type: "uint256" },
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
    var date = new Date();
    var timestamp = date.getTime();
    console.log("timestamp", timestamp);
    const voucher = await createAuctionVoucher(
      0,
      20000000000000000n,
      360,
      timestamp,
      "0x417Bf7C9dc415FEEb693B6FE313d1186C692600F",
      "0x9bF88fAe8CF8BaB76041c1db6467E7b37b977dD7"
    ); // the address is the address which receives the NFT

    const a = `[${voucher.tokenId}, ${voucher.minBid}, ${voucher.expiryTime}, ${voucher.createdTime},"${voucher.tokenAddress}", "${voucher.coinAddress}","${voucher.signature}"]`;

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
        GET your auctionvoucher 2
      </button>
      <h3 className="text-white" style={{ fontFamily: "Burbank" }}>
        Vocher : <p>{sigvalue}</p>
      </h3>
    </div>
  );
};

export default AuctionSec2;
