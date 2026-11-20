// Rana Neslihan Kurt, 2300006496
// Things that surprise people. Run with `node js/pitfalls.mjs`.

// Pitfall 1 (worked example): destructuring undefined or null throws a TypeError.
try {
  const { a } = undefined
  console.log(a)
} catch (error) {
  console.log('pitfall 1:', error.constructor.name) // pitfall 1: TypeError
}

// Pitfall 2: a default only applies to undefined, not to null
const suitsInfo = { network: null, seasons: undefined }
const { network = 'unknown', seasons = 1 } = suitsInfo
console.log('pitfall 2:', network, seasons)

// Pitfall 3: assigning without const/let needs parentheses, ({ a } = obj)
let currentShow
let currentSeason
try {
  // eval runs the text as code, so the SyntaxError can be caught and printed
  eval("{ currentShow } = { currentShow: 'Awake' }")
} catch (error) {
  console.log('pitfall 3 (no parentheses):', error.constructor.name, '-', error.message)
}
;({ currentShow, currentSeason = 1 } = { currentShow: 'Awake' })
console.log('pitfall 3 (with parentheses):', currentShow, currentSeason)
// Pitfall 4: it copies references, not deep copies (nested objects are shared)
const watchlist = { owner: 'Rana', shows: ['Suits', 'Awake'] }
const { shows } = watchlist
shows.push('The Mentalist')
console.log('pitfall 4:', watchlist.shows)

// even a spread copy is shallow: the inner array is still shared
const copy = { ...watchlist }
copy.shows.push('House')
copy.owner = 'Someone else'
console.log('pitfall 4 (spread copy):', watchlist)

// Pitfall 5: in objects the order does not matter, in arrays it does
// objects match by name, so the order in the pattern does not matter
const { seasons: suitsSeasons, title } = { title: 'Suits', seasons: 9 }
console.log('pitfall 5 (object):', title, suitsSeasons)

// arrays match by position, so swapping the order swaps the values
const [nameFirst, numberFirst] = ['Suits', 9]
const [numberNow, nameNow] = [9, 'Suits']
console.log('pitfall 5 (array):', nameFirst, numberFirst, '|', numberNow, nameNow)
