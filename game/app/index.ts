const $canvas = <HTMLCanvasElement>document.getElementById('game')

const api = $canvas.getContext('2d')

api.fillStyle = 'rgb(200,0,0)'
api.fillRect(10, 10, 55, 50)

api.fillStyle = 'rgba(0, 0, 200, 0.5)'
api.fillRect(30, 30, 55, 50)
