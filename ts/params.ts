// Rana Neslihan Kurt, 2300006496
// Forms 11 and 12 in TypeScript, and the typing rules for patterns in parameters.

type TaskInput = { title: string; status?: 'todo' | 'done' }

// Form 11 (worked example): the type goes after the whole pattern.
function createTask({ title, status = 'todo' }: TaskInput) {
  return { title, status }
}
console.log('form 11:', createTask({ title: 'Read' })) // form 11: { title: 'Read', status: 'todo' }

// Form 11 with my own data: the type goes after the WHOLE pattern, and "= {}" makes the argument optional
type ShowOptions = { title?: string; seasons?: number; finished?: boolean }
function describeShow({ title = 'untitled', seasons = 1, finished = true }: ShowOptions = {}): string {
  return `${title}: ${seasons} season(s), finished: ${finished}`
}
console.log('form 11 (my data):', describeShow({ title: 'Awake' }))
console.log('form 11 (no argument):', describeShow())

// Form 11b: an array pattern in the parameter, typed as a tuple
const formatEpisode = ([season, episode]: [number, number]): string => `S${season}E${episode}`
console.log('form 11b:', formatEpisode([2, 5]))

// Form 12: patterns in loops; Object.entries gives [string, number][] here
const myRatings: Record<string, number> = { Suits: 9, Awake: 8, 'The Mentalist': 8.5 }
for (const [show, rating] of Object.entries(myRatings)) {
  console.log('form 12 (object):', show, rating)
}

// a Map is typed with the key type and the value type
const lastWatched = new Map<string, string>([
  ['Suits', 'S9E10'],
  ['Awake', 'S1E13'],
  ['The Mentalist', 'S7E13'],
])
for (const [show, episode] of lastWatched) {
  console.log('form 12 (map):', show, episode)
}
