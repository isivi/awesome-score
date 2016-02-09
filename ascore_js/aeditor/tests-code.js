const testedFuncName = 'jobAwesomenessScore';


const testedFunc = window[testedFuncName];
if (!testedFunc) {
  throw new ReferenceError(`you need to define ${testedFuncName} function`);
}

const testCases = [
  // none
    { data: { paidVacation: 31, hammocksInOffice: true, freeLunch: true },
    expectScore: (score) => (typeof score !== "undefined" && score !== null),
    error: 'anything is better than nothing.' },
  { data: { paidVacation: 31, hammocksInOffice: true, freeLunch: true },
    avoidScore: (score) => (score <= 0),
    error: 'don’t you underestimate some offers?' },
  { data: { paidVacation: 0, hammocksInOffice: false, freeLunch: false },
    expectScore: (score) => (score <= 0),
    error: 'don’t you overestimate some offers?' },

  // vacation
  { data: { paidVacation: 29, hammocksInOffice: false, freeLunch: false },
    expectScore: 0,
    error: 'so you think these are decent vacations?' },
  { data: { paidVacation: 31, hammocksInOffice: false, freeLunch: false },
    expectScore: (score) => (score >= 1),
    error: 'remember, vacations are always a good idea' },
  // hammocks
  { data: { paidVacation: 0, hammocksInOffice: true, freeLunch: false },
    expectScore: (score) => (score >= 1),
    error: 'hammock in office will make anyone happy' },
  // lunch
  { data: { paidVacation: 0, hammocksInOffice: false, freeLunch: true },
    expectScore: (score) => (score >= 1),
    error: 'nice job is, where lunch is free' },

  // all
  { data: { paidVacation: 31, hammocksInOffice: true, freeLunch: true },
    expectScore: (score) => (score >= 3),
    error: 'don’t you underestimate some offers?' }
];

for (const { expectScore, avoidScore, data, error } of testCases) {
  if (typeof expectScore !== 'undefined') {
    if (typeof expectScore === 'function') {
      if (expectScore(testedFunc(data))) { continue; }
    } else if (testedFunc(data) === expectScore) {
      continue;
    }
  } else if (typeof avoidScore !== 'undefined') {
    if (typeof avoidScore === 'function') {
      if (!avoidScore(testedFunc(data))) { continue; }
    } else if (testedFunc(data) !== avoidScore) {
      continue;
    }
  }
  throw new EvalError(error);
}
