import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ParamsContext } from "../context/ParamsProvider";
import { FaEthereum } from "react-icons/fa";
import CollectionNav from "./CollectionNav";
import ques from "../assets/images/ques.png";
import { AuthStateContext } from "../context/authContext";
import { useTranslation } from "react-i18next";

const HotCollection = () => {
  const { t } = useTranslation();
  const { setUserId } = useContext(AuthStateContext);

  const [dataSort, setDataSort] = useState("5m");

  const [floorCollection, setFloorCollection] = useState([]);
  const [hotCollections, setHotCollections] = useState([]);
  const [allHotCollections, setAllHotCollections] = useState([]);
  const [load, setLoad] = useState(6);
  const [show, setShow] = useState(true);

  const handleChange = (event) => {
    const searchValue = event.target.value;

    // allHotCollections.filter((item) => console.log(item));

    const searchedData = allHotCollections.filter((item) => {
      const searchTerm = searchValue.toLocaleLowerCase();
      const collectionName =
        item.collection?.collectionName?.toLocaleLowerCase();
      return searchTerm && collectionName.startsWith(searchTerm);
    });

    if (searchValue.length > 0) {
      setHotCollections(searchedData);
    } else {
      setHotCollections(allHotCollections);
    }

    console.log(searchedData);
  };

  useEffect(() => {
    fetch("https://api.reservoir.tools/collections/v5?sortBy=floorAskPrice")
      .then((res) => res.json())
      .then((data) => setFloorCollection(data.collections));
  }, []);

  useEffect(() => {
    fetch(
      `https://api.nftgo.io/api/v1/analytics/top-mints?timeRange=${dataSort}&suspiciousFilter=false`
    )
      .then((res) => res.json())
      .then((data) => {
        setHotCollections(data.data);
        setAllHotCollections(data.data);
      });
  }, [dataSort]);

  const handleLoadMore = () => {
    setLoad(load + 6);
  };
  useEffect(() => {
    if (load >= floorCollection.length) {
      setShow(false);
    } else {
      setShow(true);
    }
  }, [load]);

  console.log("hotts", hotCollections);

  return (
    <div>
      <div className="container custom__container my-5 ">
        <h2 className="mt-5 text-center  py-5">{t("hotMints")}</h2>
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
              onClick={() => setDataSort("5m")}
              className={
                dataSort === "5m" && "bg-primary p-1 rounded text-light"
              }
            >
              5{t("min")}
            </div>
            <div
              onClick={() => setDataSort("10m")}
              className={
                dataSort === "10m" && "bg-primary p-1 rounded text-light"
              }
            >
              10{t("min")}
            </div>
            <div
              onClick={() => setDataSort("30m")}
              className={
                dataSort === "30m" && "bg-primary p-1 rounded text-light"
              }
            >
              30{t("min")}
            </div>
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
                  Mints({dataSort})
                </th>
                <th className="text-end" scope="col">
                  Notable Minters
                </th>
                <th className="text-end" scope="col">
                  {" "}
                  Unique Minters
                </th>
                <th className="text-end" scope="col">
                  Mint Price
                </th>
                <th className="text-end" scope="col">
                  Total Mints
                </th>
                <th className="text-end" scope="col">
                  {t("sales")}({dataSort})
                </th>
              </tr>
            </thead>
            <tbody>
              {hotCollections.map((collection, index) => (
                // <tr key={index} className="pointer hover-background">
                //   <th scope="row">{index + 1}</th>
                //   <td
                //   //  onClick={() => setUserId(collection?.primaryContract)}
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
                //     {(collection.volume["allTime"] / 1000).toFixed(2)} k <br />{" "}
                //     <span className="text-success">
                //       {" "}
                //       {(collection.volume["30day"] / 100).toFixed(2)} %
                //     </span>
                //   </td>
                //   <td>
                //     {/* <FaEthereum /> */}
                //     {collection.floorSale["1day"] &&
                //       collection.floorSale["1day"].toFixed(2)}
                //   </td>
                //   <td>{collection.tokenCount}</td>
                // </tr>

                <tr key={index} className="pointer hover-background">
                  <th style={{ fontSize: "14px" }} scope="row">
                    {index + 1}
                  </th>
                  <td
                  //  onClick={() => setUserId(collection?.primaryContract)}
                  >
                    <Link
                      to={`/trending/${collection.collection?.contractAddress}`}
                    >
                      {collection.collection?.logo ? (
                        <img
                          width={40}
                          height={40}
                          className="rounded-circle  me-4"
                          src={collection.collection?.logo}
                          alt=""
                        />
                      ) : (
                        <img
                          width={40}
                          height={40}
                          className="rounded-circle  me-4"
                          src={ques}
                          alt=""
                        />
                      )}

                      <span
                        style={{ fontSize: "14px" }}
                        className="text-black fw-bold"
                      >
                        {collection.collection?.collectionName}
                      </span>
                    </Link>{" "}
                  </td>
                  <td className="text-end">
                    <div style={{ fontSize: "14px" }}>{collection.mints}</div>
                    <div
                      style={{ fontSize: "12px" }}
                      className={
                        collection.mintsChange * 100 < 0
                          ? "text-danger fw-bold"
                          : "text-success fw-bold"
                      }
                    >
                      {(collection.mintsChange * 100).toFixed(2)}%
                    </div>
                  </td>
                  <td className="text-end">
                    <div style={{ fontSize: "14px" }}>
                      {collection.notableMinterNum}
                    </div>
                  </td>
                  <td className="text-end">
                    <div style={{ fontSize: "14px" }}>
                      {collection.uniqueMinterNum}
                    </div>
                    <div style={{ fontSize: "12px" }} className="">
                      (
                      {(
                        (collection.uniqueMinterNum / collection.totalMints) *
                        100
                      ).toFixed(2)}
                      %)
                    </div>
                  </td>
                  <td className="text-end">
                    <div style={{ fontSize: "14px" }}>
                      <FaEthereum />{" "}
                      {collection.latestMintPriceInETH.toFixed(4)}
                    </div>
                    <div style={{ fontSize: "12px" }}>
                      <span className="me-2 bg-light px-2 rounded-pill">
                        floor
                      </span>
                      <span>
                        <FaEthereum />
                        {collection.floorPriceInETH
                          ? collection.floorPriceInETH
                          : 0}
                      </span>
                    </div>
                  </td>
                  <td className="text-end">
                    <div style={{ fontSize: "14px" }}>
                      {collection.totalMints}
                    </div>
                  </td>
                  <td className="text-end">
                    <div style={{ fontSize: "14px" }}>{collection.sales}</div>
                    <div style={{ fontSize: "12px" }}>
                      {collection.salesChange
                        ? (collection.salesChange * 100).toFixed(2)
                        : 0}
                      %
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HotCollection;
