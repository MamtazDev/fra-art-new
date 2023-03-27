import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ParamsContext } from "../context/ParamsProvider";
import { FaEthereum } from "react-icons/fa";
import CollectionNav from "./CollectionNav";
import { AuthStateContext } from "../context/authContext";
import { useTranslation } from "react-i18next";

const NewlyCollection = () => {
  const { t } = useTranslation();
  const { setUserId } = useContext(AuthStateContext);
  // const [newCollection, setNewCollection] = useState([]);
  const [show, setShow] = useState(true);
  const [load, setLoad] = useState(6);

  const [dataSort, setDataSort] = useState("24h");

  const [newlyCollections, setNewlyCollections] = useState([]);
  const [allNewlyCollections, setAllNewlyCollections] = useState([]);

  // useEffect(() => {
  //   fetch("https://api.reservoir.tools/collections/v5?sortBy=createdAt")
  //     .then((res) => res.json())
  //     .then((data) => setNewCollection(data.collections));
  // }, []);

  const handleChange = (event) => {
    const searchValue = event.target.value;

    const searchedData = allNewlyCollections.filter((item) => {
      const searchTerm = searchValue.toLocaleLowerCase();
      const collectionName = item.name.toLocaleLowerCase();
      return searchTerm && collectionName.startsWith(searchTerm);
    });

    if (searchValue.length > 0) {
      setNewlyCollections(searchedData);
    } else {
      setNewlyCollections(allNewlyCollections);
    }

    console.log(searchedData);
  };

  useState(() => {
    fetch(
      `https://api.nftgo.io/api/v1/ranking/new-added-coll-list?offset=0&limit=10000&by=listedTime&rarity=-1&interval=${dataSort}&asc=-1&fields=marketCap,marketCapEth,marketCapEthChange${dataSort},volume${dataSort},volumeEth${dataSort},floorPrice,minterNum,whaleMinterNum,totalMintGas,totalMintGasUsd,listedTime`
    )
      .then((res) => res.json())
      .then((data) => {
        setNewlyCollections(data.data.list);
        setAllNewlyCollections(data.data.list);
      });
  }, [dataSort]);

  const handleLoadMore = () => {
    setLoad(load + 6);
  };

  // console.log("newlyadded", newlyCollections);
  // console.log(
  //   `https://api.nftgo.io/api/v1/ranking/new-added-coll-list?offset=0&limit=100&by=listedTime&rarity=-1&interval=${dataSort}&asc=-1&fields=marketCap,marketCapEth,marketCapEthChange${dataSort},volume${dataSort},volumeEth${dataSort},floorPrice,minterNum,whaleMinterNum,totalMintGas,totalMintGasUsd,listedTime`
  // );
  return (
    <div>
      <div className="container custom__container my-5 ">
        <h2 className="mt-5 text-center  py-5">{t("newlyAdded")}</h2>
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
                  Market Cap
                </th>
                <th className="text-end" scope="col">
                  {dataSort.toLocaleUpperCase()}
                </th>
                <th className="text-end" scope="col">
                  {t("volume")}({dataSort.toLocaleUpperCase()})
                </th>
                <th className="text-end" scope="col">
                  {t("flootPrice")}
                </th>
                <th className="text-end" scope="col">
                  Minters
                </th>
                <th className="text-end" scope="col">
                  Whale Minters
                </th>
                <th className="text-end" scope="col">
                  Total Mint Gas
                </th>
              </tr>
            </thead>
            <tbody>
              {newlyCollections.map((collection, index) => (
                // <tr key={index} className="pointer hover-background">
                //   <th scope="row">{index + 1}</th>
                //   <td
                //   // onClick={() => setUserId(collection?.primaryContract)}
                //   >
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
                //     {(collection.volume["allTime"] / 1000).toFixed(2)} k{" "}
                //     <br />{" "}
                //     <span className="text-success">
                //       {" "}
                //       {(collection.volume["30day"] / 100).toFixed(2)} %
                //     </span>
                //   </td>
                //   <td>
                //     {" "}
                //     <FaEthereum />
                //     {collection.floorAsk?.price === null
                //       ? 0
                //       : collection.floorAsk?.price?.amount?.decimal.toFixed(
                //           2
                //         )}
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
                      {(collection.marketCap / 1000).toFixed(2)}
                    </div>
                  </td>
                  <td className="text-end">
                    <div
                      className={
                        collection.marketCapEthChange24h < 0 ||
                        collection.marketCapEthChange7d < 0 ||
                        collection.marketCapEthChange30d < 0
                          ? "text-danger fw-bold"
                          : "text-success fw-bold"
                      }
                      style={{ fontSize: "14px" }}
                    >
                      {collection.marketCapEthChange24h &&
                        (collection.marketCapEthChange24h * 100).toFixed(2)}
                      {collection.marketCapEthChange7d &&
                        (collection.marketCapEthChange7d * 100).toFixed(2)}
                      {collection.marketCapEthChange30d &&
                        (collection.marketCapEthChange30d * 100).toFixed(2)}
                      {!collection.marketCapEthChange24h &&
                        !collection.marketCapEthChange7d &&
                        !collection.marketCapEthChange30d &&
                        0}
                      %
                    </div>
                  </td>
                  <td className="text-end">
                    <div style={{ fontSize: "14px" }}>
                      <FaEthereum />
                      {collection.volumeEth24h &&
                        collection.volumeEth24h.toFixed(2)}
                      {collection.volumeEth7d &&
                        collection.volumeEth7d.toFixed(2)}
                      {collection.volumeEth30d &&
                        collection.volumeEth30d.toFixed(2)}
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
                      {collection.minterNum}
                    </div>
                  </td>
                  <td className="text-end">
                    <div style={{ fontSize: "14px" }}>
                      {collection.whaleMinterNum}
                    </div>
                  </td>
                  <td className="text-end">
                    <div style={{ fontSize: "14px" }}>
                      {collection.totalMintGas.toFixed(4)}
                    </div>
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

export default NewlyCollection;
