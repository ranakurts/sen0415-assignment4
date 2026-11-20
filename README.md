# Destructuring Field Guide

Name: Rana Neslihan Kurt  
Student number: 2300006496

Bonuses claimed: none.

My data: my own TV show list — **Suits**, **Awake** and **The Mentalist**.
Every output below is copied from `output.txt` (a real run of `npm run all` on my machine, Node 24.11.1, Windows).

## Run

```
npm install
npm run all      # runs the JS and TS examples
npm run check    # type-checks in strict mode
```

## Field guide

The idea behind all twelve forms: the left side is a **pattern** that describes the shape of the value,
and every name in the pattern becomes a variable. Arrays match **by position**, objects match **by name**.
A missing item never throws, it becomes `undefined`. Only destructuring `undefined` or `null` itself throws.

### Form 1: values by position, `const [x, y] = f()`

**Syntax:** `const [shortestShow, longestShow] = shortestAndLongest(shows)`

**Example** (`js/arrays.mjs`):

```js
function shortestAndLongest(shows) {
  const sorted = [...shows].sort((a, b) => a.seasons - b.seasons)
  return [sorted[0].name, sorted[sorted.length - 1].name]
}
const [shortestShow, longestShow] = shortestAndLongest([
  { name: 'Suits', seasons: 9 }, { name: 'Awake', seasons: 1 }, { name: 'The Mentalist', seasons: 7 },
])
console.log('form 1 (my data):', shortestShow, longestShow)
```

**Output:** `form 1 (my data): Awake Suits`

**Without destructuring:** `const result = shortestAndLongest(shows); const shortestShow = result[0]; const longestShow = result[1]`

**Use it when:** a function returns several values in a fixed order (like `useState` returns `[value, setter]`).

**Watch out:** the order is everything. If I swap the names on the left, I swap the meaning, and nothing warns me.

### Form 2: skip and collect, `const [, second, ...others] = list`

**Syntax:** `const [, secondShow, ...otherShows] = myShows`

**Example** (`js/arrays.mjs`):

```js
const myShows = ['Suits', 'Awake', 'The Mentalist']
const [, secondShow, ...otherShows] = myShows
console.log('form 2:', secondShow, otherShows)
const [, , , fourthShow, ...noMoreShows] = myShows
console.log('form 2 (too short):', fourthShow, noMoreShows)
```

**Output:**
```
form 2: Awake [ 'The Mentalist' ]
form 2 (too short): undefined []
```

**Without destructuring:** `const secondShow = myShows[1]; const otherShows = myShows.slice(2)`

**Use it when:** I need one item at a known place and the rest as a list.

**Watch out:** the empty comma skips an item. Rest is **always an array**: with one item left it is `[ 'The Mentalist' ]`, not a string, and with nothing left it is `[]`, not `undefined`. Rest must be the last item in the pattern.

### Form 3: swap, `[a, b] = [b, a]`

**Syntax:** `;[favorite, secondFavorite] = [secondFavorite, favorite]`

**Example** (`js/arrays.mjs`):

```js
let favorite = 'Suits'
let secondFavorite = 'Awake'
;[favorite, secondFavorite] = [secondFavorite, favorite]
console.log('form 3:', favorite, secondFavorite)
```

**Output:** `form 3: Awake Suits`

**Without destructuring:** `const temp = favorite; favorite = secondFavorite; secondFavorite = temp`

**Use it when:** two variables must change places, without a temporary variable.

**Watch out:** the variables must be `let`, and the line needs the `;` in front. Without it JavaScript joins the line with the line above (see My own log, entry 1).

### Form 4: array defaults, `const [a = 1, b = 2] = []`

**Syntax:** `const [firstPick = 'Suits', secondPick = 'Awake'] = list`

**Example** (`js/arrays.mjs`):

```js
const [firstPick = 'Suits', secondPick = 'Awake'] = []
const [pickA = 'Suits', pickB = 'Awake'] = ['The Mentalist', undefined]
const [pickC = 'Suits', pickD = 'Awake'] = [null, 'The Mentalist']
```

