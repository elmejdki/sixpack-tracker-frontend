import { useParams } from 'react-router-dom';

const ScorePage = () => {
  const { date } = useParams();
  return (
    <div>
      <h1>
        Score Page for&nbsp;
        {date}
      </h1>
    </div>
  );
};

export default ScorePage;
