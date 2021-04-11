import { Swiper, Button } from 'zent';
import * as React from 'react';

const pages = [1, 2, 3, 4, 5];

export default class JSwiper extends React.Component {
  [x: string]: any;

  go = (index) => {
    this.swiper?.swipeTo(index);
  }

  prev = () => {
    this.swiper?.prev();
  }

  next = () => {
    this.swiper?.next();
  }

  render() {
    return (
      <div className="swiper-demo-container no-flex">
        <Swiper
          ref={(swiper) => this.swiper = swiper}
          className="swiper-demo-simple"
        >
          {
            pages.map((item, index) => {
              return <div className="swiper-demo-simple-h" key={index}>{item}</div>;
            })
          }
        </Swiper>
        <div className="swiper-demo-btn-group">
          {
            pages.map((item, index) => {
              return (
                <Button
                  key={index}
                  type="primary"
                  onClick={() => this.go(index)}
                >
                  {item}
                </Button>
              );
            })
          }
          <Button
            type="primary"
            outline
            onClick={() => this.prev()}>
            prev
          </Button>
          <Button
            type="primary"
            outline
            onClick={() => this.next()}>
            next
          </Button>
        </div>
      </div>

    );
  }
}