**Output:**
```
form 4 (empty): Suits Awake
form 4 (undefined): The Mentalist Awake
form 4 (null): null The Mentalist
```

**Without destructuring:** `const pickC = list[0] === undefined ? 'Suits' : list[0]`

**Use it when:** an item may be missing and there is a sensible fallback.

**Watch out:** the default is used **only for `undefined`**. `null` is a real value, so `pickC` stays `null`.

### Form 5: properties by name, `let { a, b } = t`

**Syntax:** `const { showTitle, mainCharacter } = favoriteShow`

**Example** (`js/objects.mjs`):

```js
const favoriteShow = { showTitle: 'The Mentalist', mainCharacter: 'Patrick Jane', seasons: 7 }
const { showTitle, mainCharacter } = favoriteShow
console.log('form 5 (my data):', showTitle, mainCharacter)
```

**Output:** `form 5 (my data): The Mentalist Patrick Jane`

**Without destructuring:** `const showTitle = favoriteShow.showTitle; const mainCharacter = favoriteShow.mainCharacter`

**Use it when:** I need a few fields of an object and want short names for them.

**Watch out:** the variable name must be exactly the property name. A typo gives `undefined`, not an error.

### Form 6: rename, `const { a: alpha } = t`

**Syntax:** `const { name: showName, seasons: seasonCount } = show`

**Example** (`js/objects.mjs`):

```js
const show = { name: 'Suits', network: 'USA Network', seasons: 9 }
const { name: showName, seasons: seasonCount } = show
console.log('form 6:', showName, seasonCount)
try { console.log(name) } catch (error) { console.log('form 6 (old name):', error.message) }
```

**Output:**
```
form 6: Suits 9
form 6 (old name): name is not defined
```

**Without destructuring:** `const showName = show.name; const seasonCount = show.seasons`

**Use it when:** the property name clashes with a variable I already have, or is not clear here.

**Watch out:** left of the colon is the **source**, right is the **new variable**. The old name `name` is not a variable afterwards.

### Form 7: object defaults, `const { a = 1 } = t`

**Syntax:** `const { network = 'unknown network', rating = 'no rating' } = awake`

**Example** (`js/objects.mjs`):

```js
const awake = { name: 'Awake', seasons: 1, rating: undefined }
const { network = 'unknown network', rating = 'no rating' } = awake
const mentalist = { name: 'The Mentalist', network: null }
const { network: mentalistNetwork = 'unknown network' } = mentalist
```

**Output:**
```
form 7: unknown network no rating
form 7 (null): null
```

**Without destructuring:** `const network = awake.network === undefined ? 'unknown network' : awake.network`

**Use it when:** a field is optional (settings, options objects, props).

**Watch out:** a missing field and a field set to `undefined` both get the default, `null` does not. Rename and default can be combined: `{ network: mentalistNetwork = '...' }`.

### Form 8: rest in an object, `const { a, ...others } = t`

**Syntax:** `const { id, ...showInfo } = suits`

**Example** (`js/objects.mjs`):

```js
const suits = { id: 's1', name: 'Suits', network: 'USA Network', seasons: 9 }
const { id, ...showInfo } = suits
console.log('form 8:', id, showInfo)
const updatedInfo = { ...showInfo, seasons: 10 }
console.log('form 8 (spread):', updatedInfo)
```

**Output:**
```
form 8: s1 { name: 'Suits', network: 'USA Network', seasons: 9 }
form 8 (spread): { name: 'Suits', network: 'USA Network', seasons: 10 }
```

**Without destructuring:** `const id = suits.id; const showInfo = Object.assign({}, suits); delete showInfo.id`

**Use it when:** I want to remove one field and keep the rest (very common with React props, see P4).

**Watch out:** the same three dots do opposite jobs. On the **left** of `=` it is **rest** (collect into a new object). On the **right** it is **spread** (expand an object into a new one). With spread, a field written later overwrites an earlier one (`seasons` 9 → 10).

