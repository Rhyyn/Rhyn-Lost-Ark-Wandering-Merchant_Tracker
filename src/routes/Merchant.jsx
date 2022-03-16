import { React, useState } from "react";
import Header from "../components/Header";
import CountdownCompo from "../components/CountdownCompo";
import MerchantList from "../MerchantsList.json";
import { DropdownButton, Dropdown } from "react-bootstrap";

const Merchant = () => {
  const merchants = MerchantList.merchants;
  const [wantedMerchant, setWantedMerchant] = useState([]);
  const [components, setComponents] = useState();

  const onClick = (item) => {
    //                        Add Merchant user chosed to State to pass down to CountdownCompo
    setWantedMerchant((prevWantedMerchant) => [...prevWantedMerchant, item]);
  };

  //{/* <img src="/images/Mac/traveling_merchant_mac_delphi_township.jpg"/> */}
  return (
    <div className="merchantPage">
      <header>
        <Header></Header>
      </header>
      <div className="merchantBody">
        <DropdownButton
          variant="primary"
          id="dropdown-basic-button"
          title="Select Merchants to Track"
          autoClose="inside"
          className="test"
        >
          {merchants.map((item, index) => {
            //          Map through the list of merchants of user to see
            return (
              <Dropdown.Item key={index}>
                <h4
                  onClick={() => {
                    //                     onClick call onClick function and set item to State
                    onClick(item);
                  }}
                >
                  {item.name}
                </h4>
              </Dropdown.Item>
            );
          })}
        </DropdownButton>
        {wantedMerchant && //                           If wantedMerchant exists
          wantedMerchant.map((item, index) => {
            //      map through then return each merchant user selected
            return (
              <CountdownCompo
                key={index}
                wantedMerchant={item}
              ></CountdownCompo>
            );
          })}
      </div>
    </div>
  );
};

export default Merchant;

// PREVIOUS VERSION OF MAP

{
  /* <div className="merchantGroup">
<h2 className="merchantGroupTitle">Schedule 1</h2>
{MerchantList.merchants01.map((item, index) => (
  <CountdownCompo
    key={index}
    merchantName={item.name}
    merchantLocation={item.location}
    merchantSchedule={item.spawntimer}
  ></CountdownCompo>
))}
</div>
<div className="merchantGroup">
<h2 className="merchantGroupTitle">Schedule 2</h2>
{MerchantList.merchants02.map((item, index) => (
  <CountdownCompo
    key={index}
    merchantName={item.name}
    merchantLocation={item.location}
    merchantSchedule={item.spawntimer}
  ></CountdownCompo>
))}
</div>
<div className="merchantGroup">
<h2 className="merchantGroupTitle">Schedule 3</h2>
{MerchantList.merchants03.map((item, index) => (
  <CountdownCompo
    key={index}
    merchantName={item.name}
    merchantLocation={item.location}
    merchantSchedule={item.spawntimer}
  ></CountdownCompo>
))}
</div> */
}
