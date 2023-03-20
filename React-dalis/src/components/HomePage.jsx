import oakLogoBluebig from "../assets/oakLogoBluebig.png";

const HomePage = () => {
  return (
    <div className="home-page">
      <img className="home-tree" src={oakLogoBluebig} alt="oakLogoBlue"></img>
      <div className="home-title">
        {" "}
        <b>Where money happens.</b>{" "}
      </div>
      <div className="home-text">
        At Oak Capital LTD, customers are not just a number, but rather valued
        members of the community. The bank's employees take pride in building
        long-term relationships with their customers and providing personalized
        service that goes above and beyond what you would expect from a
        traditional bank.
      </div>
      <div className="home-text">
        Oak Capital LTD is a locally owned and operated bank that is committed
        to providing exceptional customer service. From the moment you walk
        through the door, you are greeted with a warm welcome and a smile. The
        bank's staff takes the time to get to know you and your financial needs,
        and they work hard to find solutions that are tailored to your specific
        situation. Overall, Oak Capital LTD is a bank that truly cares about its
        customers and is dedicated to providing them with the best possible
        banking experience.
      </div>
    </div>
  );
};

export default HomePage;