### Form 9: nested patterns, `const { p: { x }, list: [first] } = t`

**Syntax:** `const { owner: { firstName }, shows: [firstShow, ...laterShows] } = myWatchlist`

**Example** (`js/objects.mjs`):

```js
const myWatchlist = {
  owner: { firstName: 'Rana', favoriteGenre: 'drama' },
  shows: ['Suits', 'Awake', 'The Mentalist'],
}
const { owner: { firstName }, shows: [firstShow, ...laterShows] } = myWatchlist
try {
  const { creator: { firstName: creatorName } } = myWatchlist
} catch (error) { console.log('form 9 (missing nested):', error.message) }
```

**Output:**
```
form 9: Rana Suits [ 'Awake', 'The Mentalist' ]
form 9 (missing nested): Cannot read properties of undefined (reading 'firstName')
```

**Without destructuring:** `const firstName = myWatchlist.owner.firstName; const firstShow = myWatchlist.shows[0]; const laterShows = myWatchlist.shows.slice(1)`

**Use it when:** I need values from deep inside a structure, for example an API response.

**Watch out:** `owner` and `shows` are only the path, **not variables**. If the outer object is missing, it throws; a default like `{ creator: { firstName } = {} }` prevents it.

### Form 10: computed key, `const { [key]: value } = t`

**Syntax:** `const { [pickedShow]: pickedRating } = myRatings`

**Example** (`js/objects.mjs`):

```js
const myRatings = { Suits: 9, Awake: 8, 'The Mentalist': 8.5 }
const pickedShow = 'Awake'
const { [pickedShow]: pickedRating } = myRatings
const missingKey = 'Lost'
const { [missingKey]: missingRating = 'not rated' } = myRatings
```

**Output:**
```
form 10: Awake 8
form 10 (missing key): not rated
```

**Without destructuring:** `const pickedRating = myRatings[pickedShow]`

**Use it when:** the name of the field is only known at run time (stored in a variable).

**Watch out:** a new name after the colon is required, because JavaScript cannot make a variable name out of a value. The square brackets mean "use the value of `pickedShow`", not the word `pickedShow`.

### Form 11: patterns in parameters, `function f({ a = 1, b }: Options = {})`

**Syntax:** `function describeShow({ title, seasons = 1, finished = true } = {})`

**Example** (`js/params.mjs`):

```js
function describeShow({ title, seasons = 1, finished = true } = {}) {
  return `${title}: ${seasons} season(s), finished: ${finished}`
}
console.log('form 11 (my data):', describeShow({ title: 'Awake' }))
console.log('form 11 (no argument):', describeShow())
function describeShowNoDefault({ title }) { return title }
try { describeShowNoDefault() } catch (error) { console.log('form 11 (without = {}):', error.message) }
const formatEpisode = ([season, episode]) => `S${season}E${episode}`
console.log('form 11b:', formatEpisode([2, 5]))
```

**Output:**
```
form 11 (my data): Awake: 1 season(s), finished: true
form 11 (no argument): undefined: 1 season(s), finished: true
form 11 (without = {}): Cannot destructure property 'title' of 'undefined' as it is undefined.
form 11b: S2E5
```

**Without destructuring:** `function describeShow(options) { options = options || {}; const title = options.title; ... }`

**Use it when:** a function takes an options object. The call is readable (`describeShow({ title: 'Awake' })`) and the order of options does not matter. Every React component does this with props.

**Watch out:** there are two defaults. The `= 1` inside is for a missing **field**. The `= {}` at the end is for a missing **argument**. Without `= {}` the call with no argument throws.

### Form 12: patterns in loops, `for (const [k, v] of Object.entries(o))`

**Syntax:** `for (const [show, rating] of Object.entries(myRatings))`

**Example** (`js/params.mjs`):

