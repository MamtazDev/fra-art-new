import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ParamsContext } from "../context/ParamsProvider";
import { FaEthereum } from "react-icons/fa";
import CollectionNav from "./CollectionNav";
import { AuthStateContext } from "../context/authContext";
import { useTranslation } from "react-i18next";

const TopCollection = () => {
  const { t } = useTranslation();
  // const [volumeCollection, setVolumeCollection] = useState([]);
  const { setUserId } = useContext(AuthStateContext);

  const [dataSort, setDataSort] = useState("12h");
  const [allTopCollections, setAllTopCollections] = useState([]);
  const [topCollections, setTopCollections] = useState([]);

  const [load, setLoad] = useState(6);
  const [show, setShow] = useState(true);
  const [value, setValue] = useState("");

  // useEffect(() => {
  //   fetch("https://api.reservoir.tools/collections/v5?sortBy=allTimeVolume")
  //     .then((res) => res.json())
  //     .then((data) => setVolumeCollection(data.collections));
  // }, []);

  const handleChange = (event) => {
    // setValue(event.target.value);

    const searchValue = event.target.value;

    const searchedData = allTopCollections.filter((item) => {
      const searchTerm = searchValue.toLocaleLowerCase();
      const collectionName = item.name.toLocaleLowerCase();
      return searchTerm && collectionName.startsWith(searchTerm);
    });

    if (searchValue.length > 0) {
      setTopCollections(searchedData);
    } else {
      setTopCollections(allTopCollections);
    }
  };

  useEffect(() => {
    fetch(
      `https://api.nftgo.io/api/v2/ranking/collections?offset=0&limit=100&by=marketCapEth&asc=-1&rarity=-1&keyword=&fields=marketCap,marketCapEth,marketCapEthRanking,marketCapEthChange${dataSort},buyerNum${dataSort},buyerNum${dataSort}Change${dataSort},sellerNum${dataSort},sellerNum${dataSort}Change${dataSort},liquidity${dataSort},liquidity${dataSort}Change${dataSort},saleNum${dataSort},saleNum${dataSort}Change${dataSort},volume${dataSort},volumeEth${dataSort},volumeEth${dataSort}Change${dataSort},traderNum${dataSort},traderNum${dataSort}Change${dataSort},holderNum,holderNumChange${dataSort},whaleNum,whaleNumChange${dataSort},orderAvgPriceETH${dataSort},orderAvgPriceETH${dataSort}Change${dataSort},orderAvgPrice${dataSort},orderAvgPrice${dataSort}Change${dataSort},floorPrice,floorPriceChange${dataSort},blueChipHolderNum,blueChipHolderNumChange${dataSort},blueChipHolderRatio,whaleRatio`
    )
      .then((res) => res.json())
      .then((data) => {
        setTopCollections(data.data.list);
        setAllTopCollections(data.data.list);
      });
  }, [dataSort]);

  const handleLoadMore = () => {
    setLoad(load + 6);
  };
  // useEffect(() => {
  //   if (load >= volumeCollection.length) {
  //     setShow(false);
  //   } else {
  //     setShow(true);
  //   }
  // }, [load]);

  console.log("toppp", topCollections);
  return (
    <div>
      <div className="container custom__container my-5 ">
        <h2 className="mt-5 text-center  py-5">{t("topCollection")}</h2>
        <CollectionNav></CollectionNav>

        {/* data sorting navbar start */}
        <div className="d-flex justify-content-between">
          <div>
            <input
              style={{ width: "300px", borderRadius: "50px" }}
              class="search form-control me-2 ps-5"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={handleChange}
            />
          </div>
          <div className="border d-flex gap-3 align-items-center px-3 bg-light rounded pointer">
            <div
              onClick={() => setDataSort("1h")}
              className={
                dataSort === "1h" && "bg-primary p-1 rounded text-light"
              }
            >
              1{t("hr")}
            </div>
            <div
              onClick={() => setDataSort("6h")}
              className={
                dataSort === "6h" && "bg-primary p-1 rounded text-light"
              }
            >
              6{t("hr")}
            </div>
            <div
              onClick={() => setDataSort("12h")}
              className={
                dataSort === "12h" && "bg-primary p-1 rounded text-light"
              }
            >
              12{t("hr")}
            </div>
            <div
              onClick={() => setDataSort("24h")}
              className={
                dataSort === "24h" && "bg-primary p-1 rounded text-light"
              }
            >
              24{t("hr")}
            </div>
            <div
              onClick={() => setDataSort("7d")}
              className={
                dataSort === "7d" && "bg-primary p-1 rounded text-light"
              }
            >
              7D
            </div>
            <div
              onClick={() => setDataSort("30d")}
              className={
                dataSort === "30d" && "bg-primary p-1 rounded text-light"
              }
            >
              30D
            </div>
            <div
              onClick={() => setDataSort("")}
              className={dataSort === "" && "bg-primary p-1 rounded text-light"}
            >
              All
            </div>
          </div>
        </div>
        {/* data sorting navbar end */}

        <div className="my-5">
          <table className="table caption-top shadow rounded">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">{t("collection")}</th>
                <th className="text-end" scope="col">
                  {" "}
                  Market Cap
                </th>
                <th className="text-end" scope="col">
                  {t("volume")}({dataSort})
                </th>
                <th className="text-end" scope="col">
                  {t("flootPrice")}
                </th>
                <th className="text-end" scope="col">
                  {t("sales")}({dataSort})
                </th>
                <th className="text-end" scope="col">
                  Whales
                </th>
              </tr>
            </thead>
            <tbody>
              {topCollections.map((collection, index) => (
                // <tr key={index} className="pointer hover-background">
                //   <th scope="row">{index + 1}</th>
                //   <td>
                //     <Link to={`/trending/${collection?.primaryContract}`}>
                //       <img
                //         width={50}
                //         height={50}
                //         className="rounded-circle  me-4"
                //         src={collection.image}
                //         alt=""
                //       />
                //       {collection.name}
                //     </Link>{" "}
                //   </td>
                //   <td>
                //     {" "}
                //     {(collection.volume["allTime"] / 1000).toFixed(2)} k <br />{" "}
                //     <span className="text-success">
                //       {" "}
                //       {(collection.volume["30day"] / 100).toFixed(2)} %
                //     </span>
                //   </td>
                //   <td>
                //     {" "}
                //     <FaEthereum />
                //     {collection.floorAsk?.price?.amount?.decimal.toFixed(2)}
                //   </td>
                //   <td>{collection.tokenCount}</td>
                // </tr>

                <tr key={index} className="pointer hover-background">
                  <th style={{ fontSize: "14px" }} scope="row">
                    {index + 1}
                  </th>
                  <td>
                    <Link to={`/trending/${collection?.contracts[0]}`}>
                      <img
                        width={40}
                        height={40}
                        className="rounded-circle  me-4"
                        src={collection.logo}
                        alt=""
                      />
                      <span
                        style={{ fontSize: "14px" }}
                        className="text-black fw-bold"
                      >
                        {collection.name}
                      </span>
                    </Link>{" "}
                  </td>
                  <td className="text-end">
                    <div style={{ fontSize: "14px" }}>
                      <FaEthereum />
                      {(collection.marketCapEth / 1000).toFixed(2)}K
                    </div>
                  </td>
                  <td className="text-end">
                    <div style={{ fontSize: "14px" }}>
                      <FaEthereum />{" "}
                      {collection.volumeEth1h &&
                        (collection.volumeEth1h / 1000).toFixed(2) + "k"}
                      {collection.volumeEth6h &&
                        (collection.volumeEth6h / 1000).toFixed(2) + "k"}
                      {collection.volumeEth12h &&
                        (collection.volumeEth12h / 1000).toFixed(2) + "k"}
                      {collection.volumeEth24h &&
                        (collection.volumeEth24h / 1000).toFixed(2) + "k"}
                      {collection.volumeEth7d &&
                        (collection.volumeEth7d / 1000).toFixed(2) + "k"}
                      {collection.volumeEth30d &&
                        (collection.volumeEth30d / 1000).toFixed(2) + "k"}
                      {collection.volumeEth &&
                        (collection.volumeEth / 1000).toFixed(2) + "k"}
                    </div>
                  </td>
                  <td className="text-end">
                    <div style={{ fontSize: "14px" }}>
                      <FaEthereum />
                      {collection.floorPrice?.tokenPrice}
                    </div>
                  </td>
                  <td className="text-end">
                    <div style={{ fontSize: "14px" }}>
                      {collection.saleNum1h && collection.saleNum1h}
                      {collection.saleNum6h && collection.saleNum6h}
                      {collection.saleNum12h && collection.saleNum12h}
                      {collection.saleNum7d && collection.saleNum7d}
                      {collection.saleNum24h && collection.saleNum24h}
                      {collection.saleNum30d && collection.saleNum30d}
                      {collection.saleNum && collection.saleNum}
                    </div>
                  </td>
                  <td className="text-end" style={{ fontSize: "14px" }}>
                    {collection.whaleNum}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* {show && (
            <button onClick={handleLoadMore} type="">
              Load More
            </button>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default TopCollection;
