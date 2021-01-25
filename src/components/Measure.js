import PropTypes from 'prop-types';
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
  title, image, video, unit,
}) => (
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
        <span className={edit} />
        <span className={trash} />
      </div>
    </div>
  </div>
);

Measure.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  video: PropTypes.string.isRequired,
  unit: PropTypes.string.isRequired,
};

export default Measure;