```js
const myRatings = { Suits: 9, Awake: 8, 'The Mentalist': 8.5 }
for (const [show, rating] of Object.entries(myRatings)) console.log('form 12 (object):', show, rating)
const lastWatched = new Map([['Suits', 'S9E10'], ['Awake', 'S1E13'], ['The Mentalist', 'S7E13']])
for (const [show, episode] of lastWatched) console.log('form 12 (map):', show, episode)
```

**Output:**
```
form 12 (object): Suits 9
form 12 (object): Awake 8
form 12 (object): The Mentalist 8.5
form 12 (map): Suits S9E10
form 12 (map): Awake S1E13
form 12 (map): The Mentalist S7E13
```

**Without destructuring:** `for (const entry of Object.entries(myRatings)) { const show = entry[0]; const rating = entry[1] }`

**Use it when:** I loop over key–value pairs of an object or a `Map`.

**Watch out:** `Object.entries` turns the object into `[key, value]` pairs first; a `Map` already gives pairs. Every round of the loop is a new Form 1 on one pair.
## Pitfalls

All five are in `js/pitfalls.mjs`.

**Pitfall 1: destructuring `undefined` or `null` throws.**
`const { a } = undefined` → `pitfall 1: TypeError`.
*Why:* to read a property, JavaScript first needs an object. `undefined` and `null` have no properties at all, so there is nothing to read from. A missing *field* is fine (`undefined`), a missing *object* is not. Fix: a default like `= {}` (Form 11).

**Pitfall 2: a default only works for `undefined`, not for `null`.**
```js
const suitsInfo = { network: null, seasons: undefined }
const { network = 'unknown', seasons = 1 } = suitsInfo
```
Output: `pitfall 2: null 1`
*Why:* the default is checked with `=== undefined`. `null` means "a value that is empty on purpose", so JavaScript keeps it.

**Pitfall 3: assigning without `const`/`let` needs parentheses.**
```js
let currentShow
eval("{ currentShow } = { currentShow: 'Awake' }")          // SyntaxError
;({ currentShow, currentSeason = 1 } = { currentShow: 'Awake' }) // works
```
Output:
```
pitfall 3 (no parentheses): SyntaxError - Unexpected token '='
pitfall 3 (with parentheses): Awake 1
```
*Why:* a line that starts with `{` is read as a **block of code**, not as an object pattern, so the `=` after it makes no sense. Parentheses force JavaScript to read it as an expression. (I used `eval` only so that the SyntaxError could be caught and printed; otherwise the whole file would not start.)

**Pitfall 4: destructuring copies references, not objects.**
```js
const watchlist = { owner: 'Rana', shows: ['Suits', 'Awake'] }
const { shows } = watchlist
shows.push('The Mentalist')
const copy = { ...watchlist }
copy.shows.push('House')
copy.owner = 'Someone else'
```
Output:
```
pitfall 4: [ 'Suits', 'Awake', 'The Mentalist' ]
pitfall 4 (spread copy): { owner: 'Rana', shows: [ 'Suits', 'Awake', 'The Mentalist', 'House' ] }
```
*Why:* `shows` is a second name for **the same array**, so changing it changes `watchlist.shows`. Even spread is a **shallow** copy: `owner` was copied (so it stayed `'Rana'`), but the inner array is still shared.

**Pitfall 5: in objects the order does not matter, in arrays it does.**
```js
const { seasons: suitsSeasons, title } = { title: 'Suits', seasons: 9 }
const [nameFirst, numberFirst] = ['Suits', 9]
const [numberNow, nameNow] = [9, 'Suits']
```
Output:
```
pitfall 5 (object): Suits 9
pitfall 5 (array): Suits 9 | 9 Suits
```
*Why:* object patterns match **by name**, array patterns match **by position**. Writing the array pattern in the wrong order gives wrong values without any error.

## TypeScript topics (T1 to T5)

All in `ts/types.ts`.

