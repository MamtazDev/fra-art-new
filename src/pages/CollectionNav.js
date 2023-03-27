import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthStateContext } from "../context/authContext";
import { ParamsContext } from "../context/ParamsProvider";
import { useTranslation } from "react-i18next";

const CollectionNav = () => {
  const { t } = useTranslation();
  //   const [active, setActive] = useState("");
  const { active, setActive } = useContext(AuthStateContext);
  return (
    <div className="d-flex gap-4 fs-5 mb-3 fw-bold">
      <Link
        to="/trending"
        className={`text-black  px-3 py-1 rounded hover-background ${
          active === "trending" && "activeTab"
        }`}
        onClick={() => setActive("trending")}
      >
        <div>{t("trending")}</div>
      </Link>
      <Link
        to="/hot"
        className={`text-black  px-3 py-1 rounded hover-background ${
          active === "hot" && "activeTab"
        }`}
        onClick={() => setActive("hot")}
      >
        <div>{t("hotMints")}</div>
      </Link>
      <Link
        to="/newly"
        className={`text-black  px-3 py-1 rounded hover-background ${
          active === "newly" && "activeTab"
        }`}
        onClick={() => setActive("newly")}
      >
        <div>{t("newlyAdded")}</div>
      </Link>
      <Link
        to="/top"
        className={`text-black  px-3 py-1 rounded hover-background ${
          active === "top" && "activeTab"
        }`}
        onClick={() => setActive("top")}
      >
        <div>{t("topCollection")}</div>
      </Link>
    </div>
  );
};

export default CollectionNav;
