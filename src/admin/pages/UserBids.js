import { Link } from "react-router-dom";
import RecentBid from "../components/elements/RecentBid";
import Layout from "../components/layout/Layout";

function UserBids(props) {
  return (
    <>
      <Layout
        headTitle="Bids"
        pageTitle="Bids"
        pageTitleSub={"Welcome FraArt Bids page"}
        pageClass={"dashboard"}
        parent={"Home"}
        child={"Bids"}
        {...props}
      >
        <RecentBid />
      </Layout>
    </>
  );
}
export default UserBids;