**T1: in a pattern, `{ name: string }` is a rename, not a type.** I wrote `function showLabel({ name: string, seasons: number })` and got:
```
error TS7031: Binding element 'string' implicitly has an 'any' type.
error TS7031: Binding element 'number' implicitly has an 'any' type.
error TS2304: Cannot find name 'seasons'.
```
TypeScript made variables called `string` and `number` (Form 6). The fix: the type goes **after the whole pattern**:
`function showLabel({ name, seasons }: { name: string; seasons: number }): string` → `T1 fixed: Suits (9)`.

**T2: tuples and `as const`.** `function bestShow(): [string, number]` gives `bestName: string` and `bestRating: number`, so `bestName.toUpperCase()` and `bestRating + 1` both compile (`T2 tuple: SUITS 10`). A plain `['Awake', 1]` is only `(string | number)[]`, so each destructured item is `string | number | undefined`, and `const seasonsAsNumber: number = looseSeasons` gives
`error TS2322: Type 'string | number | undefined' is not assignable to type 'number'.`
With `as const` the array becomes `readonly ['Awake', 1]`: `fixedName` has type `"Awake"` and `fixedSeasons` has type `1`, so the same assignment works.

**T3: `noUncheckedIndexedAccess`.** With this option `const [firstToday] = watchedToday` (a `string[]`) has type `string | undefined`, because the array could be empty. `firstToday.toUpperCase()` gives `error TS18048: 'firstToday' is possibly 'undefined'.` Three fixes, all in the file: check with `if (firstToday !== undefined)`, give a default `[firstOrNone = 'nothing']`, or use a tuple type `[string, string]` so TypeScript knows the item exists. Output: `T3 checked: SUITS`, `T3 default: SUITS`, `T3 tuple: SUITS`.

**T4: optional fields and defaults.** In `({ title, rating, subtitles = 'English' }: ShowSettings)` with `rating?: number; subtitles?: string`:
`title` is `string` (required), `rating` is `number | undefined` (optional, no default), `subtitles` is `string` (optional, but the default removes `undefined`). Output: `T4 all given: Suits | 9.0 | Turkish` and `T4 only title: Awake | no rating | English`.

**T5: a compile error caused by destructuring.** `const { rating: mentalistRating } = mentalistShow` where the object has no `rating`:
`error TS2339: Property 'rating' does not exist on type '{ title: string; seasons: number; }'.`
This is the only line with `// @ts-expect-error`. At run time the value is simply `undefined` (`T5 at runtime: undefined`), which shows that TypeScript catches the mistake that plain JavaScript lets through. Fix: add `rating?: number` to the type and a default → `T5 fixed: 0`.

## Props and children

Code: `js/props.jsx` (P1 to P6, run with tsx) and `ts/props.tsx` (P1 to P7 with types). Rendered with `renderToStaticMarkup`.

### P1: props is one object

```jsx
function ShowCardWhole(props) {
  console.log('P1 props object:', props)
  return <article><h3>{props.name}</h3><p>{props.children}</p></article>
}
function ShowCardParts({ name, children }) {
  return <article><h3>{name}</h3><p>{children}</p></article>
}
```
Output:
```
P1 props object: { name: 'Suits', children: 'A lawyer drama' }
P1 whole: <article><h3>Suits</h3><p>A lawyer drama</p></article>
P1 parts: <article><h3>Suits</h3><p>A lawyer drama</p></article>
```
A component gets **one** argument. The printed object shows that the attribute `name` and the content between the tags (`children`) are both fields of that one object. `({ name, children })` is **Form 5** (take fields by name) used in a **parameter** (**Form 11**); the result is the same as reading `props.name` and `props.children`.

### P2: children is only a prop

```jsx
<ShowCardParts name="Awake">Two worlds</ShowCardParts>
<ShowCardParts name="Awake" children="Two worlds" />
<ShowCardParts name="Awake" children="from attribute">from tags</ShowCardParts>
```
Output:
```
P2 between tags: <article><h3>Awake</h3><p>Two worlds</p></article>
P2 as attribute: <article><h3>Awake</h3><p>Two worlds</p></article>
P2 both: <article><h3>Awake</h3><p>from tags</p></article>
```
The first two are identical: content between tags is just a shorter way to write the `children` prop. When I gave both, the content between the tags **won**, because JSX sets the attributes first and then puts the content into `children`, overwriting it.

