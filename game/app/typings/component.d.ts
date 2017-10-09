declare type DrawFunction = () => void

declare interface IComponent {

  x: number
  
  y: number
  
  width: number

  height: number

  draw: DrawFunction

  events: VoidFunction

}