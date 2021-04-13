import settings from './settings';
import ReactGA from 'react-ga';

export default {
    setup: () => {
        if (!settings.isServer() && !window.INITIALIZED_GA) {
            ReactGA.initialize(settings.GACode)
            window.INITIALIZED_GA = true;
            return ReactGA;
        } else if (window.INITIALIZED_GA) {
            return ReactGA;
        }
    }
}