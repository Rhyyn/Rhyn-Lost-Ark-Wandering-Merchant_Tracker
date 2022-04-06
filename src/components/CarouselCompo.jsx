import React from "react";
import { Carousel} from "react-bootstrap";

const CarouselCompo = (props) => {
  console.log(props.item.locationImage.images);
  return (
    <Carousel  interval={null} controls={true}>
      {props.item.locationImage.images.map((item, index) => {
        return (
          <Carousel.Item key={index}>
            <div className="TEST">
              <h4 className="itemZoneName">{item.zoneName}</h4>
              <img className="locationImage" src={"/images/" + props.item.name + "/" + item.zoneImage + ".jpg"}/>
            </div>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
};

//<img className="locationImage" src={"/images/" + props.wantedMerchant.name + "/" + props.wantedMerchant.locationImage.images[0].zoneImage + ".jpg"}/>

export default CarouselCompo;
