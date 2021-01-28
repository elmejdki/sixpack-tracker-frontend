import Header from './Header';
import Welcome from './Welcome';
import {
  container as measurementContainer,
  minContent,
} from '../stylesheet/MeasurementPage.module.css';
import {
  container,
} from '../stylesheet/CommonPage.module.css';

const MeasurementPage = () => (
  <div>
    <Header title="Add Measurement" />
    <div className={`${container} ${measurementContainer}`}>
      {
        /* false ? (
          <div>Come back tomorrow</div>
        ) : ( */
      }
      <div
        className={`${container} ${minContent}`}
      >
        <Welcome />
        <Welcome />
        <Welcome />
      </div>
    </div>
  </div>
);

export default MeasurementPage;
