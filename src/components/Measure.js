import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { startRemoveMeasure } from '../actions/measures';
import youtubeLogo from '../assets/images/youtube-logo.png';
import {
  container,
  measureImage,
  measureInfo,
  infoContainer,
  ytbLogoImage,
  ytbLink,
  measureTitle,
  unitContainer,
  actions,
  edit,
  trash,
} from '../stylesheet/Measure.module.css';

const Measure = ({
  id, title, image, video, unit, startRemoveMeasure,
}) => {
  const history = useHistory();

  const handleRemove = () => {
    startRemoveMeasure(id);
  };

  const handleEditAction = () => {
    history.push(`/measures/edit/${id}`);
  };

  return (
    <div className={container}>
      <img
        src={image}
        className={measureImage}
        alt="measure display"
      />
      <div className={measureInfo}>
        <div className={measureTitle}>
          {title}
        </div>
        <div className={infoContainer}>
          <a
            href={video}
            target="_blank"
            rel="noreferrer"
            className={ytbLink}
          >
            <img
              src={youtubeLogo}
              alt="youtube Logo"
              className={ytbLogoImage}
            />
          </a>
          <div className={unitContainer}>
            unit: &nbsp;
            <span>{unit}</span>
          </div>
        </div>
        <div className={actions}>
          <button
            type="button"
            onClick={handleEditAction}
          >
            <span className={edit} />
          </button>
          <button
            type="button"
            onClick={handleRemove}
          >
            <span className={trash} />
          </button>
        </div>
      </div>
    </div>
  );
};

Measure.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  video: PropTypes.string.isRequired,
  unit: PropTypes.string.isRequired,
  startRemoveMeasure: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  startRemoveMeasure,
};

export default connect(null, mapDispatchToProps)(Measure);
