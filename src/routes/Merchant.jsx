import { React, useState } from "react";
import Header from "../components/Header";
import CountdownCompo from "../components/CountdownCompo";
import MerchantList from "../MerchantsList.json";
import { DropdownButton, Dropdown } from "react-bootstrap";

const Merchant = () => {
  const merchants = MerchantList.merchants;
  const [wantedMerchant, setWantedMerchant] = useState([]);

  const onClick = (item) => {
    //                        Add Merchant user chose to State to pass down to CountdownCompo
    setWantedMerchant((prevWantedMerchant) => [...prevWantedMerchant, item]);
  };

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
          className="dropdownButton"
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
        <div className="merchantList">
          {wantedMerchant && //                           If wantedMerchant exists
            wantedMerchant.map((item, index) => {
              //      map through then return each merchant user selected
              return (
                <CountdownCompo
                  id={index}
                  key={index}
                  wantedMerchant={item}
                ></CountdownCompo>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Merchant;
