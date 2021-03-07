import { pointToTile, tileToBBOX, tileToQuadkey } from '@mapbox/tilebelt';
import bbox from '@turf/bbox';
import booleanIntersects from '@turf/boolean-intersects';
import bboxPolygon from '@turf/bbox-polygon';
import { parse } from '@loaders.gl/core';
import { MVTLoader } from '@loaders.gl/mvt';

const DATA_ZOOM = 14;
const TARGET_ZOOM = 18;

// TODO: get this from REDUX
const USERNAME = 'aasuero';
const API_KEY = 'default_public';
const SOURCE = 'carto-ps-bq-developers.alasarr.tileset_demog_ags_2020_usa_z18_ny';

const MAPS_API_URL = `https://maps-api-v2.us.carto.com/user/${USERNAME}/bigquery/tileset/{z}/{x}/{y}?source=${SOURCE}&partition=14_14_4798_4860_6123_6174_4000_1&format=mvt&cache=1615100986176&api_key=${API_KEY}`;

function getTilesInGeom(geom, zoom) {
  const [minX, minY, maxX, maxY] = bbox(geom);
  const tilesBBOX = getTilesBBOX({ minX, minY, maxX, maxY, zoom });
  const tiles = new Map();

  for (const tile of tilesBBOX) {
    const tileBBOX = bboxPolygon(tileToBBOX(tile));
    if (booleanIntersects(tileBBOX, geom)) {
      tiles.set(tileToQuadkey(tile), tile);
    }
  }

  return tiles;
}

function getTilesBBOX({ minX, minY, maxX, maxY, zoom }) {
  const [minTileX, minTileY] = pointToTile(minX, minY, zoom);
  const [maxTileX, maxTileY] = pointToTile(maxX, maxY, zoom);
  const tiles = [];

  for (let x = minTileX; x <= maxTileX; x++) {
    for (let y = minTileY; y >= maxTileY; y--) {
      tiles.push([x, y, zoom]);
    }
  }

  return tiles;
}

export const getAOIData = async (geom) => {
  const dataTiles = getTilesInGeom(geom, DATA_ZOOM);
  const targetTiles = getTilesInGeom(geom, TARGET_ZOOM);
  const featuresMap = new Map();

  const getTileData = async (tile) => {
    const url = MAPS_API_URL.replace('{x}', tile[0])
      .replace('{y}', tile[1])
      .replace('{z}', tile[2]);
    const features = await parse(fetch(url), MVTLoader);
    for (const f of features) {
      const props = f.properties;
      const { geoid } = props;
      if (targetTiles.has(geoid) && !featuresMap.has(geoid)) {
        featuresMap.set(geoid, props);
      }
    }
  };

  // RUN requests in parallel
  const requests = [];
  dataTiles.forEach((tile) => {
    requests.push(getTileData(tile));
  });

  await Promise.all(requests);

  // Return the maps values as an array
  return Array.from(featuresMap.values());
};
