import axios from "axios";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import twitter from "../assets/images/Twitter.svg";
import ether from "../assets/images/etherscan-logo-circle.svg";
import { ParamsContext } from "../context/ParamsProvider";
import { FaEthereum } from "react-icons/fa";
import { BsLightningChargeFill } from "react-icons/bs";
import { AiOutlineStar } from "react-icons/ai";
import { MdShoppingCart } from "react-icons/md";
import { GrTwitter } from "react-icons/gr";
import { BiWorld } from "react-icons/bi";
import { AiOutlineShareAlt } from "react-icons/ai";
import { MdOutlinedFlag } from "react-icons/md";
import { MdLoop } from "react-icons/md";
import { AiOutlineCaretDown } from "react-icons/ai";
import moment from "moment";
import { Button, Modal } from "react-bootstrap";
import metamask from "../assets/images/svg/metamask.svg";
import coinbase from "../assets/images/svg/coinbase.svg";
import wallet from "../assets/images/svg/walletconnect.svg";
import { AiOutlineArrowRight } from "react-icons/ai";

const CollectionDetails = () => {
  const { id } = useParams();
  // const { userId } = useContext(ParamsContext);

  const [collections, setCollections] = useState([]);
  const [collectionsAll, setCollectionsAll] = useState({});
  const [searchCollection, setSearchCollection] = useState([]);
  const [price, setPrice] = useState("2");

  const [collection, setCollection] = useState([]);
  const [value, setValue] = useState("");
  const [visible, setVisible] = useState(false);
  const [attribute, setAttribute] = useState([]);

  const [customAttribues, setCustomAttribute] = useState([]);
  const [searchAtt, setSearchAtt] = useState([]);
  const [myPublicAddress, setMyPublicAddress] = useState("qhut0...hfteh45");

  const isMetaMaskInstalled = useCallback(() => {
    const { ethereum } = window;
    return Boolean(ethereum && ethereum.isMetaMask);
  }, []);

  const checkWalletConnet = useCallback(async () => {
    if (isMetaMaskInstalled()) {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (!!accounts[0]) {
        const walletAddress =
          accounts[0].split("").slice(0, 6).join("") +
          "..." +
          accounts[0]
            .split("")
            .slice(accounts[0].length - 7, accounts[0].length)
            .join("");
        setMyPublicAddress(walletAddress);
      }
    }
  }, [isMetaMaskInstalled]);
  const _handleConnectWallet = useCallback(async () => {
    setShow(false);
    setShownext(false);
    const modal = document.getElementById("modal-metamask");

    if (!isMetaMaskInstalled()) {
      modal.classList.add("show");
      modal.style.display = "block";
      return;
    }
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      const walletAddress =
        accounts[0].split("").slice(0, 6).join("") +
        "..." +
        accounts[0]
          .split("")
          .slice(accounts[0].length - 7, accounts[0].length)
          .join("");
      setMyPublicAddress(walletAddress);
    } catch (error) {
      console.error(error);
    }
  }, [isMetaMaskInstalled]);

  const [show, setShow] = useState(false);

  const [shownext, setShownext] = useState(false);
  // const handleClosenext = () =>{)};
  const handleShownext = () => {
    setTimeout(() => {
      setShownext(true);
    }, 0);
    setShow(false);
  };

  // const volumeHandler = (e) => {
  //   console.log("Input value", e.target.value);
  //   const valN = e.target.value;
  //   const vluSrt = collectionsAll.filter((item) =>
  //     JSON.stringify(item.collection?.volume?.allTime).includes(valN)
  //   );
  //   setCollections(vluSrt);
  //   // parseInt(item?.volume?.allTime) === valN
  //   console.log(vluSrt);
  // };

  const nameHandler = (e) => {
    console.log("Input value", e.target.value);
    const valN = e.target.value;
    const vluSrt = collectionsAll.filter((item) =>
      item.token?.name.toLowerCase().includes(valN)
    );
    setCollections(vluSrt);
    // parseInt(item?.volume?.allTime) === valN
    console.log(vluSrt);
  };

  const handleChange = (event) => {
    const searchValue = event.target.value;

    const searchedData = searchCollection.filter((item) => {
      const searchTerm = searchValue.toLocaleLowerCase();
      const collectionName = item.token?.tokenId.toLocaleLowerCase();
      return searchTerm && collectionName.startsWith(searchTerm);
    });

    if (searchValue.length > 0) {
      setCollections(searchedData);
    } else {
      setCollections(searchCollection);
    }

    console.log(searchedData);
  };

  // modallllllll
  // const isMetaMaskInstalled = useCallback(() => {
  //   const { ethereum } = window;
  //   return Boolean(ethereum && ethereum.isMetaMask);
  // }, []);

  // const _handleConnectWallet = useCallback(async () => {
  //   const modal = document.getElementById("modal-metamask");

  //   if (!isMetaMaskInstalled()) {
  //     modal.classList.add("show");
  //     modal.style.display = "block";
  //     return;
  //   }
  //   try {
  //     await window.ethereum.request({ method: "eth_requestAccounts" });
  //     const accounts = await window.ethereum.request({
  //       method: "eth_accounts",
  //     });
  //     const walletAddress =
  //       accounts[0].split("").slice(0, 6).join("") +
  //       "..." +
  //       accounts[0]
  //         .split("")
  //         .slice(accounts[0].length - 7, accounts[0].length)
  //         .join("");
  //     setMyPublicAddress(walletAddress);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, [isMetaMaskInstalled]);
  // modallllll end
  const handleAttribute = (keys, values) => {
    if (searchAtt.length > 0) {
      searchAtt.map((item) => {
        if (item.keys === keys) {
          item.values = values;
          let x = [...searchAtt];
          // console.log(x);
          return setSearchAtt(x);
        } else {
          return setSearchAtt([...searchAtt, { keys, values }]);
        }
      });
    } else {
      setSearchAtt([...searchAtt, { keys, values }]);
    }
  };

  console.log(searchAtt, "gggg");
  const [prc,setPrc]= useState("")

  const handleCross = (keys, values) => {
    const updateAtt = searchAtt.filter((item) => item.keys !== keys);
    setSearchAtt(updateAtt);
  };

  useEffect(() => {
    axios
      .get(
        `https://api.reservoir.tools/tokens/v5?collection=${id}&sortBy=floorAskPrice&sortDirection=asc&includeTopBid=false&includeAttributes=true&includeDynamicPricing=true&normalizeRoyalties=true`
      )
      .then(
        (response) => {
          setCollections(response.data.tokens);
          setCollectionsAll(response.data.tokens);
        }
        // setCollections(response.data.collections);
      );
  }, []);

  useEffect(() => {
    fetch(`https://api.reservoir.tools/collections/v5?id=${id}`)
      .then((res) => res.json())
      .then((data) => setCollection(data.collections));

    // attribute
  }, []);

  useEffect(() => {
    fetch(`https://api.reservoir.tools/collections/${id}/attributes/all/v2`)
      .then((response) => response.json())
      .then((response) => setCustomAttribute(response.attributes))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    fetch(`
    https://api.reservoir.tools/collections/${id}/attributes/explore/v4`)
      .then((res) => res.json())
      .then((data) => setAttribute(data.attributes));
  }, []);

  useEffect(() => {
    fetch(
      `https://api.reservoir.tools/tokens/v5?collection=${id}&sortBy=floorAskPrice&sortDirection=asc&includeTopBid=false&includeAttributes=true&includeDynamicPricing=true&normalizeRoyalties=true&${searchAtt
        .map((atri) => `attributes%5B${atri.keys}%5D=${atri.values}`)
        .join("&")} `
    )
      .then((res) => res.json())
      .then((data) => {
        setCollections(data.tokens);
        setSearchCollection(data.tokens);
      });
  }, [searchAtt]);

  useEffect(() => {}, [collections]);

  console.log("collec", collections);

  return (
    <div>
      {/* <div
        style={{
          backgroundImage: `url(${collection[0]?.banner})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundBlendMode: "overlay",
          backgroundColor: "rgba(255, 255, 255, 0.685)",
          margin: "80px 0",
        }}
      >
        <div className="text-center py-3">
          <img
            width={100}
            className="rounded-circle"
            src={collection[0]?.image}
            alt=""
          />
          <h2 className="mt-2">{collection[0]?.name}</h2>
          <div className="d-flex justify-content-center mb-3">
            <Link to={"https://twitter.com/" + collection[0]?.twitterUsername}>
              <img className="me-3" width={30} src={twitter} alt="" />
            </Link>
            <Link to={collection[0]?.discordUrl}>
              <img className="me-3" width={30} src={ether} alt="" />
            </Link>
            <Link to={collection[0]?.externalUrl}>
              <i className="fs-3 text-black fa-solid fa-globe"></i>
            </Link>
          </div>
          <div className=" w-50 mx-auto bg-white px-5 py-2 rounded mb-3">
            <div className="row g-5">
              <div className="col-6 col-lg-3">
                <h6>{collection[0]?.tokenCount}</h6>
                <p className="text-secondary p-0 m-0">items</p>
              </div>
              <div className="col-6 col-lg-3">
                <h6>
                  🥈💸{" "}
                  {Math.max(
                    collection[0]?.floorSale["1day"],
                    collection[0]?.floorSale["7day"],
                    collection[0]?.floorSale["30day"]
                  )}
                </h6>
                <p className="text-secondary p-0 m-0">top offer</p>
              </div>
              <div className="col-6 col-lg-3">
                <h6>💸 {collection[0]?.floorAsk?.price?.amount?.decimal}</h6>
                <p className="text-secondary p-0 m-0">floor</p>
              </div>
              <div className="col-6 col-lg-3">
                <h6>
                  💸 {(collection[0]?.volume?.allTime / 1000).toFixed(2)}k
                </h6>
                <p className="text-secondary p-0 m-0">total volume</p>
              </div>
            </div>
          </div>

          {visible ? (
            <p className="w-50 mx-auto fw-bold">{collection[0]?.description}</p>
          ) : (
            <p className="w-50 mx-auto fw-bold">
              {collection[0]?.description &&
                collection[0]?.description.slice(0, 300)}
            </p>
          )}
          <p
            className={
              collection[0]?.description &&
              collection[0]?.description.length < 300
                ? "d-none"
                : "d-block"
            }
            onClick={() => setVisible(!visible)}
          >
            <i className="fa-solid fa-angle-down"></i>
          </p>
        </div>
      </div> */}

      <section style={{ marginTop: "60px" }}>
        <div
          style={{
            backgroundImage: `url(${collection[0]?.banner})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            // backgroundBlendMode: "overlay",
            backgroundColor: "rgba(255, 255, 255, 0.685)",
            height: "200px",
          }}
        ></div>

        <div style={{ marginTop: "-70px" }} className="container ">
          {" "}
          <img
            width={100}
            className="rounded-circle border border-5 "
            src={collection[0]?.image}
            alt=""
          />
        </div>

        <div className="px-4">
          <section className="d-flex flex-column flex-lg-row align-items-center gap-5">
            <div className="d-flex flex-column w-50">
              <h2>{collection[0]?.name}</h2>
              <p className="small-text">{collection[0]?.description}</p>
            </div>

            <div className="w-50 px-3 py-3">
              <div className="d-flex justify-content-end  mb-3 ">
                <Link
                  to={`https://twitter.com/${collection[0]?.twitterUsername}`}
                >
                  <GrTwitter className="me-3 border rounded-circle p-1 d-block fs-3 text-secondary" />
                </Link>
                <Link to={`https://twitter.com/${collection[0]?.externalUrl}`}>
                  <BiWorld className="me-3 border rounded-circle p-1 d-block fs-3 text-secondary" />
                </Link>

                <AiOutlineShareAlt className="me-3 border rounded-circle p-1 d-block fs-3" />
                <MdOutlinedFlag className="me-3 border rounded-circle p-1 d-block fs-3" />
                <span className=" border rounded-pill px-2 d-block ">
                  <AiOutlineStar /> <span>0</span>
                </span>
              </div>

              <div className="row g-4 ">
                <div className="col-12 col-lg-3 border rounded-start py-3 text-center">
                  <p className="text-secondary p-0 m-0">Floor Price</p>
                  <h6>
                    {" "}
                    <FaEthereum />
                    {collection[0]?.floorAsk?.price?.amount?.decimal}
                  </h6>
                </div>
                <div className="col-12 col-lg-3 border  py-3 text-center">
                  <p className="text-secondary p-0 m-0">Total volume</p>
                  <h6>
                    <FaEthereum />
                    {(collection[0]?.volume?.allTime / 1000).toFixed(2)}k
                  </h6>
                </div>
                <div className="col-12 col-lg-3 border  py-3 text-center">
                  <p className="text-secondary p-0 m-0">Items</p>
                  <h6>{collection[0]?.tokenCount}</h6>
                </div>
                <div className="col-12 col-lg-3 border rounded-end py-3 text-center">
                  <p className="text-secondary p-0 m-0">Top Offer</p>
                  <h6>
                    {/* 🥈💸{" "} */}
                    {Math.max(
                      collection[0]?.floorSale["1day"],
                      collection[0]?.floorSale["7day"],
                      collection[0]?.floorSale["30day"]
                    )}
                  </h6>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div className="px-4 d-flex align-items-center justify-content-between">
          <div className=" d-flex align-items-center">
            <div id="itemSearch" className="menu-search mb-0 me-3">
              <form
                role="search"
                method="get"
                id="searchItemform"
                className="searchform"
              >
                <input
                  type="search"
                  className="search p-1 ps-5 pe-5 form-control border rounded "
                  name="s"
                  id="searchItem"
                  // value={value}
                  onChange={handleChange}
                />

                <input
                  className="d-none"
                  type="submit"
                  id="searchItemsubmit"
                  value="Search"
                />
              </form>
            </div>
            <MdLoop className="fs-4 me-3" />
            <p className="d-flex align-items-center mb-0 me-3">
              <span className="live me-2"></span>Live View{" "}
            </p>
            <p className="mb-0 me-3">
              {collections &&
                collections.length > 0 &&
                moment()
                  .startOf("hour")
                  .fromNow(collections[0].token?.lastFlagUpdate)}{" "}
              ago
            </p>
            <p className="mb-0">{collection[0]?.tokenCount} results</p>
          </div>
          <div>
            <select
              className="form-select pointer"
              aria-label="Default select example"
              onChange={(e) => setPrice(e.target.value)}
            >
              <option value="2">Price: Low to High</option>
              <option value="1">Price: High to Low</option>
            </select>
          </div>
        </div>
      </section>

      <div className="py-5 my-5 px-4">
        <div className="row g-5">
          <div className="col-12 col-lg-3">
            <h2>Filter</h2>

            {/* accordion with collection api */}
            {/* <div className="accordion" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    Name
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  className="accordion-collapse collapse show"
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <input
                      className="w-100 py-2 mb-5 px-4"
                      type="text"
                      onChange={(e) => nameHandler(e)}
                      // onChange={(e) => setFilteredData(e.target.value)}
                      placeholder="Search"
                    />
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingTwo">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-expanded="true"
                    aria-controls="collapseTwo"
                  >
                    Volume
                  </button>
                </h2>
                <div
                  id="collapseTwo"
                  className="accordion-collapse collapse show"
                  aria-labelledby="headingTwo"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <input
                      className="w-100 py-2 mb-5 px-4"
                      type="text"
                      // onChange={(e) => volumeHandler(e)}
                      // onChange={(e) => setFilteredData(e.target.value)}
                      placeholder="Search"
                    />
                  </div>
                </div>
              </div>
            </div> */}

            {/* accordion with attribute api */}
            <div className="accordion " id="accordionExample">
              {customAttribues &&
                customAttribues.map((item, index) => (
                  <div className="accordion-item">
                    <h2 className="accordion-header" id={"heading" + index}>
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={"#collapse" + index}
                        aria-expanded="false"
                        aria-controls={"collapse" + index}
                      >
                        {item.key}
                      </button>
                    </h2>
                    <div
                      id={"collapse" + index}
                      className="accordion-collapse collapse"
                      aria-labelledby={"heading" + index}
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body pointer">
                        {item.values?.map((subItem) => (
                          <p
                            onClick={() =>
                              handleAttribute(item.key, subItem.value)
                            }
                          >
                            {subItem.value} - {subItem.count}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          {/* data from user collection */}

          {/* <div>hello</div> */}

          <div className="col-12 col-lg-9">
            {/* <h1>Data from user collection api: {id}</h1> */}
            <div className="d-flex gap-2 mb-3">
              {searchAtt
                .filter(
                  (obj, index, self) =>
                    index === self.findIndex((t) => t.keys === obj.keys)
                )
                .map((item, idx) => (
                  <div className="border p-2 px-3 rounded-pill bg-light d-flex gap-3">
                    <p className="m-0">
                      {" "}
                      {item.keys} {item.values}
                    </p>{" "}
                    <p
                      className="m-0 pointer"
                      onClick={() => handleCross(item.keys, item.values)}
                    >
                      x
                    </p>
                  </div>
                ))}
            </div>
            <div>
              <div className="row g-0 gap-0">
                {/* {collections && collection.length === 0 && (
                  <div>
                    <h1 className="text-danger text-center">
                      No item available in this collection
                    </h1>
                  </div>
                )} */}
                {collections && collections.length > 0 ? (
                  collections
                    .sort((a, b) => {
                      if (price === "2") {
                        return (
                          a.market?.floorAsk?.price?.amount?.decimal -
                          b.market?.floorAsk?.price?.amount?.decimal
                        );
                      } else if (price === "1") {
                        return (
                          b.market?.floorAsk?.price?.amount?.decimal -
                          a.market?.floorAsk?.price?.amount?.decimal
                        );
                      }
                    })
                    // ?.filter((item) => {
                    //   return filteredData.toLowerCase() === ""
                    //     ? item
                    //     : (
                    //         item.collection?.name.toLowerCase() ||
                    //         JSON.stringify(item.collection?.volume?.allTime)
                    //       ).includes(filteredData);
                    // })
                    // .sort((a,b)=> a.market?.floorAsk?.price?.amount
                    // ?.decimal -b.market?.floorAsk?.price?.amount
                    // ?.decimal)
                    .map((collect, index) => (
                      // console.log(collection, "gggg")
                      <div
                        className="col-12 col-md-6 col-lg-3 card "
                        key={index}
                      >
                        <div className="border  m-1 box position-relative">
                          <Link
                            to={`/trendingDetails/${collect.token?.collection?.id}/${collect.token.tokenId}`}
                          >
                            <div className="card__box">
                              <div className="main">
                                <img
                                  className="parent_img w-100"
                                  src={collect.token?.image}
                                  alt=""
                                />
                                <MdShoppingCart className="cart_icon" />
                                <p className="bg-white p-2 rounded">
                                  {" "}
                                  {collect.market?.floorAsk?.price?.amount?.decimal.toFixed(
                                    4
                                  )}
                                </p>
                                <div className="w-100 card_bottom px-4 d-flex justify-content-between align-items-center">
                                  <div className="small-img">
                                    <img
                                      className="rounded-circle"
                                      width={30}
                                      src={collection[0]?.image}
                                      alt=""
                                    />
                                  </div>
                                  <div
                                    style={{ height: "25px", width: "25px" }}
                                    className="text-center bg-light  rounded-circle"
                                  >
                                    <AiOutlineStar className="text-secondary fw-bold" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Link>
                          <div className="text-center mt-3 mx-2">
                            <div className="d-flex px-2 mt-4">
                              <p className="fw-bold mb-0">
                                {" "}
                                #{collect.token?.tokenId}
                              </p>
                              {/* <p>{collection.token?.name}</p>{" "} */}
                            </div>
                            <div className="d-flex justify-content-between px-2">
                              <p>Last Price</p>
                              <p className="text-start ms-4">
                                <FaEthereum />
                                {/* {
                                  collect.market?.floorAsk?.price?.amount
                                    ?.decimal
                                } */}
                                {collect.token?.lastSell?.value}
                              </p>
                            </div>
                            <div class="d-flex align-items-center">
                              <a
                                href="#!"
                                class="w-100  text-primary fw-bold text-center pb-3"
                                // onClick={_handleConnectWallet}
                                id="connectWallet"
                                onClick={() => {setShow(true)
                                setPrc(collect)}}
                              >
                                <BsLightningChargeFill className="me-2" />
                                Buy Now
                              </a>

                              <Modal
                                aria-labelledby="contained-modal-title-vcenter"
                                centered
                                // size="lg"
                                show={show}
                                onHide={() => setShow(false)}
                              >
                                <Modal.Header
                                  closeButton
                                  className="mx-auto border-0 pb-0"
                                >
                                  <Modal.Title className="mx-auto">
                                    Connect Your Wallet
                                  </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                  <p
                                    style={{ fontSize: "14px" }}
                                    className="text-center"
                                  >
                                    By connecting your wallet, you agree to our{" "}
                                    <Link to="#">Terms of Service</Link> and our{" "}
                                    <Link to="#">Privacy Policy</Link> .
                                  </p>
                                  <div
                                    onClick={_handleConnectWallet}
                                    id="connectWallet"
                                    style={{ cursor: "pointer" }}
                                    className="option d-flex justify-content-between align-items-center border-bottom"
                                  >
                                    <p
                                      style={{ fontSize: "20px" }}
                                      className="mb-0 fw-bold"
                                    >
                                      <img src={metamask} alt="" /> MetaMask
                                    </p>
                                    <AiOutlineArrowRight className="icon" />
                                  </div>
                                  <div
                                    style={{ cursor: "pointer" }}
                                    className="option d-flex justify-content-between align-items-center border-bottom"
                                  >
                                    <p
                                      style={{ fontSize: "20px" }}
                                      className="mb-0 fw-bold"
                                    >
                                      <img src={wallet} alt="" /> Wallet Connect
                                    </p>
                                    <AiOutlineArrowRight className="icon" />
                                  </div>

                                  <div
                                    style={{ cursor: "pointer" }}
                                    className="option d-flex justify-content-between align-items-center border-bottom"
                                  >
                                    <p
                                      style={{ fontSize: "20px" }}
                                      className="mb-0 fw-bold"
                                    >
                                      <img src={coinbase} alt="" /> Coinbase
                                      Wallet
                                    </p>
                                    <AiOutlineArrowRight className="icon" />
                                  </div>

                                  <div
                                    onClick={handleShownext}
                                    style={{ cursor: "pointer" }}
                                    className="option d-flex justify-content-between align-items-center border-bottom"
                                  >
                                    <p
                                      style={{ fontSize: "20px" }}
                                      className="mb-0 fw-bold"
                                    >
                                      <img src={coinbase} alt="" /> Bull Pass
                                    </p>
                                    <AiOutlineArrowRight className="icon" />
                                  </div>

                                  <p
                                    style={{ cursor: "pointer" }}
                                    className="text-center cursor-pointer pt-3"
                                  >
                                    I don't have a wallet{" "}
                                  </p>
                                </Modal.Body>
                              </Modal>

                              <Modal show={shownext}>
                                <Modal.Header closeButton>
                                  <Modal.Title>Bull Pass Payment</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                  <form>
                                    <div class="mb-3">
                                      <label
                                        for="exampleFormControlInput1"
                                        class="form-label"
                                      >
                                        Email address
                                      </label>
                                      <input
                                        type="email"
                                        class="form-control"
                                        id="exampleFormControlInput1"
                                      />
                                    </div>

                                    <div class="mb-3">
                                      <p className="text-black">
                                        Price:   <FaEthereum /> {prc.token?.lastSell?.value} 
                                      </p>
                                    </div>
                                  </form>
                                </Modal.Body>
                                <Modal.Footer>
                                  <Button
                                    variant="primary"
                                    onClick={() => setShownext(false)}
                                  >
                                    Submit
                                  </Button>
                                </Modal.Footer>
                              </Modal>
                            </div>
                          </div>
                          {/* <div className="text-center mt-2">
                            <div className="d-flex justify-content-around">
                              <p>{collection.token?.name}</p>{" "}
                              <p className="border rounded px-2">
                                {" "}
                                {collection.token?.rarity}
                              </p>
                            </div>
                            <p className="text-start ms-4">
                              <FaEthereum />
                              {
                                collection.market?.floorAsk?.price?.amount
                                  ?.decimal
                              }
                            </p>
                            <div>
                              <button type="">Buy Now</button>
                            </div>
                          </div> */}
                          {/* <li className="list-inline-item mb-0 me-3">
                            <p
                              id="connectWallet"
                              onClick={_handleConnectWallet}
                            >
                              <span className="btn-icon-dark">
                                <span className="btn btn-icon btn-pills btn-primary">
                                  <i className="uil uil-wallet fs-6"></i>
                                </span>
                              </span>
                              <span className="btn-icon-light">
                                <span className="btn btn-icon btn-pills btn-light">
                                  <i className="uil uil-wallet fs-6"></i>
                                </span>
                              </span>
                            </p>
                          </li> */}
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="mt-5">
                    <h1 className="text-danger text-center">
                      No item available in this collection
                    </h1>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* data from attribute */}
          {/* <div className="col-12 col-lg-9">
            <h1>Data from attributes api: {id}</h1>
            <div>
              <div className="row g-5">
                {attribute.length === 0 && (
                  <div>
                    <h1 className="text-danger text-center">
                      No item available in this collection
                    </h1>
                  </div>
                )}
                {attribute.length > 0 &&
                  attribute
                    ?.filter((item) => {
                      return filteredData.toLowerCase() === ""
                        ? item
                        : item.key.toLowerCase().includes(filteredData);
                    })
                    .map((att, index) => (
                      <div className="col-12 col-md-6 col-lg-3" key={index}>
                        <Link to={`/trendingDetails/${index}`}>
                          {att.sampleImages.map((pic, index) => (
                            <img
                              key={index}
                              className="w-100 my-2"
                              src={pic}
                              alt=""
                            />
                          ))}
                        </Link>
                        <p className="text-center">
                          {att.key} <br />
                          {att.value}
                        </p>
                      </div>
                    ))}
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default CollectionDetails;
