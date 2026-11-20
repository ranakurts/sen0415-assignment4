// Rana Neslihan Kurt, 2300006496
// Destructuring in parameters and loops (forms 11 and 12). Run with `node js/params.mjs`.

// Form 11 (worked example): an options object in the parameter list, with defaults.
function createTask({ title, status = 'todo' } = {}) {
  return { title, status }
}
console.log('form 11:', createTask({ title: 'Read' })) // form 11: { title: 'Read', status: 'todo' }

// Form 11b: the same idea with an array parameter, ([x, y]) => ...
// Form 11 with my own data
function describeShow({ title, seasons = 1, finished = true } = {}) {
  return `${title}: ${seasons} season(s), finished: ${finished}`
}
console.log('form 11 (my data):', describeShow({ title: 'Awake' }))
console.log('form 11 (no argument):', describeShow())

// the same function WITHOUT "= {}" at the end
function describeShowNoDefault({ title }) {
  return title
}
try {
  describeShowNoDefault()
} catch (error) {
  console.log('form 11 (without = {}):', error.message)
}

// Form 11b: an array pattern in the parameter
const formatEpisode = ([season, episode]) => `S${season}E${episode}`
console.log('form 11b:', formatEpisode([2, 5]))

// Form 12: loops over entries, for (const [key, value] of Object.entries(obj)) and a Map
const myRatings = { Suits: 9, Awake: 8, 'The Mentalist': 8.5 }
for (const [show, rating] of Object.entries(myRatings)) {
  console.log('form 12 (object):', show, rating)
}

const lastWatched = new Map([
  ['Suits', 'S9E10'],
  ['Awake', 'S1E13'],
  ['The Mentalist', 'S7E13'],
])
for (const [show, episode] of lastWatched) {
  console.log('form 12 (map):', show, episode)
}
