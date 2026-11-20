// Rana Neslihan Kurt, 2300006496
// Props and children in plain JavaScript (JSX). Run with `npx tsx js/props.jsx`.
import { renderToStaticMarkup } from 'react-dom/server'

// Worked example: props is ONE object; the parameter pattern takes it apart.
// These two components are the same thing written two ways.
function CardA(props) {
  return <section><h2>{props.title}</h2>{props.children}</section>
}
function CardB({ title, children }) {
  return <section><h2>{title}</h2>{children}</section>
}
console.log('A:', renderToStaticMarkup(<CardA title="Hi">text</CardA>))
console.log('B:', renderToStaticMarkup(<CardB title="Hi">text</CardB>))
// A: <section><h2>Hi</h2>text</section>
// B: <section><h2>Hi</h2>text</section>

// P1: props is one object. Both components below do the same thing.
function ShowCardWhole(props) {
  console.log('P1 props object:', props)
  return <article><h3>{props.name}</h3><p>{props.children}</p></article>
}
function ShowCardParts({ name, children }) {
  return <article><h3>{name}</h3><p>{children}</p></article>
}
console.log('P1 whole:', renderToStaticMarkup(<ShowCardWhole name="Suits">A lawyer drama</ShowCardWhole>))
console.log('P1 parts:', renderToStaticMarkup(<ShowCardParts name="Suits">A lawyer drama</ShowCardParts>))

// P2: children is only a prop. Between the tags or as an attribute gives the same result.
console.log('P2 between tags:', renderToStaticMarkup(<ShowCardParts name="Awake">Two worlds</ShowCardParts>))
console.log('P2 as attribute:', renderToStaticMarkup(<ShowCardParts name="Awake" children="Two worlds" />))
// what if I give both?
console.log('P2 both:', renderToStaticMarkup(<ShowCardParts name="Awake" children="from attribute">from tags</ShowCardParts>))

// P3: what children can be
function Box({ children }) {
  return <div>{children}</div>
}
console.log('P3 string:', renderToStaticMarkup(<Box>The Mentalist</Box>))
console.log('P3 number:', renderToStaticMarkup(<Box>{7}</Box>))
console.log('P3 zero:', renderToStaticMarkup(<Box>{0}</Box>))
console.log('P3 one element:', renderToStaticMarkup(<Box><b>Suits</b></Box>))
console.log('P3 several elements:', renderToStaticMarkup(<Box><b>Suits</b><i>Awake</i></Box>))
console.log('P3 array:', renderToStaticMarkup(<Box>{['Suits', 'Awake']}</Box>))
console.log('P3 undefined:', renderToStaticMarkup(<Box>{undefined}</Box>))
console.log('P3 null:', renderToStaticMarkup(<Box>{null}</Box>))
console.log('P3 false:', renderToStaticMarkup(<Box>{false}</Box>))
console.log('P3 true:', renderToStaticMarkup(<Box>{true}</Box>))
console.log('P3 missing:', renderToStaticMarkup(<Box />))
console.log('P3 function as child:', renderToStaticMarkup(<Box>{() => 'Patrick Jane'}</Box>))

// a function as children works only if the component CALLS it
function NameTag({ children }) {
  return <div>{children('Patrick Jane')}</div>
}
console.log('P3 function called:', renderToStaticMarkup(<NameTag>{(name) => <b>{name}</b>}</NameTag>))

// a plain object is not allowed
try {
  renderToStaticMarkup(<Box>{{ name: 'Suits' }}</Box>)
} catch (error) {
  console.log('P3 object:', error.message)
}
// P4: take title and children out, collect the rest, spread the rest onto a DOM element
function Panel({ title, children, ...rest }) {
  console.log('P4 rest:', rest)
  return <section {...rest}><h2>{title}</h2>{children}</section>
}
console.log('P4:', renderToStaticMarkup(
  <Panel title="My watchlist" id="list" className="dark" data-count="3">3 shows</Panel>
))

// the order decides who wins: whatever comes LATER overwrites
function PanelSpreadFirst({ children, ...rest }) {
  return <section {...rest} className="fixed">{children}</section>
}
function PanelSpreadLast({ children, ...rest }) {
  return <section className="fixed" {...rest}>{children}</section>
}
console.log('P4 spread first:', renderToStaticMarkup(<PanelSpreadFirst className="mine">Suits</PanelSpreadFirst>))
console.log('P4 spread last:', renderToStaticMarkup(<PanelSpreadLast className="mine">Suits</PanelSpreadLast>))

// key looks like a prop, but React keeps it for itself
function WithKey(props) {
  console.log('P4 key in props:', props.key)
  return <span>{props.name}</span>
}
console.log('P4 key:', renderToStaticMarkup(<WithKey key="s1" name="Suits" />))

// P5: the same page built twice
// version 1: named props for each slot
function ShowPageProps({ header, body, footer }) {
  return <main><header>{header}</header><div>{body}</div><footer>{footer}</footer></main>
}
// version 2: children only, the caller decides everything inside
function ShowPageChildren({ children }) {
  return <main>{children}</main>
}
console.log('P5 props:', renderToStaticMarkup(
  <ShowPageProps header={<h1>Suits</h1>} body="Harvey and Mike" footer={<small>9 seasons</small>} />
))
console.log('P5 children:', renderToStaticMarkup(
  <ShowPageChildren><h1>Suits</h1><p>Harvey and Mike</p><small>9 seasons</small></ShowPageChildren>
))

// P6: a default for a prop (form 7). undefined triggers it, null does not.
function Rating({ show, stars = 'not rated yet' }) {
  return <p>{show}: {stars}</p>
}
console.log('P6 given:', renderToStaticMarkup(<Rating show="Suits" stars={9} />))
console.log('P6 missing:', renderToStaticMarkup(<Rating show="Awake" />))
console.log('P6 undefined:', renderToStaticMarkup(<Rating show="Awake" stars={undefined} />))
console.log('P6 null:', renderToStaticMarkup(<Rating show="The Mentalist" stars={null} />))

// extra: what happens if a component tries to change its props?
function Changer(props) {
  try {
    props.show = 'changed'
  } catch (error) {
    console.log('changing props:', error.constructor.name, '-', error.message)
  }
  return <p>{props.show}</p>
}
console.log('changer:', renderToStaticMarkup(<Changer show="Suits" />))