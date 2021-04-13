'use strict';
var MobileDetect = require('mobile-detect');
var utilOS = require('./util-os');
var utilBrowser = require('./util-browser');
var settings = require('../settings').default;
var env, ua, md = {}, nav = {};

var init = () => {
  var client = (typeof window != 'undefined' && window.document);
  nav = client ? window.navigator : {};
  env = process.env.NODE_ENV || 'development';
  ua = nav.userAgent;
  md = new MobileDetect(ua);
}

var checkDevice = () => {
  var device = 'desktop';
  if (md.mobile() && md.phone()) {
    device = 'phone';
  } else if (md.mobile() && md.tablet()) {
    device = 'tablet';
  }
  return device;
};

var checkBreakpoint = (breakpoint) => {
  const width = window.innerWidth
  switch(breakpoint) {
    case 'xs':
      return width < 556;
    case 'sm':
      return width >= 556;
    case 'md':
      return width >= 768;
    case 'lg':
      return width >= 992;
    case 'xl':
      return width >= 1200;
  }
};

var checkVendor = () => {
  return (nav.vendor) ? nav.vendor.toLowerCase() : '';
};

var checkBrowser = () => {
  var browser = 'unknown';
  var uaLower = ua.toLowerCase();
  var msie = uaLower.indexOf('msie') >= 0;
  var trident = uaLower.indexOf('trident/') >= 0;

  if (msie || trident) {
    browser = 'ie';
  } else if (ua.toLowerCase().indexOf('edge') >= 0) {
    browser = 'edge';
  } else if (uaLower.indexOf('firefox') >= 0) {
    browser = 'firefox';
  } else if ((uaLower.indexOf('safari') >= 0 && checkVendor().indexOf('apple') >= 0) || (env.indexOf('dev') >= 0 && uaLower.indexOf('iphone') >= 0 && uaLower.indexOf('chrome') < 0)) {
    browser = 'safari';
  } else if (uaLower.indexOf('opr') >= 0) {
    browser = 'opera';
  } else if (uaLower.indexOf('chrome') >= 0 && checkVendor().indexOf('google') >= 0) {
    browser = 'chrome';
  }
  return browser;
};

var checkDevicePixelRatio = () => {
  var pxlRatio = window.devicePixelRatio;
  if (utilOS.os() === 'iOS' && window.innerWidth >= 375 && window.devicePixelRatio < 3) pxlRatio = 3;
  return pxlRatio;
};

var checkManufacturer = () => {
  var man = 'unknown';
  if (md.phone()) {
    man = md.phone();
  } else if (md.tablet()) {
    man = md.tablet();
  }
  return man.toLowerCase();
};

var getClasses = () => {
  var classes = [checkDevice(), 'x' + checkDevicePixelRatio(),
                  getOrientation(), checkBrowser(),
                  'v' + utilBrowser.checkVersion(),
                  (utilOS.os()).replace(/\s/g, '_').toLocaleLowerCase()];
  if (md.mobile()) classes.push(checkManufacturer());
  return classes.filter(function(cur) { return !!cur; });
};

var getOrientation = () => {
  var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  var aspectRatio = w / h;
  if (aspectRatio < 1) {
    return 'portrait';
  } else {
    return 'landscape';
  }
}

module.exports = {
  init: init,
  isBot: utilBrowser.checkBot,
  isFacebook: utilBrowser.checkFacebook,
  device: checkDevice,
  vendor: checkVendor,
  os: utilOS.os,
  isIOS: () =>{return utilOS.os() === 'iOS'},
  isAndroid: () =>{return utilOS.os() === 'Android'},
  osVersion: () =>{return utilOS.osVersion()},
  browser: checkBrowser,
  browserVersion: utilBrowser.checkVersion,
  manufacturer: checkManufacturer,
  devicePixelRatio: checkDevicePixelRatio,
  classes: getClasses,
  isMobile: !!md.mobile,
  isPhone: !!md.phone,
  isTablet: !!md.tablet,
  isDesktop: !(md.phone || md.tablet),
  isChrome: () =>{return(checkBrowser().indexOf('chrome') >= 0 && checkVendor().indexOf('google') >= 0)},
  isIE: () =>{return((ua.toLowerCase().indexOf('msie') >= 0) || (ua.toLowerCase().indexOf('trident/') >= 0))},
  isEdge: () =>{return(ua.toLowerCase().indexOf('edge') >= 0)},
  isFirefox: () =>{return(checkBrowser().indexOf('firefox') >= 0)},
  isSafari: () =>{return(checkBrowser().indexOf('safari') >= 0 && checkVendor().indexOf('apple') >= 0)},
  isOpera: () =>{return(checkBrowser().indexOf('opera') >= 0)},
  md: md,
  checkBreakpoint: checkBreakpoint,
  orientation: getOrientation
};
