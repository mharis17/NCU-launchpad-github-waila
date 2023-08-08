import React from "react";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

const LaztNft1 = () => {
  const [sigvalue, setSigvalue] = useState();
  const SIGNING_DOMAIN_NAME = "Voucher-Domain";
  const SIGNING_DOMAIN_VERSION = "1";
  const chainId = 1;
  const contractAddress = "0xF347b87F125F061798867c06CFe05c77Ee80BE8C"; // Put the address here from remix
  const signer = new ethers.Wallet(
    "503f38a9c967ed597e47fe25643985f032b072db8075426a92110f82df48dfcb"
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

  async function createVoucher(tokenId, price, uri, buyer) {
    const voucher = { tokenId, price, uri, buyer };
    const types = {
      LazyNFTVoucher: [
        { name: "tokenId", type: "uint256" },
        { name: "price", type: "uint256" },
        { name: "uri", type: "string" },
        { name: "buyer", type: "address" },
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
    const voucher = await createVoucher(
      0,
      1,
      "uri",
      "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2"
      // "0x8431717927C4a3343bCf1626e7B5B1D31E240406"
    ); // the address is the address which receives the NFT
    console.log(
      `[${voucher.tokenId}, ${voucher.price}, "${voucher.uri}", "${voucher.buyer}","${voucher.contractAD}","${voucher.signature}"]`
    );
    // window.alert(
    //   `[${voucher.tokenId}, ${voucher.price}, "${voucher.uri}", "${voucher.buyer}", "${voucher.signature}"]`
    // );

    const a = `[${voucher.tokenId}, ${voucher.price}, "${voucher.uri}", "${voucher.buyer}", "${voucher.signature}"]`;
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
        GET your voucher 1
      </button>
      <h3 className="text-white" style={{ fontFamily: "Burbank" }}>
        Vocher : <p>{sigvalue}</p>
      </h3>
    </div>
  );
};

export default LaztNft1;
