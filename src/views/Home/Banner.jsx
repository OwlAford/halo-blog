import React from 'react';
import { observer, inject } from 'mobx-react';
import classNames from 'classnames';
import './scss/banner.scss';
import throttle from 'lodash/throttle';
import debounce from 'lodash/debounce';
import * as StackBlur from 'stackblur-canvas';
import { initImage } from '~/libs/tools';
import imageThumb from './images/bg-city-thumb.jpg';
import originImage from './images/bg-city.jpg';

@inject(stores => {
  const {
    home: { is2rdScreen, bannerDarkState },
  } = stores;
  return {
    is2rdScreen,
    bannerDarkState,
    bannerDarkHandle: state => stores.home.bannerDarkHandle(state),
    isNearBottomHandle: state => stores.home.isNearBottomHandle(state),
    is2rdScreenHandle: state => stores.home.is2rdScreenHandle(state),
    isAtBottomHandle: state => stores.home.isAtBottomHandle(state),
  };
})
@observer
class Banner extends React.Component {
  constructor(props) {
    super(props);
    this.scrollPage = this.scrollPage.bind(this);
    this.initBanner = this.initBanner.bind(this);
  }

  componentWillMount() {
    this.props.bannerDarkHandle(false);
  }

  scrollPage() {
    const docEl = document.documentElement;
    const $content = document.querySelector('.home-content');
    const fullHeight = $content ? $content.offsetHeight : 0;
    const scrollTop = docEl.scrollTop || document.body.scrollTop;
    let percent = ~~((scrollTop / this.props.clientH) * 2 * 10000) / 10000;
    if (percent > 1) {
      percent = 1;
    }

    scrollTop > this.props.clientH
      ? this.props.is2rdScreenHandle(true)
      : this.props.is2rdScreenHandle(false);

    scrollTop > this.props.clientH * 2
      ? this.props.isNearBottomHandle(true)
      : this.props.isNearBottomHandle(false);

    fullHeight - scrollTop - this.props.clientH > 100
      ? this.props.isAtBottomHandle(false)
      : this.props.isAtBottomHandle(true);

    if (this.$thumbCanvas) {
      this.$thumbCanvas.style.opacity = percent;
    }
  }

  componentDidMount() {
    this.initBanner(true);
    this.optScroller = throttle(this.scrollPage, 30);
    this.optInitBanner = debounce(e => {
      this.initBanner();
    }, 100);
    window.addEventListener('scroll', this.optScroller, false);
    window.addEventListener('resize', this.optInitBanner, false);
  }

  genSize = wh => {
    const origin = wh;
    const view = [
      this.props.clientW * window.devicePixelRatio,
      this.props.clientH * window.devicePixelRatio,
    ];
    const originRatio = origin[0] / origin[1];
    const viewRatio = view[0] / view[1];

    let clipPoz = [0, 0];
    let clipSize = [].concat(origin);

    if (originRatio > viewRatio) {
      clipSize[1] = origin[1];
      clipSize[0] = origin[1] * viewRatio;
      clipPoz[1] = 0;
      clipPoz[0] = (origin[0] - clipSize[0]) / 2;
    } else {
      clipSize[0] = origin[0];
      clipSize[1] = origin[0] / viewRatio;
      clipPoz[0] = 0;
      clipPoz[1] = ((origin[1] - clipSize[1]) / 2) * 0.3;
    }

    return {
      origin,
      originRatio,
      view,
      viewRatio,
      clipPoz,
      clipSize,
    };
  };

  drawCanvas = (img, canvas, size) => {
    const view = size.view;
    canvas.width = view[0];
    canvas.height = view[1];

    const ctx = canvas.getContext('2d');
    ctx.drawImage(
      img,

      size.clipPoz[0],
      size.clipPoz[1],

      size.clipSize[0],
      size.clipSize[1],

      0,
      0,

      view[0],
      view[1]
    );

    canvas.style.cssText = `width: 100%; height: ${size.view[1] /
      window.devicePixelRatio}px`;
  };

  initBanner(first) {
    const size = this.genSize([2048, 1365]);
    const thumbSize = this.genSize([320, 213]);

    if (this.$banner) {
      const fullCSS = `width: 100%; height: ${size.view[1] /
        window.devicePixelRatio}px`;
      this.$banner.style.cssText = fullCSS;
    }

    const drawBlur = () => {
      this.drawCanvas(this.$imageThumb, this.$thumbCanvas, thumbSize);
      StackBlur.canvasRGB(
        this.$thumbCanvas,
        0,
        0,
        thumbSize.view[0],
        thumbSize.view[1],
        20
      );
    };

    if (first) {
      initImage(this.$imageThumb).then(drawBlur);
    } else {
      drawBlur();
    }

    if (first) {
      initImage(this.$originImage).then(() => {
        if (this.$thumbCanvas) {
          const Style = this.$thumbCanvas.style;
          Style.opacity = 0;
          Style.webkitTransition = Style.transition = 'opacity 30ms linear';
          this.drawCanvas(this.$originImage, this.$originCanvas, size);
        }
      });
    } else {
      this.drawCanvas(this.$originImage, this.$originCanvas, size);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.optScroller);
    window.removeEventListener('scroll', this.optInitBanner);
  }

  render() {
    const Props = this.props;
    return [
      <div
        key="banner"
        className="home-banner"
        ref={node => {
          this.$banner = node;
        }}
      >
        <canvas
          className="originCanvas"
          ref={node => {
            this.$originCanvas = node;
          }}
        />
        <canvas
          className="thumbCanvas"
          ref={node => {
            this.$thumbCanvas = node;
          }}
        />
        <img
          className="imageThumb"
          src={imageThumb}
          ref={node => {
            this.$imageThumb = node;
          }}
        />
        <img
          className="originImage"
          src={originImage}
          ref={node => {
            this.$originImage = node;
          }}
        />
      </div>,
      <div
        key="home-mask"
        className={classNames({
          'home-mask': true,
          dark: !Props.is2rdScreen && Props.bannerDarkState,
        })}
      />,
    ];
  }
}

export default Banner;
