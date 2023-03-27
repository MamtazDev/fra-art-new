import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap";
import { useWeb3React } from '@web3-react/core';
import { shorter } from "../../../utils";


function Header(props) {
  // const { account, chainId, library, deactivate } = useWeb3React();
  const { user, login } = props;
  const [account,setAccount] = useState();
  const proPic = "https://nftgo.io/tempImg/avatar-0.png"

  // console.log(user,"user")
  useEffect(() => {
      const acc = localStorage.getItem('accounts');
      setAccount(acc)
      console.log('ad',acc)
    if (!!user) {
      login();
    }
  }, [user, account])
  console.log(account,'account')

  return (
    <>
    {
      user|| account && <div className="header">
      <div className="container">
        <div className="row">
          <div className="col-xxl-12">
            <div className="header-content">
              <div className="header-left">
                {/* <div className="search">
                  <form action="#">
                    <span>
                      <i className="ri-search-line"></i>
                    </span>
                    <input type="text" placeholder="Search Here" />
                  </form>
                </div> */}
              </div>

              <div className="header-right">

                <UncontrolledDropdown
                  tag="div"
                  className="dropdown profile_log"
                >
                  <DropdownToggle tag="div" data-toggle="dropdown">
                    <div className="user icon-menu active">
                      <span>
                        <img src={user ? user.profilePic : proPic} width={32} height={32} style={{ borderRadius:"100%", cursor:"pointer" }} alt="" />
                      </span>
                    </div>
                  </DropdownToggle>
                  <DropdownMenu right className="dropdown-menu">
                    <div className="user-email dropdown-item">
                      <div className="user">
                        {/* <span className="thumb">
                          <img src={user ? user.profilePic : proPic} alt="" />
                        </span> */}
                        <div className="user-info ">
                          <h5>{user?user.name:"No Name"}</h5>
                          <span>{user?user.googleLink: ""}</span>
                        </div>
                      </div>
                    </div>
                    {/* <Link to="/admin/bids"> */}
                    <Link to="#">
                      <div className="dropdown-item">
                        <span>
                          <i className="ri-time-line"></i>
                        </span>
                      My Profile
                      </div>
                    </Link>
                    {/* <Link to="/admin/saved"> */}
                    <Link to="#">
                      <div className="dropdown-item">
                        <span>
                          <i className="ri-heart-line"></i>
                        </span>
                       Watchlist
                      </div>
                    </Link>
                    {/* <Link to="/admin/collections">
                      <div className="dropdown-item">
                        <span>
                          <i className="ri-star-line"></i>
                        </span>
                        Collection
                      </div>
                    </Link> */}
                    {/* <Link to="/admin/settings-profile"> */}
                    <Link to="#">
                      <div className="dropdown-item">
                        <span>
                          <i className="ri-settings-3-line"></i>
                        </span>
                        Settings
                      </div>
                    </Link>
                    <Link to="/">
                      <div className="dropdown-item logout">
                        <i className="ri-logout-circle-line"></i>
                       Log Out
                      </div>
                    </Link>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    }
    </>
  );
}
export default Header;
