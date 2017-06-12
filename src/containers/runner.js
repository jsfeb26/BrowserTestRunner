import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Test from '../components/test';
import { runTests } from '../actions/index';

Runner.propTypes = {
  passedTestCount: PropTypes.number,
  failedTestCount: PropTypes.number,
  runningTestCount: PropTypes.number,
  tests: PropTypes.arrayOf(PropTypes.shape({
    description: PropTypes.string,
    run: PropTypes.func,
    status: PropTypes.oneOf(['PENDING', 'RUNNING', 'PASSED', 'FAILED'])
  })),
  runTests: PropTypes.func
};

function Runner({
  tests,
  passedTestCount,
  failedTestCount,
  runningTestCount,
  finishedRunning,
  runTests
}) {
  return (
    <div>
      <div>
        <div>
          <button onClick={() => runTests(tests)}>Start Tests</button>
          {finishedRunning &&
            <span className="finished">FINISHED!!!</span>
          }
        </div>
        <div>{`Number of passed tests: ${passedTestCount}`}</div>
        <div>{`Number of failed tests: ${failedTestCount}`}</div>
        <div>{`Number of running tests: ${runningTestCount}`}</div>
      </div>
      <div>
        <h3>Running Tests</h3>
        <div>
          {
            tests
              .filter((test) => test.status === 'RUNNING')
              .map((test) => <Test test={test} />)
          }
        </div>
      </div>
      <div>
        <h3>Passed Tests</h3>
        <div>
          {
            tests
              .filter((test) => test.status === 'PASSED')
              .map((test) => <Test test={test} />)
          }
        </div>
      </div>
      <div>
        <h3>Failed Tests</h3>
        <div>
          {
            tests
              .filter((test) => test.status === 'FAILED')
              .map((test) => <Test test={test} />)
          }
        </div>
      </div>
    </div>
  );
};

function mapStateToProps({ testObj }) {
  return { ...testObj };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ runTests }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Runner);
