/// <reference path="typings/index.d.ts" />

const $canvas = <HTMLCanvasElement>document.getElementById('game')
const canvas = <CanvasRenderingContext2D>$canvas.getContext('2d')

if (canvas === null) throw Error('Текущая среда окружения не поддерживает Canvas API')
const fps = 30 // Количество кадров в секунду

class Component implements IComponent {
  constructor(
    private xCoordinate: number,
    private yCoordinate: number,
    public width: number,
    public height: number
  ) {}
  get x() { return this.xCoordinate }
  set x(value: number) { this.xCoordinate = value }
  get y() { return $canvas.height - this.height - this.yCoordinate }
  set y(value: number) { this.yCoordinate = value }
  draw() {}
  events() {}
}

// Главный герой
class Hero extends Component implements IComponent {
  constructor() { super(0, 0, 20, 20) }
  draw() {
    canvas.beginPath()
    canvas.rect(this.x, this.y, this.width, this.height)
    canvas.fillStyle = '#0bf'
    canvas.fill()
    canvas.closePath()
  }
  events() {
    document.addEventListener('keydown', (event) => {
      switch(event.code) {
        case 'KeyA': this.moveLeft(); break;
        case 'KeyD': this.moveRight(); break;
      }
    })
  }
  moveLeft() { this.x = this.x - 50 }
  moveRight() { this.x += 50 } 
}

const chunks: DrawFunction[] = []
const draw = bootstrap(new Hero)

setInterval(draw, 1000 / fps)

// Функция отрисовки канваса
function bootstrap(...Components: IComponent[]): DrawFunction {
  Components.forEach((Component) => {
    Component.events()
    chunks.push(Component.draw.bind(Component))
  })
  return function() {
    canvas.clearRect(0, 0, $canvas.width, $canvas.height)
    chunks.forEach((chunk) => chunk())
  }
}
