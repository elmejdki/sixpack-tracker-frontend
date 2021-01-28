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

export const name = 'Zakariae';
