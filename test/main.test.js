/* globals jest describe test expect beforeAll afterAll */

const Sails = require('sails').Sails

describe('sails-hook-next', () => {
  // Var to hold a running sails app instance
  var sails

  // Before running any tests, attempt to lift Sails
  beforeAll((done) => {
    // Hook will timeout in 10 seconds
    jest.setTimeout(11000)

    // Attempt to lift sails
    Sails().lift(
      {
        hooks: {
          // Load the hook
          'sails-hook-next': require('../'),
          // Skip grunt (unless your hook uses it)
          grunt: false
        },
        log: { level: 'error' }
      },
      (err, _sails) => {
        if (err) {
          console.log(err)
          throw err
        }

        console.log('nia')

        sails = _sails

        return done()
      }
    )
  })

  // After tests are complete, lower Sails
  afterAll((done) => {
    // Lower Sails (if it successfully lifted)
    if (sails) return sails.lower(done)
    // Otherwise just return
    return done()
  })

  // Test that Sails can lift with the hook in place
  test('sails does not crash', () => {
    expect(true).toBeTruthy()
  })
})
