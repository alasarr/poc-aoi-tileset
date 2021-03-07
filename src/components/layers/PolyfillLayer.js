import { GeoJsonLayer } from '@deck.gl/layers';
import { useSelector } from 'react-redux';
import { selectSourceById } from '@carto/react/redux';

function PolyfillLayer() {
  const { polyFillLayer } = useSelector((state) => state.carto.layers);
  const source = useSelector((state) => selectSourceById(state, polyFillLayer?.source));

  if (polyFillLayer && source) {
    console.log(source.data);
    return new GeoJsonLayer({
      id: `polyFilllayer`,
      data: source.data,
      getFillColor: [255, 255, 255],
      getLineColor: [255, 0, 0],
      lineWidthMinPixels: 0.5,
    });
  }
}

export default PolyfillLayer;
