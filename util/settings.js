let settings = {
  isLocal: process.env.NODE_ENV === 'local',
  isDev: process.env.NODE_ENV === 'development',
  isStaging: process.env.NODE_ENV === 'staging',
  isProduction: process.env.NODE_ENV === 'production',
  ASSET_PATH: "assets/",
  responsiveBreakpoint: 992,
  GACcode: "UA-42320309-3",
  isServer: function() {
     return ! (typeof window != 'undefined' && window.document);
  },
  googleReCaptchaKey: '6LfvoDwUAAAAAOnPcoT5E-Eio4_ZaqHwhQVyyqPQ',
  server: 'http://www.rafigeorge.com/',
  server: process.env.NODE_ENV === 'development' ? 'http://localhost:8080/' : 'http://www.rafigeorge.com/',
  colors: {
    "primary": "#5f30ff",
    "primaryLight": "#FFFFFF",
    "secondary": "#e2d0a1"
  },
  shade: function(color, percent) {
    var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
    return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
  }
}

export default settings;
