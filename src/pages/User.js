import React, { useCallback, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import metamask from "../assets/images/svg/metamask.svg";
import coinbase from "../assets/images/svg/coinbase.svg";
import wallet from "../assets/images/svg/walletconnect.svg";
import { FaEthereum } from "react-icons/fa";

const User = () => {
  const { pid } = useParams();
  const { token } = useParams();
  const [isloading, setIsloading] = useState(true);
  const [collection, setCollection] = useState({});
  const [attribute, setAttribute] = useState([]);
  const [myPublicAddress, setMyPublicAddress] = useState("qhut0...hfteh45");
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");

  const [shownext, setShownext] = useState(false);

  const [payment, setPayment] = useState("");
  useEffect(() => {
    fetch("http://localhost:8080/PaymentAPI/dhhasansaha11@gmail.com/10000")
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);

  const handleShownext = () => {
    setTimeout(() => {
      setShownext(true);
    }, 0);
    setShow(false);
  };
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

  const handleSubmit = (price) => {
    // fetch(`https://test-panda.opediatech.com/PaymentAPI/dhhasansaha11@gmail.com/100`)
    fetch(`https://test-panda.opediatech.com/PaymentAPI/${email}/${price}`)
      .then((res) => res.json())
      .then((data) => {
        if (data === "success") {
          setShownext(false);
          setTimeout(() => {
            alert("Payment Successful");
          }, 150);
        }
      });
    // setShownext(false)
  };

  useEffect(() => {
    fetch(`https://api.opensea.io/api/v1/asset/${pid}/${token}`)
      .then((res) => res.json())
      .then((data) => {
        setCollection(data);
        setIsloading(false);
      });
  }, []);
  useEffect(() => {
    fetch(`
    https://api.reservoir.tools/collections/${pid}/attributes/explore/v4`)
      .then((res) => res.json())
      .then((data) => setAttribute(data.attributes));
  }, []);

  const newAttribute = [];
  for (let i = 0; i < attribute.length; i++) {
    let neww = attribute[i];
    if (!attribute.includes) {
      newAttribute.push(neww);
    }
  }
  const uniqueArr = attribute.filter(
    (obj, index, self) => index === self.findIndex((t) => t.key === obj.key)
  );

  // console.log("trending page", pid);
  console.log("trending collection: ", collection);
  // console.log("trending collection: single", collection[0]);

  return (
    <>
      {isloading ? (
        ""
      ) : (
        <div>
          <div className="container py-5 my-5">
            <div className="row g-5">
              <div className="col-12 col-lg-6">
                <img
                  className="w-100 border rounded"
                  src={collection?.image_url}
                  alt=""
                />
                <div className="border rounded p-3 my-3">
                  <h3>Collection Info</h3>
                  <div className="d-flex align-items-center mb-3">
                    <img
                      width={30}
                      className="rounded-circle me-3"
                      src={collection?.asset_contract?.image_url}
                      alt=""
                    />
                    <h6> {collection?.asset_contract?.name}</h6>
                  </div>
                  <p> {collection?.asset_contract?.description}</p>
                </div>
                <div className="border rounded p-3">
                  <div className="d-flex justify-content-between">
                    <h3>Token Info</h3>
                    <h3>💎💰</h3>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p> Contract Address :</p>
                    <p className="fw-bold text-primary">
                      {" "}
                      {collection?.asset_contract?.address
                        ? collection?.asset_contract?.address.slice(0, 4) +
                          "..." +
                          collection?.asset_contract?.address.slice(
                            collection?.asset_contract?.address.length - 4,
                            collection?.asset_contract?.address.length
                          )
                        : "not available"}
                    </p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p> Token ID :</p>
                    <p className="fw-bold">
                      {" "}
                      {collection?.token_id
                        ? collection?.token_id
                        : "not available"}
                    </p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p> Token Standard :</p>
                    <p className="fw-bold">
                      {" "}
                      {collection?.asset_contract?.schema_name
                        ? collection?.asset_contract?.schema_name
                        : "not available"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-6">
                <div className="border rounded p-3 mb-3">
                  <div className="d-flex align-items-center">
                    {collection && (
                      <img
                        width={30}
                        className="rounded-circle me-3"
                        src={
                          collection?.top_ownerships[0]?.owner?.profile_img_url
                        }
                        alt=""
                      />
                    )}

                    <h3>{collection?.name}</h3>
                  </div>
                  <h6>Owner</h6>

                  {collection?.top_ownerships.length > 0 &&
                  collection?.top_ownerships[0]?.owner?.address ? (
                    <p>
                      {collection?.top_ownerships[0]?.owner?.address.slice(
                        0,
                        4
                      ) +
                        "..." +
                        collection?.top_ownerships[0]?.owner?.address?.slice(
                          collection?.top_ownerships[0]?.owner?.address
                            ?.length - 4,
                          collection?.top_ownerships[0]?.owner?.address?.length
                        )}
                    </p>
                  ) : (
                    <p>No Owner</p>
                  )}
                </div>

                <div className="border rounded p-3 mb-3">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h5>List Price</h5>
                      <p>
                        {collection?.collection?.stats?.one_day_average_price
                          ? collection?.collection?.stats?.one_day_average_price.toFixed(
                              4
                            )
                          : "-"}
                      </p>
                    </div>
                    <div>
                      <h5>Top Offer</h5>
                      {/* {Math.max(
              collection?.floorSale["1day"],
              collection?.floorSale["7day"],
              collection?.floorSale["30day"]
            )} */}
                      {collection?.collection?.stats?.thirty_day_average_price
                        ? collection?.collection?.stats?.thirty_day_average_price.toFixed(
                            4
                          )
                        : "-"}
                    </div>
                  </div>
                  <a
                    // onClick={_handleConnectWallet}
                    id="connectWallet"
                    className="btn btn-primary"
                    onClick={() => setShow(true)}
                  >
                    Buy Now
                  </a>
                </div>
                <Modal
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                  // size="lg"
                  show={show}
                  onHide={() => setShow(false)}
                >
                  <Modal.Header closeButton className="mx-auto border-0 pb-0">
                    <Modal.Title className="mx-auto">
                      Connect Your Wallet
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <p style={{ fontSize: "14px" }} className="text-center">
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
                      <p style={{ fontSize: "20px" }} className="mb-0 fw-bold">
                        <img src={metamask} alt="" /> MetaMask
                      </p>
                      <AiOutlineArrowRight className="icon" />
                    </div>
                    <div
                      style={{ cursor: "pointer" }}
                      className="option d-flex justify-content-between align-items-center border-bottom"
                    >
                      <p style={{ fontSize: "20px" }} className="mb-0 fw-bold">
                        <img src={wallet} alt="" /> Wallet Connect
                      </p>
                      <AiOutlineArrowRight className="icon" />
                    </div>

                    <div
                      style={{ cursor: "pointer" }}
                      className="option d-flex justify-content-between align-items-center border-bottom"
                    >
                      <p style={{ fontSize: "20px" }} className="mb-0 fw-bold">
                        <img src={coinbase} alt="" /> Coinbase Wallet
                      </p>
                      <AiOutlineArrowRight className="icon" />
                    </div>

                    <div
                      onClick={handleShownext}
                      style={{ cursor: "pointer" }}
                      className="option d-flex justify-content-between align-items-center border-bottom"
                    >
                      <p style={{ fontSize: "20px" }} className="mb-0 fw-bold">
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
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>

                      <div class="mb-3">
                        <p className="text-black">
                          Price: <FaEthereum />{" "}
                          {collection?.collection?.stats?.one_day_average_price
                            ? collection?.collection?.stats?.one_day_average_price.toFixed(
                                4
                              )
                            : "-"}
                        </p>
                      </div>
                    </form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="primary"
                      // onClick={() => setShownext(false)}
                      onClick={() =>
                        handleSubmit(
                          collection?.collection?.stats?.one_day_average_price
                        )
                      }
                    >
                      Submit
                    </Button>
                  </Modal.Footer>
                </Modal>

                {/* <div className="border rounded p-3">
                  <h6>Attributes</h6>
                  <div className="row g-3">
                    {uniqueArr.map((att, index) => (
                      <div key={index} className="col-12 col-lg-6 ">
                        <div className="bg-light rounded p-3">
                          <p className="text-primary p-0 m-0"> {att?.key}</p>
                          <div className="d-flex justify-content-between">
                            <div>
                              <h6 className="p-0 m-0"> {att?.value}</h6>
                              <p className="p-0 m-0">
                                {att?.tokenCount} ({att?.onSaleCount / 100}%)
                              </p>
                            </div>
                            <div>
                              <h6 className="p-0 m-0">
                                {" "}
                                {att?.floorAskPrices}
                              </h6>
                              <p className="p-0 m-0">floor price</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div> */}

                <div className="border rounded p-3">
                  <h6>Attributes</h6>
                  <div className="row g-3">
                    {collection.traits?.map((att, index) => (
                      <div key={index} className="col-12 col-lg-6 ">
                        <div className="bg-light rounded p-3">
                          <p className="text-primary p-0 m-0">
                            {" "}
                            {att?.trait_type}
                          </p>
                          <div className="d-flex justify-content-between">
                            <div>
                              <h6 className="p-0 m-0"> {att?.value}</h6>
                              <p className="p-0 m-0">{att?.trait_count}</p>
                            </div>
                            {/* <div>
                              <h6 className="p-0 m-0">
                                {" "}
                                {att?.floorAskPrices}
                              </h6>
                              <p className="p-0 m-0">floor price</p>
                            </div> */}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="row g-5 my-5">
    <h1 className="text-center">Sample Images</h1>
    {collection[0]?.sampleImages?.length === 0 && (
      <h1 className="text-danger text-center my-5">
        No Sample Image Available
      </h1>
    )}
    {collection[0]?.sampleImages?.map((pic, index) => (
      <div className="col-3" key={index}>
        <img className="w-100" src={pic} alt="" />
      </div>
    ))}
  </div> */}

            {/* <div
              class="modal fade"
              id="exampleModalToggle"
              aria-hidden="true"
              aria-labelledby="exampleModalToggleLabel"
              tabindex="-1"
            >
              <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalToggleLabel">
                      Wallet
                    </h5>
                    <button
                      type="button"
                      class="btn-close "
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      X
                    </button>
                  </div>
                  <div class="modal-body">
                    Empower your NFT Journey with buy and sell fractions of NFTs
                  </div>
                  <div class="modal-footer">
                    <button class="btn btn-primary">Buy</button>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      )}
    </>
  );
};

export default User;
