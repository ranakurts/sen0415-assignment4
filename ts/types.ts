// Rana Neslihan Kurt, 2300006496
// What only TypeScript adds (topics T1 to T5). See the handout.

// T1 (worked example): `{ a: string }` inside a pattern is a RENAME, not a type.
const point = { x: 1, y: 2 }
const { x: horizontal } = point // x is renamed to horizontal; there is no variable x
console.log('T1:', horizontal) // T1: 1

// T1 wrong on purpose (kept as a comment, it does not compile):
// function showLabel({ name: string, seasons: number }) { ... }
// error TS7031: Binding element 'string' implicitly has an 'any' type.
// error TS7031: Binding element 'number' implicitly has an 'any' type.
// error TS2304: Cannot find name 'seasons'.

// T1 correct: the pattern first, then a colon, then the type of the whole object
function showLabel({ name, seasons }: { name: string; seasons: number }): string {
  return `${name} (${seasons})`
}
console.log('T1 fixed:', showLabel({ name: 'Suits', seasons: 9 }))

// T2: a tuple return type keeps one type per position
function bestShow(): [string, number] {
  return ['Suits', 9]
}
const [bestName, bestRating] = bestShow()
// bestName: string, bestRating: number
console.log('T2 tuple:', bestName.toUpperCase(), bestRating + 1)

// without a tuple type, an array literal becomes (string | number)[]
const looseShow = ['Awake', 1]
const [looseName, looseSeasons] = looseShow
// looseName and looseSeasons: string | number | undefined
console.log('T2 without as const:', looseName, looseSeasons)

// as const makes it a readonly tuple with the exact values as types
const fixedShow = ['Awake', 1] as const
const [fixedName, fixedSeasons] = fixedShow
// fixedName: "Awake", fixedSeasons: 1
console.log('T2 with as const:', fixedName, fixedSeasons)

// TEST LINE (removed): const seasonsAsNumber: number = looseSeasons
// error TS2322: Type 'string | number | undefined' is not assignable to type 'number'.
// with as const it works:
const seasonsAsNumber: number = fixedSeasons
console.log('T2 seasons as number:', seasonsAsNumber)

// T3: with noUncheckedIndexedAccess the first item of a string[] may be missing
const watchedToday: string[] = ['Suits', 'Awake']
const [firstToday] = watchedToday
// firstToday: string | undefined
// firstToday.toUpperCase()  -> error TS18048: 'firstToday' is possibly 'undefined'.

// way 1: check it
if (firstToday !== undefined) {
  console.log('T3 checked:', firstToday.toUpperCase())
}
// way 2: a default in the pattern
const [firstOrNone = 'nothing'] = watchedToday
console.log('T3 default:', firstOrNone.toUpperCase())
// way 3: a tuple type, so TypeScript knows the item exists
const twoShows: [string, string] = ['Suits', 'Awake']
const [firstOfTwo] = twoShows
console.log('T3 tuple:', firstOfTwo.toUpperCase())

// T4: optional fields and defaults change the type of the variable
type ShowSettings = { title: string; rating?: number; subtitles?: string }
function settingsInfo({ title, rating, subtitles = 'English' }: ShowSettings): string {
  // title: string              (required field)
  // rating: number | undefined (optional field, no default)
  // subtitles: string          (optional field, but the default removes undefined)
  const ratingText = rating === undefined ? 'no rating' : rating.toFixed(1)
  return `${title} | ${ratingText} | ${subtitles}`
}
console.log('T4 all given:', settingsInfo({ title: 'Suits', rating: 9, subtitles: 'Turkish' }))
console.log('T4 only title:', settingsInfo({ title: 'Awake' }))

// T5: one compile error caused by destructuring, and the fix
const mentalistShow = { title: 'The Mentalist', seasons: 7 }
// @ts-expect-error  TS2339: Property 'rating' does not exist on type '{ title: string; seasons: number; }'.
const { rating: mentalistRating } = mentalistShow
console.log('T5 at runtime:', mentalistRating)

// fix: say in the type that the field may exist, and give a default
type RatedShow = { title: string; seasons: number; rating?: number }
const ratedMentalist: RatedShow = { title: 'The Mentalist', seasons: 7 }
const { rating: fixedRating = 0 } = ratedMentalist
console.log('T5 fixed:', fixedRating)