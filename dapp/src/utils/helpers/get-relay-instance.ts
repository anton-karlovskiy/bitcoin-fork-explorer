
import { RelayLib } from 'relay';

declare global {
  interface Window {
    _relayInstance: any;
  }
}

const getRelayInstance = async () => {
  if (window._relayInstance) {
    return window._relayInstance;
  } else {
    const relay = new RelayLib();
    await relay.init();
    Object.freeze(relay);

    window._relayInstance = relay;

    return relay;
  }
};

export default getRelayInstance;
