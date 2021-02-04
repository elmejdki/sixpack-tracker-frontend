import { host } from '../usefull_vars';

export default measures => measures.map(
  measure => ({
    ...measure,
    image: `${host}${measure.image}`,
  }),
);
