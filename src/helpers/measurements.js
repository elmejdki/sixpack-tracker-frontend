import moment from 'moment';

export const getMeasurements = (measures, measurements) => {
  if (measurements.length === measures.length) {
    const hashedMeasures = {};
    const hashedMeasurements = {};

    measures.forEach(measure => {
      hashedMeasures[measure.id] = { ...measure };
    });

    measurements.forEach(measurement => {
      hashedMeasurements[measurement.measure_id] = { ...measurement };
    });

    const measuresIds = Object.keys(hashedMeasures);

    return measuresIds.map(id => ({
      id,
      title: hashedMeasures[id].title,
      image: hashedMeasures[id].image,
      unit: hashedMeasures[id].unit,
      value: hashedMeasurements[id].value,
    }));
  }

  return [];
};

export const fixMeasurements = measurements => measurements.map(({
  id, value, created_at: createdAt, measure,
}) => ({
  id,
  value,
  created_at: moment(createdAt).format('MMM D YYYY'),
  measure: {
    ...measure,
    image: `http://localhost:3000${measure.image}`,
  },
}));

export const sortMeasurements = measurements => measurements.sort(
  (a, b) => moment(b.created_at).valueOf() - moment(a.created_at).valueOf(),
);
