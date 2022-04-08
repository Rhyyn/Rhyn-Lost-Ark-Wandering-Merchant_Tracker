import { React, useState } from "react";
import Header from "../components/Header";
import CountdownCompo from "../components/CountdownCompo";
import MerchantList from "../MerchantsList.json";
import { DropdownButton, Dropdown, Button, Form } from "react-bootstrap";

const Merchant = () => {
  const merchants = MerchantList.merchants;
  const [wantedMerchant, setWantedMerchant] = useState([]);
  const [is5MinSwitchOn, setIs5MinSwitchOn] = useState(false);
  const [is10MinSwitchOn, setIs10MinSwitchOn] = useState(false);

  const on5MinSwitchAction = () => {
    setIs5MinSwitchOn(!is5MinSwitchOn);
  };

  const on10MinSwitchAction = () => {
    setIs10MinSwitchOn(!is10MinSwitchOn);
  };


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
          autoClose="true"
          className="dropdownButton"
        >
          <Dropdown.Divider />
          <h5 className="dropdownSchedules">Schedule 1</h5>
          <Dropdown.Divider />
          {merchants.map((item, index) => {
            if (item.group === "1") {
              return (
                <Dropdown.Item key={index}>
                  <h5
                    onClick={() => {
                      //                     onClick call onClick function and set item to State
                      onClick(item);
                    }}
                  >
                    {item.name}
                  </h5>
                </Dropdown.Item>
              );
            }
          })}
          <Dropdown.Divider />
          <h5 className="dropdownSchedules">Schedule 2</h5>
          <Dropdown.Divider />
          {merchants.map((item, index) => {
            if (item.group === "2") {
              return (
                <Dropdown.Item key={index}>
                  <h5
                    onClick={() => {
                      //                                  onClick call onClick function and set item to State
                      onClick(item);
                    }}
                  >
                    {item.name}
                  </h5>
                </Dropdown.Item>
              );
            }
          })}
          <Dropdown.Divider />
          <h5 className="dropdownSchedules">Schedule 3</h5>
          <Dropdown.Divider />
          {merchants.map((item, index) => {
            if (item.group === "3") {
              return (
                <Dropdown.Item key={index}>
                  <h5
                    onClick={() => {
                      //                                  onClick call onClick function and set item to State
                      onClick(item);
                    }}
                  >
                    {item.name}
                  </h5>
                </Dropdown.Item>
              );
            }
          })}
        </DropdownButton>
        <div className="merchantList">
          {wantedMerchant && //                           If wantedMerchant exists
            wantedMerchant.map((item, index) => {
              //                                           map through then return each merchant user selected
              return (
                <CountdownCompo
                  id={index}
                  key={index}
                  wantedMerchant={item}
                  is5MinSwitchOn={is5MinSwitchOn} // pass state of Switch Reminders buttons to Card Compo
                  is10MinSwitchOn={is10MinSwitchOn} // pass state of Switch Reminders buttons to Card Compo
                ></CountdownCompo>
              );
            })}
        </div>
      </div>
      <footer>
        <div className="footerBox">
          <div className="formContainer">
            <Form className="formCheckboxContainer">
              <Form.Check
                type="switch"
                id="custom-switch"
                label="Add 5 minutes Reminder"
                onClick={() => on5MinSwitchAction()}
              />
              <Form.Check
                type="switch"
                id="custom-switch"
                label="Add 10 minutes Reminder"
                onClick={() => on10MinSwitchAction()}
              />
            </Form>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Merchant;