### P3: what children can be

Component: `function Box({ children }) { return <div>{children}</div> }`

| children | rendered | appears? |
|---|---|---|
| `The Mentalist` (string) | `<div>The Mentalist</div>` | yes |
| `{7}` | `<div>7</div>` | yes |
| `{0}` | `<div>0</div>` | **yes** (0 is a number, not "empty") |
| `<b>Suits</b>` | `<div><b>Suits</b></div>` | yes |
| `<b>Suits</b><i>Awake</i>` | `<div><b>Suits</b><i>Awake</i></div>` | yes |
| `{['Suits', 'Awake']}` | `<div>SuitsAwake</div>` | yes, glued together |
| `{undefined}`, `{null}`, `{false}`, `{true}`, no children | `<div></div>` | no |
| `{() => 'Patrick Jane'}` | `<div></div>` + warning *Functions are not valid as a React child* | no |
| function, and the component **calls** it: `children('Patrick Jane')` | `<div><b>Patrick Jane</b></div>` | yes |
| `{{ name: 'Suits' }}` (plain object) | error: *Objects are not valid as a React child (found: object with keys {name})* | crashes |

The surprise: `false` and `null` disappear but `0` is printed. That is why `{count && <List />}` can show a stray `0` on the screen. A function is fine as children only if the component treats it as a function and calls it.

### P4: separating children from the other props

```jsx
function Panel({ title, children, ...rest }) {
  console.log('P4 rest:', rest)
  return <section {...rest}><h2>{title}</h2>{children}</section>
}
<Panel title="My watchlist" id="list" className="dark" data-count="3">3 shows</Panel>
```
Output:
```
P4 rest: { id: 'list', className: 'dark', 'data-count': '3' }
P4: <section id="list" class="dark" data-count="3"><h2>My watchlist</h2>3 shows</section>
```
`title` and `children` are used by the component; **Form 8** collects everything else into `rest`, and the spread `{...rest}` passes it on to the real `<section>`.

**Order decides who wins:**
```jsx
<section {...rest} className="fixed">   // P4 spread first: <section class="fixed">Suits</section>
<section className="fixed" {...rest}>   // P4 spread last:  <section class="mine">Suits</section>
```
(called with `className="mine"`). Like object spread in Form 8, whatever is written **later** overwrites. Spread first = the component has the last word; spread last = the caller can override.

**`key` is not a prop.** With `<WithKey key="s1" name="Suits" />`, `props.key` is `undefined` and React warns: *`key` is not a prop. Trying to access it will result in `undefined` being returned.* React keeps `key` for itself (to track list items).

**Props cannot be changed.** `props.show = 'changed'` gave `TypeError - Cannot assign to read only property 'show' of object '#<Object>'`. React freezes the props object; a component must treat props as read-only.

### P5: props or children?

```jsx
function ShowPageProps({ header, body, footer }) {
  return <main><header>{header}</header><div>{body}</div><footer>{footer}</footer></main>
}
function ShowPageChildren({ children }) {
  return <main>{children}</main>
}
```
Output:
```
P5 props: <main><header><h1>Suits</h1></header><div>Harvey and Mike</div><footer><small>9 seasons</small></footer></main>
P5 children: <main><h1>Suits</h1><p>Harvey and Mike</p><small>9 seasons</small></main>
```
With **named props** the component decides the layout: the header always goes into `<header>`, the footer into `<footer>`, and the caller only fills the slots. With **children** the component is just a frame and the caller decides everything inside (here the `<header>`/`<footer>` tags are gone).
I would choose **named props** when there are several fixed places (a card with a title and actions, a page layout) and **children** when there is one free area whose content the component does not need to know (a panel, a modal, a button label).

