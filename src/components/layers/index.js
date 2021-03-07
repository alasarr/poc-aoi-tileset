import GeocoderLayer from './GeocoderLayer';
import PolyfillLayer from './PolyfillLayer';
// [hygen] Import layers

export const getLayers = () => {
  return [
    GeocoderLayer(),
    PolyfillLayer(),
    // [hygen] Add layer
  ];
};
