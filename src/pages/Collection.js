import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ParamsContext } from "../context/ParamsProvider";
import { FaEthereum } from "react-icons/fa";
import CollectionNav from "./CollectionNav";
import { AuthStateContext } from "../context/authContext";
import { useTranslation } from "react-i18next";

const Collection = () => {
  const { t } = useTranslation();
  const { setUserId } = useContext(AuthStateContext);

  const [collections, setCollection] = useState([]);
  const [newCollections, setNewCollections] = useState([]);
  const [allNewCollections, setAllNewCollections] = useState([]);
  const [dataSort, setDataSort] = useState("1h");

  const [load, setLoad] = useState(20);
  const [show, setShow] = useState(true);

  const handleChange = (event) => {
    const searchValue = event.target.value;

    const searchedData = allNewCollections.filter((item) => {
      const searchTerm = searchValue.toLocaleLowerCase();
      const collectionName = item.collection?.name.toLocaleLowerCase();
      return searchTerm && collectionName.startsWith(searchTerm);
    });

    if (searchValue.length > 0) {
      setNewCollections(searchedData);
    } else {
      setNewCollections(allNewCollections);
    }

    console.log(searchedData);
  };

  useEffect(() => {
    fetch("https://api.reservoir.tools/collections/v5")
      .then((res) => res.json())
      .then((data) => setCollection(data.collections));
  }, []);

  useEffect(() => {
    fetch(
      `https://api.nftgo.io/api/v1/ranking/trending-collections?sortby=saleNum&asc=-1&offset=0&limit=100&range=${dataSort}`
    )
      .then((res) => res.json())
      .then((data) => {
        setNewCollections(data?.data?.list);
        setAllNewCollections(data?.data?.list);
      });
  }, [dataSort]);

  const handleLoadMore = () => {
    setLoad(load + 20);
  };
  useEffect(() => {
    if (load >= collections.length) {
      setShow(false);
    } else {
      setShow(true);
    }
  }, [load]);

  // console.log("okCollection", collections);

  return (
    <div>
      <div className="container custom__container  my-5 ">
        <h2 className="mt-5 text-center  py-5">{t("allCollection")}</h2>
        <CollectionNav></CollectionNav>

        {/* data sorting navbar start */}
        <div className="d-flex justify-content-between">
          <div>
            <input
              style={{ width: "300px", borderRadius: "50px" }}
              class="search form-control ps-5"
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
              <tr className="">
                <th scope="col">#</th>
                <th scope="col">{t("collection")}</th>
                <th className="text-end" scope="col">
                  {t("flootPrice")}
                </th>
                <th className="text-end" scope="col">
                  {" "}
                  {t("volume")}({dataSort})
                </th>
                <th className="text-end" scope="col">
                  {" "}
                  {t("sales")}({dataSort})
                </th>
                <th className="text-end" scope="col">
                  {t("holers")}
                </th>
                <th className="text-end" scope="col">
                  {t("listed")}
                </th>
              </tr>
            </thead>
            {/* <tbody>
              {collections
                // .slice(0, load)
                .sort((a, b) => b.floorSale["1day"] - a.floorSale["1day"])
                .map((collection, index) => (
                  <tr key={index} className="pointer hover-background">
                    <th scope="row">{index + 1}</th>
                    <td
                    // onClick={() => setUserId(collection?.primaryContract)}
                    >
                      <Link to={`/trending/${collection?.primaryContract}`}>
                        <img
                          width={50}
                          height={50}
                          className="rounded-circle  me-4"
                          src={collection.image}
                          alt=""
                        />
                        {collection.name}
                      </Link>{" "}
                    </td>
                    <td>
                      {" "}
                      {(collection.volume["allTime"] / 1000).toFixed(2)} k{" "}
                      <br />{" "}
                      <span className="text-success">
                        {" "}
                        {(
                          (collection.volume["30day"] -
                            collection.volume["1day"]) /
                          100
                        ).toFixed(2)}{" "}
                        %
                      </span>
                    </td>
                    <td>
                      {" "}
                      <FaEthereum />
                      {collection.floorAsk?.price?.amount?.decimal.toFixed(
                        2
                      )}{" "}
                    </td>
                    <td className="d-flex flex-column ">
                      <p className="mb-0">
                        {collection.floorSale["1day"].toFixed(2)}
                      </p>

                      <p className="mb-0">
                        <span
                          className={
                            collection.floorSale["30day"] -
                              collection.floorSale["1day"] >=
                            0
                              ? "text-success"
                              : "text-danger"
                          }
                        >
                          {" "}
                          {(
                            (collection.floorSale["30day"] -
                              collection.floorSale["1day"]) *
                            100
                          ).toFixed(1)}{" "}
                          %
                        </span>
                      </p>
                    </td>
                    <td>{collection.tokenCount}</td>
                  </tr>
                ))}
            </tbody> */}

            {/* collection list */}
            <tbody>
              {newCollections
                // .slice(0, load)
                .map((collection, index) => {
                  return (
                    <tr key={index} className="pointer hover-background">
                      <th style={{ fontSize: "14px" }} scope="row">
                        {index + 1}
                      </th>
                      <td
                      // onClick={() => setUserId(collection?.primaryContract)}
                      >
                        <Link
                          to={`/trending/${collection.collection?.collTags?.contract}`}
                        >
                          <img
                            width={40}
                            height={40}
                            className="rounded-circle  me-4"
                            src={collection.collection?.logo}
                            alt=""
                          />
                          <span
                            style={{ fontSize: "14px" }}
                            className="text-black fw-bold"
                          >
                            {collection.collection?.name}
                          </span>
                        </Link>{" "}
                      </td>
                      <td>
                        <div className="text-end">
                          <div style={{ fontSize: "14px" }}>
                            <FaEthereum />
                            {collection.floorPrice?.tokenPrice}
                          </div>
                          <div
                            className="text-secondary fw-bold"
                            style={{ fontSize: "12px" }}
                          >
                            {(collection.floorPriceChange * 100).toFixed(3)}%
                          </div>
                        </div>
                      </td>
                      <td className="text-end">
                        <div style={{ fontSize: "14px" }}>
                          <FaEthereum />
                          {collection.volumeEth.toFixed(2)}
                        </div>
                        <div
                          className={
                            collection.volumeEthChange * 100 < 0
                              ? "text-danger fw-bold"
                              : "text-success fw-bold"
                          }
                          style={{ fontSize: "12px" }}
                        >
                          {(collection.volumeEthChange * 100).toFixed(2)}%
                        </div>
                      </td>
                      <td className="text-end">
                        <div style={{ fontSize: "14px" }}>
                          {collection.saleNum}
                        </div>
                        <div
                          className={
                            collection.saleNumChange * 100 < 0
                              ? "text-danger fw-bold"
                              : "text-success fw-bold"
                          }
                          style={{ fontSize: "12px" }}
                        >
                          {(collection.saleNumChange * 100).toFixed(2)}%
                        </div>
                      </td>
                      <td style={{ fontSize: "14px" }} className="text-end">
                        {collection.holderNum}
                      </td>
                      <td style={{ fontSize: "14px" }} className="text-end">
                        {(
                          (collection.listingNum / collection.supply) *
                          100
                        ).toFixed(2)}
                        %
                      </td>
                    </tr>
                  );
                })}
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

export default Collection;
