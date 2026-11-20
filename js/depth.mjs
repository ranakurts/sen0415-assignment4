// Rana Neslihan Kurt, 2300006496
// Bonus 2: depth experiments. Run with `node js/depth.mjs`.

// D1: an array pattern works on ANY iterable, because it calls [Symbol.iterator]()
const [firstLetter, secondLetter, ...restLetters] = 'Suits'
console.log('D1 string:', firstLetter, secondLetter, restLetters)

const genreSet = new Set(['drama', 'crime', 'drama', 'sci-fi'])
const [firstGenre, ...otherGenres] = genreSet
console.log('D1 set (duplicates already gone):', firstGenre, otherGenres)

const castMap = new Map([['Suits', 'Harvey'], ['The Mentalist', 'Patrick Jane']])
const [[firstShowInMap, firstLead]] = castMap
console.log('D1 map (first entry is itself an array):', firstShowInMap, firstLead)

// a spy iterable: shows that the pattern pulls only as many items as it needs
const spyShows = {
  *[Symbol.iterator]() {
    for (const show of ['Suits', 'Awake', 'The Mentalist']) {
      console.log('D1 spy: next() gave', show)
      yield show
    }
  },
}
const [onlyFirst] = spyShows
console.log('D1 spy result:', onlyFirst)

// an infinite generator is fine, as long as there is no rest element
function* episodeNumbers() {
  let n = 1
  while (true) yield n++
}
const [ep1, ep2, ep3] = episodeNumbers()
console.log('D1 infinite generator:', ep1, ep2, ep3)

// an object is NOT iterable, so an array pattern on it fails
try {
  const [x] = { name: 'Suits' }
  console.log(x)
} catch (error) {
  console.log('D1 object with array pattern:', error.constructor.name, '-', error.message)
}

// but an object pattern works on an array, because arrays are objects with keys 0, 1, 2 and length
const { 0: arrayFirst, length: showCount } = ['Suits', 'Awake', 'The Mentalist']
console.log('D1 object pattern on an array:', arrayFirst, showCount)

// D2: order of evaluation and defaults
function loudDefault(label) {
  console.log('D2 default computed for', label)
  return `default ${label}`
}
const [given = loudDefault('given'), missing = loudDefault('missing')] = ['Suits']
console.log('D2 values:', given, '|', missing)

// a default can use an EARLIER variable of the same pattern
const { title = 'Awake', subtitle = `${title} (2012)` } = {}
console.log('D2 earlier variable in a default:', subtitle)

// but not a LATER one
try {
  eval("const { first = second, second = 'x' } = {}")
} catch (error) {
  console.log('D2 later variable in a default:', error.constructor.name, '-', error.message)
}

// D3: destructuring in other places
// catch parameter
try {
  JSON.parse('{ bad json')
} catch ({ name, message }) {
  console.log('D3 catch pattern:', name, '-', message)
}

// for...in gives only keys (strings), for...of + entries gives pairs
const seasonsByShow = { Suits: 9, Awake: 1 }
for (const key in seasonsByShow) console.log('D3 for...in key:', key)
for (const [key, value] of Object.entries(seasonsByShow)) console.log('D3 for...of pair:', key, value)

// assignment targets do not have to be variables: object properties work too
const ratings = {}
;[ratings.suits, ratings.awake] = [9, 8]
console.log('D3 targets are properties:', ratings)
const swapped = {}
;({ first: swapped.second, second: swapped.first } = { first: 'Suits', second: 'Awake' })
console.log('D3 object pattern into properties:', swapped)

// D5: when destructuring makes code worse
const apiResponse = { data: { show: { details: { cast: [{ actor: { name: 'Simon Baker' } }] } } } }
const { data: { show: { details: { cast: [{ actor: { name: leadActor } }] } } } } = apiResponse
console.log('D5 deep pattern:', leadActor)
// the same, refactored: one step per line, and optional chaining does not throw on missing data
const leadActorRefactored = apiResponse.data?.show?.details?.cast[0]?.actor?.name ?? 'unknown'
console.log('D5 refactored:', leadActorRefactored)
try {
  const { data: { show: { details: { cast: [{ actor: { name: brokenName } }] } } } } = { data: {} }
  console.log(brokenName)
} catch (error) {
  console.log('D5 deep pattern on missing data:', error.message)
}
