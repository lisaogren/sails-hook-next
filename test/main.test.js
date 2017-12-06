import { Sails } from 'sails';

describe('sails-hook-next', () => {
  // Var to hold a running sails app instance
  let sails;

  // Before running any tests, attempt to lift Sails
  beforeAll((done) => {
    // Hook will timeout in 10 seconds
    jest.setTimeout(10000);

    // Attempt to lift sails
    Sails().lift(
      {
        hooks: {
          next: require('../src/api/hooks/next/index.js'),
          // Skip grunt (unless your hook uses it)
          grunt: false,
        },
        blueprints: {
          prefix: '/api',
        },
        log: { level: 'error' },
      },
      (err, _sails) => {
        if (err) {
          throw err;
        }

        sails = _sails;

        return done();
      }
    );
  });

  // Test that Sails can lift with the hook in place
  test('sails does not crash', () => {
    expect(true).toBeTruthy();
  });

  // After tests are complete, lower Sails
  afterAll((done) => {
    // Lower Sails (if it successfully lifted)
    if (sails) {
      return sails.lower(done);
    }

    // Otherwise just return
    return done();
  });

});
