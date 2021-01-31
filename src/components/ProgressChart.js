import PropTypes from 'prop-types';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  container,
  chartContainer,
  goalOverview,
  progressDays,
} from '../stylesheet/ProgressChart.module.css';

const ProgressChart = ({ data, trainedDays, repsGoal }) => (
  <div
    className={container}
  >
    <div
      className={progressDays}
    >
      Day
      &nbsp;
      <span>{trainedDays}</span>
      &nbsp;
      progress to goal
    </div>
    <ResponsiveContainer aspect={4.0 / 1.2}>
      <BarChart
        data={data}
        className={chartContainer}
      >
        <XAxis hide dataKey="date" />
        <YAxis hide />
        <Tooltip
          labelStyle={{
            color: '#616c77',
            fontSize: '18px',
            fontWeight: 'bold',
          }}
          itemStyle={{
            color: 'black',
            textTransform: 'capitalize',
            fontSize: '12px',
            fontWeight: 'lighter',
          }}
        />
        <Bar dataKey="reps" stackId="a" fill="#b9c3ce" />
        <Bar dataKey="rep" stackId="a" fill="#41b5e8" />
        <Bar dataKey="messing" stackId="a" fill="#f3f4f6" />
        <Bar dataKey="goal" stackId="a" fill="#f3f4f6" />
      </BarChart>
    </ResponsiveContainer>
    <div
      className={goalOverview}
    >
      Goal:
      &nbsp;
      <span>
        {repsGoal}
        &nbsp;
        Reps
      </span>
    </div>
  </div>
);

ProgressChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.any),
  ).isRequired,
  trainedDays: PropTypes.number.isRequired,
  repsGoal: PropTypes.number.isRequired,
};

export default ProgressChart;
