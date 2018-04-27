import canAutoplay from 'can-autoplay';
import Cookies from 'js-cookie';

export default {
   install(Vue, options) {
      Vue.prototype.$autoplay = canAutoplay;
      Vue.prototype.$cookies = Cookies;
   }
}
