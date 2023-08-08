import React from "react";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

const OfferSec = () => {
  const [sigvalue, setSigvalue] = useState();
  const SIGNING_DOMAIN_NAME = "Voucher-Domain";
  const SIGNING_DOMAIN_VERSION = "1";
  const chainId = 1;
  const contractAddress = "0xb27A31f1b0AF2946B7F582768f03239b1eC07c2c"; // Put the address here from remix
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

  async function createOfferVoucher(
    tokenId,
    Price,
    time,
    tokenAddress,
    coinAddress
  ) {
    const voucher = { tokenId, Price, time, tokenAddress, coinAddress };
    const types = {
      Offer: [
        { name: "tokenId", type: "uint256" },
        { name: "Price", type: "uint256" },
        { name: "time", type: "uint256" },
        { name: "tokenAddress", type: "address" },
        { name: "coinAddress", type: "address" },

        // { name: "contractAD", type: "address" },
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
    const voucher = await createOfferVoucher(
      1,
      1000000000000000000n,
      360,
      "0xaE036c65C649172b43ef7156b009c6221B596B8b",
      "0xcD6a42782d230D7c13A74ddec5dD140e55499Df9"
    ); // the address is the address which receives the NFT

    const a = `[${voucher.tokenId}, ${voucher.Price},${voucher.time}, "${voucher.tokenAddress}","${voucher.coinAddress}","${voucher.signature}"]`;

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
        GET your OfferVoucher 3
      </button>
      <h3 className="text-white" style={{ fontFamily: "Burbank" }}>
        Vocher : <p>{sigvalue}</p>
      </h3>
    </div>
  );
};

export default OfferSec;
