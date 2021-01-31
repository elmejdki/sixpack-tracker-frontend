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

export const getProgressPageMeasurements = (measurements, dayGoal) => {
  const onlyValueMeasurements = [];
  const data = [];
  const totalMeasurements = {};
  let dayReps = 0;

  let index = measurements.length - 1;
  let j = 0;

  while (index >= 0) {
    const { measurements: msrs } = measurements[index];
    dayReps = 0;

    while (j < msrs.length) {
      const {
        value,
        measure,
      } = msrs[j];
      onlyValueMeasurements.push({ value });

      if (totalMeasurements[measure.id]) {
        totalMeasurements[measure.id].sum += value;
      } else {
        totalMeasurements[measure.id] = {
          ...measure,
          sum: value,
        };
      }

      dayReps += value;
      j += 1;
    }

    j = 0;

    if (index < 30) {
      if (index === 0) {
        data.push({
          date: measurements[index].created_at,
          rep: dayReps > dayGoal ? dayGoal : dayReps,
          messing: dayReps > dayGoal ? 0 : dayGoal - dayReps,
        });
      } else {
        data.push({
          date: measurements[index].created_at,
          reps: dayReps > dayGoal ? dayGoal : dayReps,
          messing: dayGoal - dayReps,
        });
      }
    }

    index -= 1;
  }

  if (measurements.length < 30) {
    let i = 30 - measurements.length;

    while (i > 0) {
      data.push({
        date: 'X Date',
        goal: dayGoal,
      });
      i -= 1;
    }
  }

  return { onlyValueMeasurements, data, totalMeasurements };
};
