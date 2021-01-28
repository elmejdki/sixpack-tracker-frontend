export const fixMeasureImages = measures => measures.map(
  measure => ({
    ...measure,
    image: `http://localhost:3000${measure.image}`,
  }),
);

export const name = 'zakariae';
