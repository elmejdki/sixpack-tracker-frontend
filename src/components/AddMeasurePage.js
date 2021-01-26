import Header from './Header';
import { container } from '../stylesheet/CommonPage.module.css';

const AddMeasurePage = () => (
  <div>
    <Header title="Add Measure" back />
    <div className={`${container}`}>
      <h1>Add Measure</h1>
    </div>
  </div>
);

export default AddMeasurePage;
