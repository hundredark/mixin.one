import './index.scss';
import './messenger.scss';
import 'slick-carousel/slick/slick.scss';
import 'slick-carousel/slick/slick-theme.scss';
import 'slick-carousel';
import $ from 'jquery';
import background from './assets/BG.jpg';
import messengerLogo from './assets/home_2_1.png';
import rightIcon from './assets/right.png';
import whiteLogo from './assets/logo.svg';
import blueLogo from './logo.png';
import menuIcon from './assets/menus.png';
import network from './assets/home_1.png';
import messenger from './assets/home_2_2.png';
import mvm from './assets/home_mvm.png';
import tip from './assets/home_tip.png';
import mtg from './assets/home_mtg.png';
import googleStore from './google-play.png';
import appStore from './app-store.png';
import apkDownload from './apk.png';
import messengerExample from './messenger.png';
import macExample from './mac.png';
import windowsDownload from './windows.png';
import macDownload from './mac-desktop.png';

function Home(router, api) {
  this.router = router;
  this.api = api;
  this.templateIndex = require('./index.html');
  this.templateXIN = require('./xin.html');
  this.templateMessenger = require('./messenger.html');
}

Home.prototype = {
  index: function () {
    const self = this;
    $('title').html('Mixin - Secure Digital Assets and Messages on Mixin');
    $('body').attr('class', 'home layout');
    $('#layout-container').html(self.templateIndex({
      new_bg_url: background,
      new_right_url: rightIcon,
      new_logo_url: whiteLogo,
      new_menus_url: menuIcon,
      new_home_1_url: network,
      new_home_2_1_url: messengerLogo,
      new_home_2_2_url: messenger,
      home_mvm_url: mvm,
      home_tip_url: tip,
      home_mtg_url: mtg,
      zeromesh: window.location.href.includes("zeromesh"),
      copyright: (new Date()).getFullYear()
    }));
    var os = self.getMobileOperatingSystem();
    if (os === 'iOS') {
      $('.android.button').hide();
    } else if (os === 'Android') {
      $('.ios.button').hide();
    }
    self.router.updatePageLinks();

    $('.blockchains.list').slick({
      "slidesToShow": 6,
      "slidesToScroll": 2,
      'speed': 500,
      "prevArrow": "<span class='icon-arrow-left arrow-left'></span>",
      "nextArrow": "<span class='icon-arrow-right arrow-right'></span>",
      responsive: [{
        breakpoint: 768,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 2,
          infinite: true
        }
      }]
    });
    var src = $('.video-container iframe').attr('src');
    $('.video.button').click(function () {
      $('.modal-dialog').css('display', 'table');
      $('.video-container iframe').attr('src', src + '&autoplay=1');
    });
    $('.close').click(function () {
      $('.modal-dialog').hide();
      $('.video-container iframe').attr('src', src);
    });
    require('./js/index');
  },

  xin: function () {
    var self = this;
    $('title').html('XIN Token | Mixin - Secure Digital Assets and Messages on Mixin');
    $('body').attr('class', 'home layout');
    $('#layout-container').html(self.templateXIN({
      logoURL: blueLogo
    }));
  },

  messenger: function () {
    const self = this;
    $('title').html('Mixin Messenger | Mixin - Secure Digital Assets and Messages on Mixin');
    $('body').attr('class', 'messenger layout');
    $('#layout-container').html(self.templateMessenger({
      logoURL: blueLogo,
      playURL: googleStore,
      storeURL: appStore,
      apkURL: apkDownload,
      messengerURL: messengerExample,
      macURL: macExample,
      windowsURL: windowsDownload,
      macDesktopURL: macDownload
    }));
    var os = self.getMobileOperatingSystem();
    if (os === 'iOS' && navigator.language && navigator.language.includes('zh-CN')) {
      $('.special.version').addClass('hidden');
      $('.android.button').hide();
    } else if (os === 'Android') {
      $('.special.version').removeClass('hidden');
      $('.ios.button').hide();
      if (navigator.language && navigator.language.includes('zh-CN')) {
        $('.android.bar.zh').show();
      } else {
        $('.android.bar.en').show();
      }
    }
    $('.close', '.special.version').on('click', () => {
      $('.special.version').hide();
    });
    self.router.updatePageLinks();
  },

  getMobileOperatingSystem: function () {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
      return "Windows Phone";
    }

    if (/android/i.test(userAgent)) {
      return "Android";
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      return "iOS";
    }

    return "unknown";
  }
};

export default Home;
