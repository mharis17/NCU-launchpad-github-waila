import React from "react";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { getJsonWalletAddress } from "ethers/lib/utils";

const Web3Order = () => {
  const [sigvalue, setSigvalue] = useState();
  const SIGNING_DOMAIN_NAME = "Voucher-Domain";
  const SIGNING_DOMAIN_VERSION = "1";
  const chainId = 4;
  let signer;
  const contractAddress = "0x652c9ACcC53e765e1d96e2455E618dAaB79bA595"; // Put the address here from remix

  const domain = {
    name: SIGNING_DOMAIN_NAME,
    version: SIGNING_DOMAIN_VERSION,
    verifyingContract: contractAddress,
    chainId,
  };

  const getJsonWallet = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    // Prompt user for account connections
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();
    console.log("Account:", await signer.getAddress());
  };

  async function createOrderVoucher(
    tokenId,
    ethPrice,
    tokenPrice,
    createdTime,
    tokenAddress,
    coinAddress,
    seller
  ) {
    const voucher = {
      tokenId,
      ethPrice,
      tokenPrice,
      createdTime,
      tokenAddress,
      coinAddress,
      seller,
    };
    const types = {
      Order: [
        { name: "tokenId", type: "uint256" },
        { name: "ethPrice", type: "uint256" },
        { name: "tokenPrice", type: "uint256" },
        { name: "createdTime", type: "uint256" },
        { name: "tokenAddress", type: "address" },
        { name: "coinAddress", type: "address" },
        { name: "seller", type: "address" },
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
    // const voucher = await createVoucher(
    //   0,
    //   1,
    //   "uri",
    //   "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
    //   "0x5FD6eB55D12E759a21C09eF703fe0CBa1DC9d88D"
    // ); // the address is the address which receives the NFT
    // console.log(
    //   `[${voucher.tokenId}, ${voucher.price}, "${voucher.uri}", "${voucher.buyer}","${voucher.contractAD}","${voucher.signature}"]`
    // );
    // const a = `[${voucher.tokenId}, ${voucher.price}, "${voucher.uri}", "${voucher.buyer}","${voucher.contractAD}", "${voucher.signature}"]`;
    // console.log(a);
    // setSigvalue(a)

    const voucher = await createOrderVoucher(
      0,
      1,
      0,
      360,
      "0x438eacEBf3F2a1c3E8560277345E83ff228355bE",
      "0x0000000000000000000000000000000000000000",
      "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4"
    );
    console.log("result", voucher);

    // const b = `[${Ordervoucher.tokenId}, ${Ordervoucher.ethPrice}, ${Ordervoucher.tokenPrice}, "${Ordervoucher.signature}"]`;

    // const b = `[${voucher.tokenId}, ${voucher.ethPrice}, "${voucher.seller}", "${voucher.signature}"]`;

    const b = `[${voucher.tokenId}, ${voucher.ethPrice}, ${voucher.tokenPrice},${voucher.createdTime}, "${voucher.tokenAddress}", "${voucher.coinAddress}", "${voucher.seller}","${voucher.signature}"]`;

    // const b = `[${voucher.tokenId}, ${voucher.price}, "${voucher.uri}", "${voucher.buyer}", "${voucher.signature}"]`;

    console.log(b);
    setSigvalue(b);
  }

  return (
    <div>
      <p>get your voucher to mint lazy nft </p>
      <button
        type="button"
        className="btnn "
        style={{}}
        onClick={() => {
          getJsonWallet();
        }}
      >
        Get Wallet
      </button>{" "}
      <button
        type="button"
        className="btnn "
        style={{}}
        onClick={() => {
          getJsonWallet();
          main();
        }}
      >
        GET your voucher
      </button>
      <h3 className="text-white" style={{ fontFamily: "Burbank" }}>
        Vocher :<p>{sigvalue}</p>
      </h3>
    </div>
  );
};

export default Web3Order;
