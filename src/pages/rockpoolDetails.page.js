import { FiClock, FiShare } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";

import {
  ethereum,
  item1,
  item2,
  item3,
  item4,
  item5,
  item6,
  gif1,
  gif2,
  gif3,
  gif4,
  gif5,
  gif6,
  profileDefault,
  collectionDefault,
  openseaIcon,
  greenFlag,
  notAvailableIcon,
} from "../utils/images.util";

const RockpoolDetails = () => {
  const { id } = useParams();

  const AuctionData = [
    {
      image: gif1,
      title: "Deep Sea Phantasy",
      id: 1,
      price: 0.4,
      type: "GIFs",
      progress: 50,
      nfts: 0,
      participants: [
        { id: 0, address: "0x9e6...ef07b", val: 0.0001 },
        { id: 0, address: "0x9e6...ef07b", val: 0.0001 },
      ],
      filter: ["all", "games"],
    },
    {
      image: item1,
      title: "CyberPrimal 042 LAN",
      id: 2,
      price: 0.4,
      type: "Arts",
      progress: 5,
      nfts: 0,
      participants: [],
      filter: ["all", "art"],
    },
    {
      image: gif2,
      title: "Crypto Egg Stamp #5",
      id: 3,
      price: 0.4,
      type: "Games",
      progress: 75,
      nfts: 1,
      participants: [
        { id: 0, address: "0x9e6...ef07b", val: 0.0001 },
        { id: 0, address: "0x9e6...ef07b", val: 0.0001 },
      ],
      filter: ["all", "music", "meme"],
    },
    {
      image: item2,
      title: "Colorful Abstract Painting",
      id: 4,
      price: 0.4,
      type: "Art",
      progress: 12,
      nfts: 1,
      participants: [
        { id: 0, address: "0x9e6...ef07b", val: 0.0001 },
        { id: 0, address: "0x9e6...ef07b", val: 0.0001 },
      ],
      filter: ["all", "video"],
    },
    {
      image: item3,
      title: "Liquid Forest Princess",
      id: 5,
      price: 0.4,
      type: "",
      progress: 18,
      nfts: 1,
      participants: [],
      filter: ["all", "video", "meme"],
    },
    {
      image: gif3,
      title: "Spider Eyes Modern Art",
      id: 6,
      price: 0.4,
      type: "GIFs",
      progress: 25,
      nfts: 1,
      participants: [],
      filter: ["all", "games"],
    },
    {
      image: item4,
      title: "Synthwave Painting",
      id: 7,
      price: 0.4,
      type: "",
      progress: 30,
      nfts: 1,
      participants: [],
      filter: ["all", "art"],
    },
    {
      image: gif4,
      title: "Contemporary Abstract",
      id: 8,
      price: 0.4,
      type: "GIFs",
      progress: 44,
      nfts: 0,
      participants: [
        { id: 0, address: "0x9e6...ef07b", val: 0.0001 },
        { id: 0, address: "0x9e6...ef07b", val: 0.0001 },
      ],
      filter: ["all", "music"],
    },
    {
      image: item5,
      title: "Valkyrie Abstract Art",
      id: 9,
      price: 0.4,
      type: "",
      progress: 21,
      nfts: 1,
      participants: [],
      filter: ["all", "video", "meme"],
    },
    {
      image: gif5,
      title: "The girl with the firefly",
      id: 10,
      price: 0.4,
      type: "",
      progress: 4,
      nfts: 1,
      participants: [],
      filter: ["all", "art"],
    },
    {
      image: item6,
      title: "Dodo hide the seek",
      id: 11,
      price: 0.4,
      type: "",
      progress: 18,
      nfts: 1,
      participants: [],
      filter: ["all", "games"],
    },
    {
      image: gif6,
      title: "Pinky Ocean",
      id: 12,
      price: 0.4,
      type: "",
      progress: 20,
      nfts: 1,
      participants: [
        { id: 0, address: "0x9e6...ef07b", val: 0.0001 },
        { id: 0, address: "0x9e6...ef07b", val: 0.0001 },
      ],
      filter: ["all", "music"],
    },
  ];

  return (
    <section className="bg-item-detail d-table w-100">
      <div className="container">
        <div className="row">
          <div className="col-md-6 text-center">
            <div className="sticky-bar">
              <img
                src={AuctionData[id - 1].image}
                className="img-fluid rounded-md shadow"
                alt=""
              />
              <button className="btn btn-pills btn-soft-primary mt-4">
                <img src={openseaIcon} style={{ paddingRight: 8 }} />
                This NFT is being sold on OpenSea
              </button>
              <div className="hstack gap-3 mt-4 justify-content-center">
                <button className="btn btn-pills btn-soft-primary">
                  <lable>
                    <img src={ethereum} style={{ paddingRight: 8 }} />
                  </lable>
                  Ethereum
                </button>
                <button className="btn btn-pills btn-soft-primary">
                  <span style={{ paddingRight: 8 }}>
                    <FiShare />
                  </span>
                  Share
                </button>
                <button className="btn btn-pills btn-soft-primary">
                  <span style={{ paddingRight: 8 }}>
                    <i className="uil uil-discord"></i>
                  </span>
                  Community
                </button>
              </div>
            </div>
          </div>

          <div className="col-md-6 mt-4 pt-2 mt-sm-0 pt-sm-0">
            <div className="ms-lg-5">
              {AuctionData[id - 1].nfts > 0 ? (
                <div>
                  <h5 className="text-dark d-flex">
                    <img
                      src={greenFlag}
                      width={20}
                      style={{ marginRight: 10 }}
                    />
                    Active Pool
                  </h5>
                  <div className="title-heading">
                    <h4 className="h3 fw-bold mb-0">
                      {AuctionData[id - 1].title}
                    </h4>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mt-4">
                      <h6>Target Price</h6>
                      <h4 className="mb-0 text-gradient-primary">
                        <strong>{AuctionData[id - 1].price} ETH</strong>
                      </h4>
                    </div>
                    <div className="hstack justify-content-start mt-3 gap-3">
                      <small className="text-dark fw-bold">
                        <span style={{ fontSize: 14 }}>Pool Progress</span>
                      </small>

                      <div
                        className="progress"
                        style={{
                          height: 8,
                          backgroundColor: "#3c4858",
                          width: "30%",
                        }}
                      >
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{
                            width: `${AuctionData[id - 1].progress}%`,
                          }}
                        />
                      </div>

                      <small style={{ fontSize: 14, marginLeft: 5 }}>
                        {AuctionData[id - 1].progress}%
                      </small>
                    </div>
                    <div className="col-12 mt-4">
                      <div className="hstack gap-2 mb-3">
                        <FiClock />
                        <h6 className="my-auto text-dark">3 Days</h6>
                      </div>
                      <button className="btn btn-l btn-pills btn-primary">
                        Connect Wallet to Join
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-md-left">
                  <img src={notAvailableIcon} width={"10%"} />
                  <h4 className="mt-3">Item not available</h4>
                  <h5 className="p-4 rounded-md bg-light my-3">
                    This NFT has been purchased.
                  </h5>
                  <Link
                    to="/rockpool"
                    className="btn btn-l btn-pills btn-primary"
                  >
                    Go to the Pools List
                  </Link>
                </div>
              )}
              <div className="row mt-4">
                <div className="col-12">
                  <ul
                    className="nav nav-tabs border-bottom"
                    id="myTab"
                    role="tablist"
                  >
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link active"
                        id="detail-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#detailItem"
                        type="button"
                        role="tab"
                        aria-controls="detailItem"
                        aria-selected="true"
                      >
                        FraPool Details
                      </button>
                    </li>
                    {/* <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="participant-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#participantItem"
                        type="button"
                        role="tab"
                        aria-controls="participantItem"
                        aria-selected="false"
                      >
                        Participants ({AuctionData[id - 1].participants.length})
                      </button>
                    </li> */}
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="desc-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#descriptionItem"
                        type="button"
                        role="tab"
                        aria-controls="descriptionItem"
                        aria-selected="false"
                      >
                        Description
                      </button>
                    </li>
                  </ul>

                  <div className="tab-content mt-3">
                    <div
                      className="tab-pane fade show active"
                      id="detailItem"
                      role="tabpanel"
                      aria-labelledby="detail-tab"
                    >
                      <h3>RockPool Details</h3>
                      <p className="text-dark">
                        Fraction Name
                        <br />
                        <strong>Pathway Home</strong>
                      </p>
                      <p className="text-dark">
                        Fraction
                        <br />
                        <strong>SYMBOL PATH</strong>
                      </p>
                      <p className="text-dark">
                        Reserve Price after Fractionalization
                        <br />
                        <strong>4.5 ETH</strong>
                      </p>
                      <p className="text-dark">
                        Platform’s Fee
                        <br />
                        <strong>5%</strong>
                      </p>
                      <div
                        className="hstack gap-3 bg-light py-3 px-4 rounded"
                        style={{ width: "fit-content" }}
                      >
                        <div className="hstack gap-3">
                          <img src={collectionDefault} width={50} />
                          <p className="text-dark my-auto">
                            Collection
                            <br />
                            <strong>FraArt</strong>
                          </p>
                        </div>
                        <div className="hstack gap-3">
                          <img src={profileDefault} width={50} />
                          <p className="text-dark my-auto">
                            Seller
                            <br />
                            <strong>John</strong>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="descriptionItem"
                      role="tabpanel"
                      aria-labelledby="desc-tab"
                    >
                      <p className="text-muted">
                        Public Pool to purchase Woman #5101. Rarity Ranking #103
                      </p>
                      <div className="hstack justify-content-between bg-light p-3 rounded">
                        <p className="text-dark my-auto">0x9c8a2b3...</p>
                        <p className="text-dark my-auto">Token Id: 21...</p>
                        <p className="text-dark my-auto">Nº of copies: 1/1</p>
                      </div>
                      <div className="hstack gap-3 mt-4">
                        <button className="btn btn-pills btn-soft-primary">
                          View on OpenSea
                        </button>
                        <button className="btn btn-pills btn-soft-primary">
                          Block Explorer
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RockpoolDetails;
