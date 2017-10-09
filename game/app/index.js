"use strict";
/// <reference path="typings/index.d.ts" />
const $canvas = document.getElementById('game');
const canvas = $canvas.getContext('2d');
if (canvas === null)
    throw Error('Текущая среда окружения не поддерживает Canvas API');
const fps = 30; // Количество кадров в секунду
class Component {
    constructor(xCoordinate, yCoordinate, width, height) {
        this.xCoordinate = xCoordinate;
        this.yCoordinate = yCoordinate;
        this.width = width;
        this.height = height;
    }
    get x() { return this.xCoordinate; }
    set x(value) { this.xCoordinate = value; }
    get y() { return $canvas.height - this.height - this.yCoordinate; }
    set y(value) { this.yCoordinate = value; }
    draw() { }
    events() { }
}
// Главный герой
class Hero extends Component {
    constructor() { super(0, 0, 20, 20); }
    draw() {
        canvas.beginPath();
        canvas.rect(this.x, this.y, this.width, this.height);
        canvas.fillStyle = '#0bf';
        canvas.fill();
        canvas.closePath();
    }
    events() {
        document.addEventListener('keydown', (event) => {
            switch (event.code) {
                case 'KeyA':
                    this.moveLeft();
                    break;
                case 'KeyD':
                    this.moveRight();
                    break;
            }
        });
    }
    moveLeft() { this.x = this.x - 50; }
    moveRight() { this.x += 50; }
}
const chunks = [];
const draw = bootstrap(new Hero);
setInterval(draw, 1000 / fps);
// Функция отрисовки канваса
function bootstrap(...Components) {
    Components.forEach((Component) => {
        Component.events();
        chunks.push(Component.draw.bind(Component));
    });
    return function () {
        canvas.clearRect(0, 0, $canvas.width, $canvas.height);
        chunks.forEach((chunk) => chunk());
    };
}