### P6: defaults

```jsx
function Rating({ show, stars = 'not rated yet' }) { return <p>{show}: {stars}</p> }
```
Output:
```
P6 given: <p>Suits: 9</p>
P6 missing: <p>Awake: not rated yet</p>
P6 undefined: <p>Awake: not rated yet</p>
P6 null: <p>The Mentalist: </p>
```
This is **Form 7** in a parameter. A missing prop and `stars={undefined}` both get the default. `stars={null}` does **not**, and React renders `null` as nothing, so the screen shows `The Mentalist: ` with an empty space. Same rule as Form 4 and Pitfall 2.

### P7: types (`ts/props.tsx`)

```tsx
type InfoProps = { label: string; children?: ReactNode }               // 1) by hand
type BadgeProps = PropsWithChildren<{ color: string }>                 // 2) adds children?: ReactNode
type WatchButtonProps = ComponentProps<'button'> & { show: string }    // 3) all props of a real <button>
function WatchButton({ show, children, ...buttonProps }: WatchButtonProps) {
  return <button {...buttonProps}>{children} {show}</button>
}
```
Output:
```
P7 ReactNode: <p><b>Network:</b> USA Network</p>
P7 PropsWithChildren: <span class="gold">Favorite</span>
P7 ComponentProps: <button type="button" disabled="">Watch Suits</button>
```
- `children?: ReactNode` allows everything React can render (string, number, element, array, `null`, `undefined`, boolean).
- `PropsWithChildren<T>` is a shortcut that adds exactly that line to my type `T`.
- `ComponentProps<'button'>` gives every attribute a real `<button>` accepts (`type`, `disabled`, `onClick`, …), so `...buttonProps` is typed and can be spread onto the button.
- A function as children needs its own type: `children: (name: string) => ReactNode`.

What the compiler rejects (each line tried, real errors):
```
<Info>no label</Info>
  error TS2741: Property 'label' is missing in type '{ children: string; }' but required in type 'InfoProps'.
<Box>{{ name: 'Suits' }}</Box>
  error TS2353: Object literal may only specify known properties, and 'name' does not exist in type 'ReactElement<...> | Iterable<ReactNode> | ReactPortal | Promise<...>'.
<WatchButton show="Suits" type="watch">Watch</WatchButton>
  error TS2322: Type '"watch"' is not assignable to type '"button" | "submit" | "reset" | undefined'.
<NoChildren title="Awake">text</NoChildren>
  error TS2322: Type '{ children: string; title: string; }' is not assignable to type 'IntrinsicAttributes & { title: string; }'.
  Property 'children' does not exist on type 'IntrinsicAttributes & { title: string; }'.
```
The plain object as children crashed **at run time** in JavaScript (P3); TypeScript stops it **before** running. And a component whose type has no `children` cannot be given content at all.

## JavaScript vs TypeScript

| Form | Same in TypeScript | What I must add | Error when I get it wrong |
|---|---|---|---|
| 1 `const [x, y] = f()` | the pattern | a tuple return type `: [string, string]` | without it the items are `string \| undefined` (noUncheckedIndexedAccess) |
| 2 `[, second, ...others]` | skip and rest | nothing; `others` is `string[]` | using `second` directly: `TS18048: 'second' is possibly 'undefined'` |
| 3 `[a, b] = [b, a]` | the swap and the `;` | `let` with a type | none, the types must match |
| 4 `[a = 1] = []` | the default | nothing | none; the default removes `undefined` from the type |
| 5 `{ a, b } = t` | the pattern | a type for the object (`type ShowInfo = ...`) | a field that is not in the type: `TS2339: Property '...' does not exist on type` (T5) |
| 6 `{ a: alpha }` | the rename | nothing; trying to write a type here is the T1 mistake | `TS7031: Binding element 'string' implicitly has an 'any' type` |
| 7 `{ a = 1 } = t` | the default | `?` on the field (`network?: string`) | without `?`, the default is useless and the object must have the field |
| 8 `{ a, ...others }` | rest and spread | nothing; `others` gets the type without `a` | none |
| 9 nested | the pattern | a nested type (`owner: { firstName: string }`) | a wrong path: `TS2339: Property ... does not exist` |
| 10 `{ [key]: value }` | the computed key | a type like `Record<string, number>` | the value is `number \| undefined`, a default makes it `number` |
| 11 parameters | the pattern and `= {}` | the type **after the whole pattern**: `({ title }: ShowOptions = {})` | type inside the pattern = rename, `TS7031` (T1) |
| 12 loops | `for (const [k, v] of ...)` | `new Map<string, string>()` | none, types come from `Object.entries` / the Map |
| props | `({ title, children })` | `children?: ReactNode` or `PropsWithChildren` | `Property 'children' does not exist on type 'IntrinsicAttributes & ...'` |

