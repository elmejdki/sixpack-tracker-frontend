import { useRef, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link, useHistory } from 'react-router-dom';
import Header from './Header';
import Welcome from './Welcome';
import Loader from './Loader';
import MeasurementForm from './MeasurementForm';
import SubmitMeasurements from './SubmitMeasurements';
import { startAddMeasurements } from '../actions/measurements';
import {
  container as measurementContainer,
  minContent,
  message,
} from '../stylesheet/MeasurementPage.module.css';
import {
  container,
  fullHeight,
  whiteBackground,
} from '../stylesheet/CommonPage.module.css';

const MeasurementPage = ({ measures, startAddMeasurements, lastMeasurement }) => {
  const history = useHistory();
  const containerRef = useRef();
  const [index, setIndex] = useState(0);
  const [measurementsList, setMeasurementsList] = useState([]);

  const [loading, setLoading] = useState(false);

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

  const handleMeasurement = (measureId, value) => {
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
    } else {
      setMeasurementsList(prevMeasurements => prevMeasurements.map(
        prevMeasurement => {
          if (prevMeasurement.measure_id === measurement.measure_id) {
            return {
              ...measurement,
              value,
            };
          }

          return prevMeasurement;
        },
      ));
    }
  };

  const handleSubmit = () => {
    setLoading(true);

    startAddMeasurements(measurementsList).then(({ error }) => {
      if (error) {
        setLoading(false);
      } else {
        history.push('/track');
      }
    });
  };

  return (
    <div>
      <Header title="Add Measurement" />
      {
        loading ? (
          <Loader height={fullHeight} />
        ) : (
          <div className={`${container} ${measurementContainer}`}>
            {
              lastMeasurement.created_at === moment().format('MMM D YYYY') ? (
                <div
                  className={`${container} ${measurementContainer} ${whiteBackground}`}
                >
                  <div
                    className={message}
                  >
                    <div>
                      You are good for today, Come back tomorrow&nbsp;
                      to add a new measurement
                    </div>
                    <div>
                      Feel Free to check your&nbsp;
                      <Link to="/progress">progress</Link>
                    </div>
                  </div>
                </div>
              ) : (
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
                        handleMeasurement={handleMeasurement}
                      />
                    ))
                  }
                  <SubmitMeasurements
                    measurementsList={measurementsList}
                    handleSlideToLeft={handleSlideToLeft}
                    onSubmit={handleSubmit}
                  />
                </div>
              )
            }
          </div>
        )
      }
    </div>
  );
};

MeasurementPage.propTypes = {
  measures: PropTypes.arrayOf(PropTypes.object).isRequired,
  startAddMeasurements: PropTypes.func.isRequired,
  lastMeasurement: PropTypes.oneOfType([
    PropTypes.objectOf(PropTypes.any), PropTypes.bool,
  ]),
};

MeasurementPage.defaultProps = {
  lastMeasurement: false,
};

const mapStateToProps = ({ measures, measurements }) => ({
  measures: measures.sort((measureA, measureB) => measureA.id - measureB.id),
  lastMeasurement: measurements[0],
});

const mapDispatchToProps = {
  startAddMeasurements,
};

export default connect(mapStateToProps, mapDispatchToProps)(MeasurementPage);
