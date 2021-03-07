import { useEffect } from 'react';
// import demographyTilesetSource from 'data/sources/demographyTilesetSource';

// import { DEMOGRAPHY_TILESET_LAYER_ID } from 'components/layers/DemographyTilesetLayer';

// import { useDispatch } from 'react-redux';
// import { addLayer, removeLayer, addSource, removeSource } from '@carto/react/redux';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import { getAOIData } from '../../data/models/AOIModel';

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const aoi = {
  type: 'Polygon',
  coordinates: [
    [
      [-73.97987365722656, 40.767541670057234],
      [-73.99669647216797, 40.757920208794026],
      [-73.99978637695312, 40.74127439314326],
      [-73.9990997314453, 40.73633186448861],
      [-73.99600982666016, 40.73216945026674],
      [-73.9874267578125, 40.73711228816394],
      [-73.9822769165039, 40.74049401829621],
      [-73.98090362548828, 40.73685214795608],
      [-73.97815704345703, 40.73893324113601],
      [-73.97815704345703, 40.74413568925235],
      [-73.9767837524414, 40.749337730454826],
      [-73.9764404296875, 40.75375914553263],
      [-73.97884368896484, 40.757400090129245],
      [-73.98330688476561, 40.75948054037175],
      [-73.98124694824219, 40.763641245521754],
      [-73.97987365722656, 40.767541670057234],
    ],
  ],
};

export default function Demography() {
  const classes = useStyles();

  useEffect(() => {
    async function fetchData() {
      const data = await getAOIData(aoi);
      console.log(data);
    }
    fetchData();
  }, []);

  // Auto import useEffect

  return (
    <Grid container direction='column' className={classes.root}>
      <Grid item>Hello World</Grid>
    </Grid>
  );
}
