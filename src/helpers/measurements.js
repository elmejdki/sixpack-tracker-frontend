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

export const restructureMeasurements = measurements => {
  const result = [];

  let index = 0;

  let prevDate = measurements[0].created_at;

  let hash = {
    created_at: prevDate,
    measurements: [],
  };

  while (index < measurements.length) {
    const {
      id, value, measure, created_at: createdAt,
    } = measurements[index];

    if (prevDate !== createdAt) {
      prevDate = createdAt;

      result.push(hash);

      hash = {
        created_at: prevDate,
        measurements: [],
      };
    }

    hash.measurements.push({
      id,
      value,
      measure: { ...measure },
    });

    index += 1;
  }

  result.push(hash);

  return result;
};

export const findMeasurementByDate = (
  measurements, date, start = 0, end = measurements.length - 1,
) => {
  if (start > end) {
    return false;
  }

  const mid = Math.floor((end + start) / 2);
  const measurementDateMilli = moment(measurements[mid].created_at, 'DD MMM YYYY').valueOf();
  const dateMilli = moment(date, 'DD MMM YYYY').valueOf();

  if (measurementDateMilli < dateMilli) {
    return findMeasurementByDate(measurements, date, start, mid - 1);
  }

  if (measurementDateMilli > dateMilli) {
    return findMeasurementByDate(measurements, date, mid + 1, end);
  }

  return mid;
};

// TODO: handle measurements that are counted by secs also.
export const getScore = measurements => {
  let score = 0;

  measurements.forEach(measurement => {
    score += measurement.value;
  });

  return score;
};

export const getScoreReview = (score, goal) => {
  if (score > (goal * 2) / 3) {
    return 'high';
  }

  if (score > goal / 3) {
    return 'medium';
  }

  return 'low';
};

export const getOnlyValueMeasurements = measurements => {
  const result = [];

  measurements.forEach(measurement => {
    measurement.measurements.forEach(({ value }) => {
      result.push({ value });
    });
  });

  return result;
};

// console.log(moment().subtract(1, 'week').endOf('week'));
