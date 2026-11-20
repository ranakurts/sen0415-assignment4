// Rana Neslihan Kurt, 2300006496
// Object destructuring (forms 5 to 10). Run with `node js/objects.mjs`.

// Form 5 (worked example): take properties out of an object by name.
const task = { id: 't1', title: 'Buy milk', status: 'todo' }
const { title, status } = task
console.log('form 5:', title, status) // form 5: Buy milk todo
const favoriteShow = { showTitle: 'The Mentalist', mainCharacter: 'Patrick Jane', seasons: 7 }
const { showTitle, mainCharacter } = favoriteShow
console.log('form 5 (my data):', showTitle, mainCharacter)
// Form 6: rename while you take it, { title: heading }
const show = { name: 'Suits', network: 'USA Network', seasons: 9 }
const { name: showName, seasons: seasonCount } = show
console.log('form 6:', showName, seasonCount)

// the old name is not a variable any more
try {
  console.log(name)
} catch (error) {
  console.log('form 6 (old name):', error.message)
}

// Form 7: default values, { priority = 'normal' }
const awake = { name: 'Awake', seasons: 1, rating: undefined }
const { network = 'unknown network', rating = 'no rating' } = awake
console.log('form 7:', network, rating)

const mentalist = { name: 'The Mentalist', network: null }
const { network: mentalistNetwork = 'unknown network' } = mentalist
console.log('form 7 (null):', mentalistNetwork)

// Form 8: rest, { id, ...others }
const suits = { id: 's1', name: 'Suits', network: 'USA Network', seasons: 9 }
const { id, ...showInfo } = suits
console.log('form 8:', id, showInfo)

// the same three dots on the RIGHT side are spread: they do the opposite job
const updatedInfo = { ...showInfo, seasons: 10 }
console.log('form 8 (spread):', updatedInfo)

// Form 9: nested patterns, { owner: { name } } and arrays inside objects
const myWatchlist = {
  owner: { firstName: 'Rana', favoriteGenre: 'drama' },
  shows: ['Suits', 'Awake', 'The Mentalist'],
}
const { owner: { firstName }, shows: [firstShow, ...laterShows] } = myWatchlist
console.log('form 9:', firstName, firstShow, laterShows)

// what if the nested object does not exist?
try {
  const { creator: { firstName: creatorName } } = myWatchlist
  console.log(creatorName)
} catch (error) {
  console.log('form 9 (missing nested):', error.message)
}

// Form 10: computed key, { [key]: value }
const myRatings = { Suits: 9, Awake: 8, 'The Mentalist': 8.5 }
const pickedShow = 'Awake'
const { [pickedShow]: pickedRating } = myRatings
console.log('form 10:', pickedShow, pickedRating)

// a key that is not in the object, with a default
const missingKey = 'Lost'
const { [missingKey]: missingRating = 'not rated' } = myRatings
console.log('form 10 (missing key):', missingRating)
