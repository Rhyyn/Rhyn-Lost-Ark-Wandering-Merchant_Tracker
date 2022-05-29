import { React, useState } from "react";
import Header from "../components/Header";
import CountdownCompo from "../components/CountdownCompo";
import MerchantList from "../MerchantsList.json";
import { DropdownButton, Dropdown, Form } from "react-bootstrap";

const Merchant = () => {
    const merchants = MerchantList.merchants;
    const serverList = [
        "US West",
        "US East",
        "EU West",
        "EU Central",
        "South America",
    ];
    const [wantedMerchant, setWantedMerchant] = useState([]);
    const [is5MinSwitchOn, setIs5MinSwitchOn] = useState(false);
    const [is10MinSwitchOn, setIs10MinSwitchOn] = useState(false);
    const [userServer, setUserServer] = useState();
    const [showServer, setShowServer] = useState(false);
    let time = new Date().getTime();
    let demoTime = [
        time + 20000,
        time + 40000,
        time + 60000,
        time + 80000,
        time + 100000,
        time + 120000,
    ]; // USED FOR DEMO

    const on5MinSwitchAction = () => {
        setIs5MinSwitchOn(!is5MinSwitchOn);
    };

    const on10MinSwitchAction = () => {
        setIs10MinSwitchOn(!is10MinSwitchOn);
    };

    const onClick = (merchant) => {
        //                        Add Merchant user chose to State to pass down to CountdownCompo
        setWantedMerchant((prevWantedMerchant) => [
            ...prevWantedMerchant,
            merchant,
        ]);
    };

    const setServerOnClick = (server) => {
        setUserServer(server);
        setShowServer(!showServer);
    };

    return (
        <div className="merchantPage">
            <header>
                <Header></Header>
            </header>
            <div className="merchantBody">
                {showServer ? (
                    <h5 className="userServerText">{userServer}</h5>
                ) : (
                    <DropdownButton
                        variant="primary"
                        id="dropdown-basic-button"
                        title="Select your Server"
                        autoClose="true"
                        className="dropdownButton serverButton"
                    >
                        <Dropdown.Divider />
                        {serverList.map((server, index) => {
                            return (
                                <Dropdown.Item key={index}>
                                    <h6
                                        onClick={() => {
                                            setServerOnClick(server);
                                        }}
                                    >
                                        {server}
                                    </h6>
                                </Dropdown.Item>
                            );
                        })}
                    </DropdownButton>
                )}

                {userServer && (
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
                        {merchants.map((merchant, index) => {
                            if (merchant.group === "1") {
                                return (
                                    <Dropdown.Item key={index}>
                                        <h5
                                            onClick={() => {
                                                //                     onClick call onClick function and set item to State
                                                onClick(merchant);
                                            }}
                                        >
                                            {merchant.name}
                                        </h5>
                                    </Dropdown.Item>
                                );
                            }
                            return null;
                        })}
                        <Dropdown.Divider />
                        <h5 className="dropdownSchedules">Schedule 2</h5>
                        <Dropdown.Divider />
                        {merchants.map((merchant, index) => {
                            if (merchant.group === "2") {
                                return (
                                    <Dropdown.Item key={index}>
                                        <h5
                                            onClick={() => {
                                                //                                  onClick call onClick function and set item to State
                                                onClick(merchant);
                                            }}
                                        >
                                            {merchant.name}
                                        </h5>
                                    </Dropdown.Item>
                                );
                            }
                            return null;
                        })}
                        <Dropdown.Divider />
                        <h5 className="dropdownSchedules">Schedule 3</h5>
                        <Dropdown.Divider />
                        {merchants.map((merchant, index) => {
                            if (merchant.group === "3") {
                                return (
                                    <Dropdown.Item key={index}>
                                        <h5
                                            onClick={() => {
                                                //                                  onClick call onClick function and set item to State
                                                onClick(merchant);
                                            }}
                                        >
                                            {merchant.name}
                                        </h5>
                                    </Dropdown.Item>
                                );
                            }
                            return null;
                        })}
                    </DropdownButton>
                )}
                <div className="merchantList">
                    {wantedMerchant && //                           If wantedMerchant exists
                        wantedMerchant.map((item, index) => {
                            //                                           map through then return each merchant user selected
                            return (
                                <CountdownCompo
                                    id={index}
                                    key={index}
                                    userServer={userServer}
                                    wantedMerchant={item}
                                    is5MinSwitchOn={is5MinSwitchOn} // pass state of Switch Reminders buttons to Card Compo
                                    is10MinSwitchOn={is10MinSwitchOn} // pass state of Switch Reminders buttons to Card Compo
                                    demoTime={demoTime} // USED FOR DEMO
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
