ST_GEOGFROMGEOJSON('{"type":"Polygon","coordinates":[[[-74.564208984375,40.49291502689579],[-73.2183837890625,40.49291502689579],[-73.2183837890625,41.31907562295139],[-74.564208984375,41.31907562295139],[-74.564208984375,40.49291502689579]]]}')

CREATE TABLE alasarr.demog_ags_2020_usa_z18_ny AS 
  SELECT g.*, d.* EXCEPT(geoid) FROM `carto-ps-bq-developers.josema.geo_usa_z18` g
    INNER JOIN `carto-ps-bq-developers.josema.demog_ags_2020_usa_z18` d
            ON g.geoid = d.geoid
    WHERE ST_Intersects(g.geom, ST_GEOGFROMGEOJSON('{"type":"Polygon","coordinates":[[[-74.564208984375,40.49291502689579],[-73.2183837890625,40.49291502689579],[-73.2183837890625,41.31907562295139],[-74.564208984375,41.31907562295139],[-74.564208984375,40.49291502689579]]]}'))

CALL bqcarto.tiler.CREATE_SIMPLE_TILESET(
  R'''
(
  select * from `carto-ps-bq-developers.alasarr.demog_ags_2020_usa_z18_ny`
) _input
  ''',
  R'''`carto-ps-bq-developers.alasarr.tileset_demog_ags_2020_usa_z18_ny`''',
  R'''
  {
      "zoom_min": 14,
      "zoom_max": 14,
      "max_tile_size_kb": 3072,
      "properties":{
          "geoid": "String",
          "popcy": "Number",
          "agecy0509": "Number",
          "agecy1014": "Number",
          "agecy1519": "Number",
          "agecy2024": "Number",
          "agecy2529": "Number",
          "agecy3034": "Number"
       }
  }'''
);