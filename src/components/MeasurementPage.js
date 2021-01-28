import { useRef, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from './Header';
import Welcome from './Welcome';
import MeasurementForm from './MeasurementForm';
import SubmitMeasurements from './SubmitMeasurements';
import {
  container as measurementContainer,
  minContent,
} from '../stylesheet/MeasurementPage.module.css';
import {
  container,
} from '../stylesheet/CommonPage.module.css';

const MeasurementPage = ({ measures }) => {
  const containerRef = useRef();
  const [index, setIndex] = useState(0);
  const [measurementsList, setMeasurementsList] = useState([]);

  const handleSlideToRight = () => {
    const value = (index + 1) * 100;

    containerRef.current.style.left = `-${value}vw`;

    setIndex(prevIndex => prevIndex + 1);
  };

  const handleSlideToLeft = () => {
    const value = (index - 1) * 100;

    containerRef.current.style.left = `-${value}vw`;

    setIndex(prevIndex => prevIndex - 1);
  };

  const addMeasurement = (measureId, value) => {
    const measurement = measurementsList.find(
      measurement => measurement.measure_id === measureId,
    );

    if (!measurement) {
      setMeasurementsList(prevMeasurements => [
        ...prevMeasurements,
        {
          measure_id: measureId,
          value,
        },
      ]);
    }
  };

  const handleSubmit = () => {
    console.log(measurementsList);
  };

  return (
    <div>
      <Header title="Add Measurement" />
      <div className={`${container} ${measurementContainer}`}>
        {
          /* false ? (
            <div>Come back tomorrow</div>
          ) : ( */
        }
        <div
          ref={containerRef}
          className={`${container} ${minContent}`}
        >
          <Welcome
            handleSlideToRight={handleSlideToRight}
          />
          {
            measures.map(({
              id, title, image, video, unit,
            }) => (
              <MeasurementForm
                key={id}
                id={id}
                title={title}
                image={image}
                video={video}
                unit={unit}
                handleSlideToLeft={handleSlideToLeft}
                handleSlideToRight={handleSlideToRight}
                addMeasurement={addMeasurement}
              />
            ))
          }
          <SubmitMeasurements
            measurementsList={measurementsList}
            handleSlideToLeft={handleSlideToLeft}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

MeasurementPage.propTypes = {
  measures: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = ({ measures }) => ({
  measures: measures.sort((measureA, measureB) => measureA.id - measureB.id),
});

export default connect(mapStateToProps)(MeasurementPage);
