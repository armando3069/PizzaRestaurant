import React from 'react'
import { responsiveLandingPanel, landingPanel } from "../../helpers/utility";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Panel = () => {
  return (
    <div>
        <Carousel
  autoPlay={true}
  swipeable={true}
  draggable={true}
  showDots={true}
  infinite={true}
  partialVisible={false}
  focusOnSelect={false}
  keyBoardControl
  minimumTouchDrag={80}
  pauseOnHover
  renderArrowsWhenDisabled={false} // Aceasta deja este setată corect
  arrows={false} // Adaugă această linie
  renderButtonGroupOutside={false}
  renderDotsOutside={false}
  responsive={responsiveLandingPanel}
  rewind={false}
  rewindWithAnimation={true}
  rtl={false}
  shouldResetAutoplay
  sliderClass=""
  slidesToSlide={1}
        >
          {landingPanel.map((item, index) => (
            <div className="panelDate" key={index}>
              <img style={{borderRadius:"16px"}} src={item.image} alt="" />
            </div>
          ))}
        </Carousel>
    </div>
  )
}

export default Panel