## My own log

Real things that went wrong or surprised me while I did this, in the order they happened.

1. **My Form 2 guesses were all wrong.** Before running it I wrote: `secondShow` → Suits, `otherShows` → Awake, and "too short" for the 4th item. The output was `Awake [ 'The Mentalist' ]` and `undefined []`. I did not know that the leading comma skips the first item, and I expected rest to give one value. Now I know rest always makes an array, even `[]` when nothing is left, and a missing position is `undefined`, not an error.

2. **Form 3 without the semicolon.** I removed the `;` in front of `[favorite, secondFavorite] = [secondFavorite, favorite]` and got
   `ReferenceError: Cannot access 'secondFavorite' before initialization`.
   JavaScript joined the line with the line above, so it read `let secondFavorite = 'Awake'[favorite, secondFavorite] = ...`, which uses `secondFavorite` while creating it. A line that starts with `[` or `(` needs a `;` in front when I do not write semicolons.

3. **Form 4: I guessed it would print "empty, undefined, null".** It printed `Suits Awake`, `The Mentalist Awake` and `null The Mentalist`. The default replaced the missing item and `undefined`, but not `null`. The same thing came back in Form 7, Pitfall 2 and P6 (`The Mentalist: ` with an empty space on the screen), so it is the rule I will remember most.

4. **Form 11 without `= {}`.** Calling `describeShowNoDefault()` gave
   `Cannot destructure property 'title' of 'undefined' as it is undefined.`
   I understood that a default for a field (`seasons = 1`) does not help when the whole argument is missing; the parameter itself needs `= {}`.

5. **T1: I tried to write types inside the pattern.** `function showLabel({ name: string, seasons: number })` gave three errors: `TS7031: Binding element 'string' implicitly has an 'any' type` (twice) and `TS2304: Cannot find name 'seasons'`. The surprise was that `name` gave **no** error, even though it was renamed too. The reason: TypeScript knows the browser global `name` (`window.name`), so `${name}` silently used that global instead. So this mistake can be hidden, not only loud.

6. **P2 and P3 surprises.** When I gave both `children="from attribute"` and content between the tags, the content between the tags won. In P3, `false` and `null` showed nothing but `{0}` printed `0`. I also saw that a function as children prints nothing and React warns *Functions are not valid as a React child*, but it works when the component calls it.

7. **`key` and changing props.** Reading `props.key` gave `undefined` and React warned: *`key` is not a prop*. Writing `props.show = 'changed'` threw `TypeError - Cannot assign to read only property 'show'`. I did not know React freezes props.

8. **The React warnings are not in `output.txt`.** PowerShell's `>` writes UTF-16, so I used `npm run all | Out-File -Encoding utf8 output.txt`. After that, the two React warnings still appeared in the terminal but not in the file, because React writes warnings to stderr and the pipe only takes stdout.

9. **Tooling problem.** To try the four P7 errors I pressed `Ctrl + /` to uncomment lines, but on my Turkish keyboard this zoomed VS Code instead and my selected lines were replaced. I used *Edit → Toggle Line Comment* instead.