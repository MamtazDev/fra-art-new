import React from "react";
import { Link } from "react-router-dom";
import ClockItem from "./ClockItem";
import { iconGroup, ethereum, flashIcon } from "../utils/images.util";
import { useTranslation } from "react-i18next";

const NFT_Fraction2 = (props) => {
  const { item } = props;
  const { t } = useTranslation();

  return (
    <>
      {item && (
        <div className="col">
          <Link to={`/marketplace/details/${item.address}`}>
            <div className="card nft-items rounded-md shadow overflow-hidden mb-1 p-3">
              <div className="d-flex justify-content-between">
                <div className="img-group">
                  <div className="user-avatar">
                    <span className="badge badge-link bg-dark2">
                      <img
                        src={iconGroup}
                        alt="user"
                        width={15}
                        className="avatar-sm-sm rounded-circle"
                      />
                      <span style={{ marginLeft: 10, fontWeight: 600 }}>
                        {item.holders.length}
                      </span>
                    </span>
                  </div>
                </div>
                <img src={ethereum} style={{ marginLeft: "5px" }} alt="" />
              </div>

              <div className="nft-image rounded-md mt-3 position-relative overflow-hidden">
                <img
                  src={item.item.mainData}
                  className="img-fluid"
                  alt=""
                  style={{ height: 250, width: "100%" }}
                />
                <div className="position-absolute top-0 start-0 m-2">
                  <span className="badge badge-link bg-primary">1 NFT</span>
                </div>
                {item.flag && (
                  <div className="position-absolute bottom-0 start-0 m-2 bg-gradient-primary text-white rounded-pill px-3">
                    <i className="uil uil-clock"></i> &nbsp;
                    <ClockItem
                      kickoff={item.kickoff}
                      duration={item.duration}
                    />
                  </div>
                )}
              </div>

              <div className="card-body content position-relative p-0 mt-3">
                <div className="title text-dark h6">{item.name}</div>
                <div
                  className="text-dark"
                  style={{ fontSize: 14, fontWeight: "bold" }}
                >
                  Price: {item.price} ETH
                </div>
                <hr />
                <div style={{ textAlign: "center" }}>
                  <button className="btn btn-soft-secondary justify-content-start">
                    <img
                      alt=""
                      src={flashIcon}
                      style={{ paddingRight: 10 }}
                      width={30}
                    />{" "}
                    {item.flag ? `${t("placeBid")}` : `${t("buyNow")}`}
                  </button>
                </div>
              </div>
            </div>
          </Link>
        </div>
      )}
    </>
  );
};

export default NFT_Fraction2;
