import React from 'react';
import PropTypes from 'prop-types';

Test.propTypes = {
  test: PropTypes.shape({
    description: PropTypes.string,
    run: PropTypes.func,
    status: PropTypes.oneOf(['PENDING', 'RUNNING', 'PASSED', 'FAILED'])
  })
};

export default function Test({ test }) {
  const { description, status } = test;
  const statusDisplay = getStatusDisplay(status);

  return (
    <div>
      <span>{`Description ${description} - ${statusDisplay}`}</span>
    </div>
  );
};

function getStatusDisplay(status) {
  switch (status) {
    case 'PENDING':
      return 'Not Started Yet';
    case 'RUNNING':
      return 'Running';
    case 'PASSED':
      return 'Passed';
    case 'FAILED':
      return 'Failed';
    default:
      return '';
  }
}
