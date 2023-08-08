import React from "react";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

const OrderSec = () => {
  const [sigvalue, setSigvalue] = useState();
  const SIGNING_DOMAIN_NAME = "Voucher-Domain";
  const SIGNING_DOMAIN_VERSION = "1";
  const chainId = 1;
  const contractAddress = "0x540d7E428D5207B30EE03F2551Cbb5751D3c7569"; // Put the address here from remix
  const signer = new ethers.Wallet(
    "503f38a9c967ed597e47fe25643985f032b072db8075426a92110f82df48dfcb"
  ); // private key that I use for address 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4

  const domain = {
    name: SIGNING_DOMAIN_NAME,
    version: SIGNING_DOMAIN_VERSION,
    verifyingContract: contractAddress,
    chainId,
  };

  async function createOrderVoucher(
    tokenId,
    ethPrice,
    tokenPrice,
    createdTime,
    tokenAddress,
    coinAddress
    // seller
  ) {
    const voucher = {
      tokenId,
      ethPrice,
      tokenPrice,
      createdTime,
      tokenAddress,
      coinAddress,
      // seller,
    };
    const types = {
      Order: [
        { name: "tokenId", type: "uint256" },
        { name: "ethPrice", type: "uint256" },
        { name: "tokenPrice", type: "uint256" },
        { name: "createdTime", type: "uint256" },
        { name: "tokenAddress", type: "address" },
        { name: "coinAddress", type: "address" },
        // { name: "seller", type: "address" },
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
    const voucher = await createOrderVoucher(
      2,
      1000000000000000000n,
      1000000000000000000n,
      361,
      "0x0498B7c793D7432Cd9dB27fb02fc9cfdBAfA1Fd3",
      "0x0000000000000000000000000000000000000000"
      // "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4"
    );
    console.log("result", voucher);

    // const b = `[${voucher.tokenId}, ${voucher.ethPrice},"${voucher.tokenAddress}","${voucher.seller}", "${voucher.signature}"]`;

    const b = `[${voucher.tokenId}, ${voucher.ethPrice}, ${voucher.tokenPrice},${voucher.createdTime}, "${voucher.tokenAddress}", "${voucher.coinAddress}","${voucher.signature}"]`;

    console.log(b);
    setSigvalue(b);
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
        GET your ordervoucher 2
      </button>
      <h3 className="text-white" style={{ fontFamily: "Burbank" }}>
        Vocher : <p>{sigvalue}</p>
      </h3>
    </div>
  );
};

export default OrderSec;
