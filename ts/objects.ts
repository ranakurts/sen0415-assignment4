// Rana Neslihan Kurt, 2300006496
// The same six object forms as js/objects.mjs, now typed.

type Task = { id: string; title: string; status: 'todo' | 'in-progress' | 'done' }

// Form 5 (worked example)
const task: Task = { id: 't1', title: 'Buy milk', status: 'todo' }
const { title, status } = task
console.log('form 5:', title, status) // form 5: Buy milk todo

// Form 5 with my own data
type ShowInfo = { id: string; name: string; network: string; seasons: number }
const suits: ShowInfo = { id: 's1', name: 'Suits', network: 'USA Network', seasons: 9 }
const { name, seasons } = suits
console.log('form 5 (my data):', name, seasons)

// Form 6: rename while you take it (the type stays the same: showName is a string)
const { name: showName, seasons: seasonCount } = suits
console.log('form 6:', showName, seasonCount)

// Form 7: defaults; the field is optional (?) in the type, the default removes undefined
type ShowExtra = { name: string; network?: string; rating?: number }
const awake: ShowExtra = { name: 'Awake' }
const { network = 'unknown network', rating = 0 } = awake
// network: string, rating: number (no undefined left)
console.log('form 7:', network, rating)

// Form 8: rest in an object; the type of the rest is the type without the taken key
const { id, ...showDetails } = suits
// showDetails: { name: string; network: string; seasons: number }
console.log('form 8:', id, showDetails)

// Form 9: nested patterns and an array inside an object
type Watchlist = { owner: { firstName: string }; shows: string[] }
const myWatchlist: Watchlist = {
  owner: { firstName: 'Rana' },
  shows: ['Suits', 'Awake', 'The Mentalist'],
}
const { owner: { firstName }, shows: [firstShow = 'nothing yet', ...laterShows] } = myWatchlist
console.log('form 9:', firstName, firstShow, laterShows)

// Form 10: computed key; with Record<string, number> any key is allowed,
// so the value could be missing and the default is needed to get a plain number
const myRatings: Record<string, number> = { Suits: 9, Awake: 8, 'The Mentalist': 8.5 }
const pickedShow = 'Awake'
const { [pickedShow]: pickedRating = 0 } = myRatings
console.log('form 10:', pickedShow, pickedRating)