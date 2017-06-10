export const RUN_TEST = 'RUN_TEST';
export const COMPLETE_TEST = 'COMPLETE_TEST';

function runTest(test) {
  return {
    type: RUN_TEST,
    test
  };
}

function completeTest(test, testPassed) {
  return {
    type: COMPLETE_TEST,
    test,
    testPassed
  };
}

export function runTests(tests) {
  return (dispatch) => {
    tests.forEach((test) => {
      dispatch(runTest(test));

      test.run((testPassed) => {
        dispatch(completeTest(test, testPassed));
      });
    });
  }
}
