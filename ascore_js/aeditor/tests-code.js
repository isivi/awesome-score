const testedFuncName = 'jobAwesomenessScore';


const testedFunc = window[testedFuncName];
if (!testedFunc) {
  throw new ReferenceError(`you need to define ${testedFuncName} function`);
}

const testCases = [
  // none
  { data: { paidVacation: 31, hammocksInOffice: true, freeLunch: true },
    avoidScore: 0, error: 'no awesomeness? you can find it, it\'s there' },
  { data: { paidVacation: 0, hammocksInOffice: false, freeLunch: false },
    expectScore: 0, error: 'so yous say that even crappy jobs are awesome...' },

  // vacation
  { data: { paidVacation: 29, hammocksInOffice: false, freeLunch: false },
    expectScore: 0, error: 'so you think these are decent vacations?' },
  { data: { paidVacation: 31, hammocksInOffice: false, freeLunch: false },
    expectScore: 1, error: 'didn\'t you forget about vacations?' },
  // hammocks
  { data: { paidVacation: 0, hammocksInOffice: true, freeLunch: false },
    expectScore: 1, error: 'hammock in office will make anyone happy' },
  // lunch
  { data: { paidVacation: 0, hammocksInOffice: false, freeLunch: true },
    expectScore: 1, error: 'nice job is, where lunch is free' },

  // all
  { data: { paidVacation: 31, hammocksInOffice: true, freeLunch: true },
    expectScore: 3, error: 'you aim high, that\'s great, but better check your code' },

];

for (const testCase of testCases) {
  if (typeof testCase.expectScore !== 'undefined') {
    if (testedFunc(testCase.data) == testCase.expectScore) {
      continue;
    }
  } else if (typeof testCase.avoidScore !== 'undefined') {
    if (testedFunc(testCase.data) != testCase.avoidScore) {
      continue;
    }
  }
  throw new EvalError(testCase.error);
}
