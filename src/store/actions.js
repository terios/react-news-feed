import forIn from 'lodash/forIn'

const req = require.context('.', true, /\.\/.+\/actions\.js$/)

req.keys().forEach((key) => {
  const actions = req(key)
  forIn(actions, (action, name) => {
    console.log(name);
    module.exports[name] = action
  })
})
