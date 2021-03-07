import GeocoderLayer from './GeocoderLayer';
import DemographyTilesetLayer from './DemographyTilesetLayer';
// Auto import

export const getLayers = () => {
  return [
    GeocoderLayer(),
    DemographyTilesetLayer(),
    // Auto import layers
  ];
};
