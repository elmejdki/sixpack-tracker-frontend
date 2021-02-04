import Header from '../containers/Header';
import {
  container,
} from '../stylesheet/NotFoundPage.module.css';

const NotFoundPage = () => (
  <div>
    <Header title="GO BACK" back />
    <div
      className={container}
    >
      <div>404</div>
      <div>Page Not Found</div>
    </div>
  </div>
);

export default NotFoundPage;
