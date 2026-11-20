// Rana Neslihan Kurt, 2300006496
// Props and children in TypeScript. Run with `npx tsx ts/props.tsx`.
import type { ComponentProps, PropsWithChildren, ReactNode } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

type CardProps = { title: string; children?: ReactNode }

// Worked example: the type goes after the whole pattern, and children is in the type too.
function Card({ title, children }: CardProps) {
  return <section><h2>{title}</h2>{children}</section>
}
console.log(renderToStaticMarkup(<Card title="Hi">text</Card>))
// <section><h2>Hi</h2>text</section>

// P1: props is one object; the typed pattern takes it apart (form 5 + form 11)
type ShowCardProps = { name: string; children?: ReactNode }
function ShowCardWhole(props: ShowCardProps) {
  return <article><h3>{props.name}</h3><p>{props.children}</p></article>
}
function ShowCardParts({ name, children }: ShowCardProps) {
  return <article><h3>{name}</h3><p>{children}</p></article>
}
console.log('P1 whole:', renderToStaticMarkup(<ShowCardWhole name="Suits">A lawyer drama</ShowCardWhole>))
console.log('P1 parts:', renderToStaticMarkup(<ShowCardParts name="Suits">A lawyer drama</ShowCardParts>))

// P2: children is only a prop, also for the type checker
console.log('P2 between tags:', renderToStaticMarkup(<ShowCardParts name="Awake">Two worlds</ShowCardParts>))
console.log('P2 as attribute:', renderToStaticMarkup(<ShowCardParts name="Awake" children="Two worlds" />))

// P3: ReactNode accepts string, number, elements, arrays, null, undefined, booleans
function Box({ children }: { children?: ReactNode }) {
  return <div>{children}</div>
}
console.log('P3 number:', renderToStaticMarkup(<Box>{7}</Box>))
console.log('P3 false:', renderToStaticMarkup(<Box>{false}</Box>))
// a function as children needs its own type, and the component must call it
function NameTag({ children }: { children: (name: string) => ReactNode }) {
  return <div>{children('Patrick Jane')}</div>
}
console.log('P3 function called:', renderToStaticMarkup(<NameTag>{(name) => <b>{name}</b>}</NameTag>))

// P4: separate children from the rest; the rest is typed with ComponentProps<'section'>
type PanelProps = { title: string } & ComponentProps<'section'>
function Panel({ title, children, ...rest }: PanelProps) {
  return <section {...rest}><h2>{title}</h2>{children}</section>
}
console.log('P4:', renderToStaticMarkup(<Panel title="My watchlist" id="list" className="dark">3 shows</Panel>))

// P5: named slots as typed props, or one children slot
type PageSlots = { header: ReactNode; body: ReactNode; footer?: ReactNode }
function ShowPageProps({ header, body, footer }: PageSlots) {
  return <main><header>{header}</header><div>{body}</div><footer>{footer}</footer></main>
}
function ShowPageChildren({ children }: PropsWithChildren) {
  return <main>{children}</main>
}
console.log('P5 props:', renderToStaticMarkup(<ShowPageProps header={<h1>Awake</h1>} body="Two worlds" />))
console.log('P5 children:', renderToStaticMarkup(<ShowPageChildren><h1>Awake</h1><p>Two worlds</p></ShowPageChildren>))

// P6: a default for an optional prop; the type of stars inside is string | number (no undefined)
function Rating({ show, stars = 'not rated yet' }: { show: string; stars?: string | number }) {
  return <p>{show}: {stars}</p>
}
console.log('P6 missing:', renderToStaticMarkup(<Rating show="Awake" />))
console.log('P6 given:', renderToStaticMarkup(<Rating show="Suits" stars={9} />))

// P7: three ways to type children and props
// 1) children?: ReactNode written by hand
type InfoProps = { label: string; children?: ReactNode }
function Info({ label, children }: InfoProps) {
  return <p><b>{label}</b> {children}</p>
}
console.log('P7 ReactNode:', renderToStaticMarkup(<Info label="Network:">USA Network</Info>))

// 2) PropsWithChildren adds children?: ReactNode to my own type
type BadgeProps = PropsWithChildren<{ color: string }>
function Badge({ color, children }: BadgeProps) {
  return <span className={color}>{children}</span>
}
console.log('P7 PropsWithChildren:', renderToStaticMarkup(<Badge color="gold">Favorite</Badge>))

// 3) ComponentProps<'button'> gives every prop a real <button> accepts
type WatchButtonProps = ComponentProps<'button'> & { show: string }
function WatchButton({ show, children, ...buttonProps }: WatchButtonProps) {
  return <button {...buttonProps}>{children} {show}</button>
}
console.log('P7 ComponentProps:', renderToStaticMarkup(
  <WatchButton show="Suits" type="button" disabled>Watch</WatchButton>
))

// a component whose props type has NO children
function NoChildren({ title }: { title: string }) {
  return <p>{title}</p>
}
console.log('P7 no children:', renderToStaticMarkup(<NoChildren title="Awake" />))

// P7: what the compiler rejects. Each line was tried on my machine, the real error is under it.
// console.log(<Info>no label</Info>)
//   error TS2741: Property 'label' is missing in type '{ children: string; }' but required in type 'InfoProps'.
// console.log(<Box>{{ name: 'Suits' }}</Box>)
//   error TS2353: Object literal may only specify known properties, and 'name' does not exist in type
//   'ReactElement<...> | Iterable<ReactNode> | ReactPortal | Promise<...>'.  (a plain object is not a ReactNode)
// console.log(<WatchButton show="Suits" type="watch">Watch</WatchButton>)
//   error TS2322: Type '"watch"' is not assignable to type '"button" | "submit" | "reset" | undefined'.
// console.log(<NoChildren title="Awake">text</NoChildren>)
//   error TS2322: Type '{ children: string; title: string; }' is not assignable to type 'IntrinsicAttributes & { title: string; }'.
//   Property 'children' does not exist on type 'IntrinsicAttributes & { title: string; }'.
