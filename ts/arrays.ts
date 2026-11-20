// Rana Neslihan Kurt, 2300006496
// The same four array forms as js/arrays.mjs, now typed. Run with `npx tsx ts/arrays.ts`.

// Form 1 (worked example): the return type of the function is a tuple.
function minMax(numbers: number[]): [number, number] {
  return [Math.min(...numbers), Math.max(...numbers)]
}
const [lowest, highest] = minMax([4, 9, 2])
console.log('form 1:', lowest, highest) // form 1: 2 9

// Form 1 with my own data: a tuple of two strings
type Show = { name: string; seasons: number }
function shortestAndLongest(shows: Show[]): [string, string] {
  const sorted = [...shows].sort((a, b) => a.seasons - b.seasons)
  const first = sorted[0]
  const last = sorted[sorted.length - 1]
  if (first === undefined || last === undefined) {
    return ['none', 'none']
  }
  return [first.name, last.name]
}
const [shortestShow, longestShow] = shortestAndLongest([
  { name: 'Suits', seasons: 9 },
  { name: 'Awake', seasons: 1 },
  { name: 'The Mentalist', seasons: 7 },
])
console.log('form 1 (my data):', shortestShow, longestShow)

// Form 2: skip an item and collect the rest
const myShows: string[] = ['Suits', 'Awake', 'The Mentalist']
const [, secondShow, ...otherShows] = myShows
// secondShow: string | undefined (because of noUncheckedIndexedAccess), otherShows: string[]
console.log('form 2:', secondShow, otherShows)

// Form 3: swap two variables
let favorite: string = 'Suits'
let secondFavorite: string = 'Awake'
;[favorite, secondFavorite] = [secondFavorite, favorite]
console.log('form 3:', favorite, secondFavorite)

// Form 4: default values; the default removes undefined from the type
const emptyList: string[] = []
const [firstPick = 'Suits', secondPick = 'Awake'] = emptyList
// firstPick: string (not string | undefined)
console.log('form 4:', firstPick, secondPick)
