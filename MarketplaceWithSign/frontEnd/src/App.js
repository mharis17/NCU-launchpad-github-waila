// import logo from "./logo.svg";
// import "./App.css";
import LazyNft from "./web3NftPage";
// import LaztNft1 from "./lazynft1";
import OrderSec from "./orderSec";
import AuctionSec2 from "./AuctionSec";
import BidSec from "./BidSec.js";
import OfferSec from "./OfferSec";
import Web3Order from "./web3NftPage";
function App() {
  return (
    <>
      {/* <LazyNft /> */}
      {/* <LaztNft1 /> */}
      <Web3Order />
      <OrderSec />
      <AuctionSec2 />
      <BidSec />
      <OfferSec />
    </>
  );
}

export default App;
