import React from "react";
import Header from "../components/Header";
import CountdownCompo from "../components/CountdownCompo";
import MerchantList from "../MerchantsList.json";

const Merchant = () => {
  // console.log(MerchantList.merchants01[0].spawntimer.times.spawn01);

  // MerchantList.merchants01.map((item, index) => (
  //   console.log(item.spawntimer.times)))


  // MerchantList.merchants01[0].spawntimer.times.map((item,index) => {
  //   console.log(item);
  // })
  
  // console.log(MerchantList.merchants01[0].spawntimer.times);

  ///MAPPPPPPPPP
  let data = MerchantList.merchants01[0].spawntimer.times;
  data.forEach(element => {
    // console.log(element.hour);
  });


  return (
    <div className="merchantPage">
      <header>
        <Header></Header>
      </header>
      <div className="merchantBody">
        <div className="merchantGroup">
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
        </div>
      </div>
    </div>
  );
};

export default Merchant;

// logic :
// MerchantList.merchants01[0].spawntimer.times.forEach((item) => {
//      now = currentTime
//      remainingTime =
//
//})
//
