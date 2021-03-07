import { useSelector } from 'react-redux';
import { CartoBQTilerLayer } from '@deck.gl/carto';
import { selectSourceById } from '@carto/react/redux';
import { useCartoLayerFilterProps } from '@carto/react/api';
import htmlForFeature from 'utils/htmlForFeature';

export const DEMOGRAPHY_TILESET_LAYER_ID = 'demographyTilesetLayer';

function DemographyTilesetLayer() {
  const { demographyTilesetLayer } = useSelector((state) => state.carto.layers);
  const source = useSelector((state) =>
    selectSourceById(state, demographyTilesetLayer?.source)
  );
  const cartoFilterProps = useCartoLayerFilterProps(source);

  if (demographyTilesetLayer && source) {
    return new CartoBQTilerLayer({
      ...cartoFilterProps,
      id: DEMOGRAPHY_TILESET_LAYER_ID,
      data: source.data,
      credentials: source.credentials,
      getFillColor: [241, 109, 122],
      pointRadiusMinPixels: 2,
      pickable: true,
      onHover: (info) => {
        if (info?.object) {
          info.object = {
            html: htmlForFeature(info.object),
            style: {},
          };
        }
      },
    });
  }
}

export default DemographyTilesetLayer;
