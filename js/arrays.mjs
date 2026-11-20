// Rana Neslihan Kurt, 2300006496
// Array destructuring (forms 1 to 4). Plain JavaScript: run with `node js/arrays.mjs`.

// Form 1 (worked example): take values out of an array by position.
function minMax(numbers) {
  return [Math.min(...numbers), Math.max(...numbers)]
}
const [lowest, highest] = minMax([4, 9, 2])
console.log('form 1:', lowest, highest) // form 1: 2 9
function shortestAndLongest(shows) {
  const sorted = [...shows].sort((a, b) => a.seasons - b.seasons)
  return [sorted[0].name, sorted[sorted.length - 1].name]
}
const [shortestShow, longestShow] = shortestAndLongest([
  { name: 'Suits', seasons: 9 },
  { name: 'Awake', seasons: 1 },
  { name: 'The Mentalist', seasons: 7 },
])
console.log('form 1 (my data):', shortestShow, longestShow)
// Form 2: skip an item and collect the rest, [, second, ...others]
const myShows = ['Suits', 'Awake', 'The Mentalist']
const [, secondShow, ...otherShows] = myShows
console.log('form 2:', secondShow, otherShows)

// what if the list is too short?
const [, , , fourthShow, ...noMoreShows] = myShows
console.log('form 2 (too short):', fourthShow, noMoreShows)

// Form 3: swap two variables without a temporary, [a, b] = [b, a]
let favorite = 'Suits'
let secondFavorite = 'Awake'
;[favorite, secondFavorite] = [secondFavorite, favorite] // the ; is needed: without it JS joins this line with the one above
console.log('form 3:', favorite, secondFavorite)

// Form 4: default values, const [a = 1] = []
const [firstPick = 'Suits', secondPick = 'Awake'] = []
console.log('form 4 (empty):', firstPick, secondPick)

const [pickA = 'Suits', pickB = 'Awake'] = ['The Mentalist', undefined]
console.log('form 4 (undefined):', pickA, pickB)

const [pickC = 'Suits', pickD = 'Awake'] = [null, 'The Mentalist']
console.log('form 4 (null):', pickC, pickD)