import { RUN_TEST, COMPLETE_TEST } from '../actions/index';

function generateDummyTest() {
  var delay = 7000 + Math.random() * 7000;
  var testPassed = Math.random() > 0.5;

  return function(callback) {
    setTimeout(function() {
      callback(testPassed);
    }, delay);
  };
}

var tests = [
  { description: "commas are rotated properly",          run: generateDummyTest() },
  { description: "exclamation points stand up straight", run: generateDummyTest() },
  { description: "run-on sentences don't run forever",   run: generateDummyTest() },
  { description: "question marks curl down, not up",     run: generateDummyTest() },
  { description: "semicolons are adequately waterproof", run: generateDummyTest() },
  { description: "capital letters can do yoga",          run: generateDummyTest() }
];

const initialState = {
  passedTestCount: 0,
  failedTestCount: 0,
  runningTestCount: 0,
  finishedRunning: false,
  tests: tests.map((test, index) => {
    return {
      ...test,
      id: index,
      status: 'PENDING' // should make statuses enum
    }
  })
};

export default function(state = initialState, action) {
  switch (action.type) {
    case RUN_TEST:
      const newState = {
        ...state,
        runningTestCount: state.runningTestCount + 1,
      };
      newState.tests.find((test) => test.id === action.test.id).status = 'RUNNING';

      return newState;
    case COMPLETE_TEST:
      const updatedState = {
        ...state,
        runningTestCount: state.runningTestCount - 1,
        failedTestCount: !action.testPassed ? state.failedTestCount + 1 : state.failedTestCount,
        passedTestCount: action.testPassed ? state.passedTestCount + 1 : state.passedTestCount,
        finishedRunning: state.runningTestCount - 1 === 0
      };
      const currTest = updatedState.tests.find((test) => test.id === action.test.id);
      currTest.status = action.testPassed ? 'PASSED' : 'FAILED';

      return updatedState;
    default:
      return state;
  }
}
