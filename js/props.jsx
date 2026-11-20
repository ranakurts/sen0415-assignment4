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