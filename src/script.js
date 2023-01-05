window.onload = function (){
    let stage = document.getElementById('stage')
    let ctx = stage.getContext("2d")
    document.addEventListener("keydown", keyPush);
    const modal = document.querySelectorAll("[data-modal-control]")
    for(let i = 0; i < modal.length; i++){
        modal[i].addEventListener("click", function (){
            let valueDataModal = modal[i].getAttribute("data-modal-control")
            document.getElementById(valueDataModal).classList.toggle("show-modal")
        })
    }

    setInterval(game, 100)

    const velocidade = 1

    let velocidadeX = 0
    let velocidadeY = 0
    let posicaoCobraX = 10
    let posicaoCobraY = 15
    let tamanhoDaPeca = 20
    let quantidadeDePeca = 20
    let posicaoInicialMacaX = 15
    let posicaoInicialMacaY = 15
    let direcaoAtual
    let jogando = false

    let trail = []
   let tail = 5


    function game(){
        posicaoCobraX += velocidadeX
        posicaoCobraY += velocidadeY
        if(posicaoCobraX < 0){
            posicaoCobraX = quantidadeDePeca-1
        }
        if(posicaoCobraX > quantidadeDePeca-1){
            posicaoCobraX = 0
        }
        if(posicaoCobraY < 0){
            posicaoCobraY = quantidadeDePeca-1
        }
        if(posicaoCobraY > quantidadeDePeca-1){
            posicaoCobraY = 0
        }

        ctx.fillStyle = "black"
        ctx.fillRect(0,0, stage.width, stage.height)

        ctx.fillStyle = "red"
        ctx.fillRect(posicaoInicialMacaX * tamanhoDaPeca, posicaoInicialMacaY * tamanhoDaPeca, tamanhoDaPeca, tamanhoDaPeca )

        ctx.fillStyle = "gray"
        for (let i = 0; i < trail.length; i++){
            ctx.fillRect(trail[i].x * tamanhoDaPeca, trail[i].y * tamanhoDaPeca, tamanhoDaPeca-1, tamanhoDaPeca-1)
            if(trail[i].x == posicaoCobraX && trail[i].y == posicaoCobraY && jogando){
                velocidadeX = 0
                velocidadeY = 0
                tail = 5;
                if (jogando) {
                    document.querySelector(".modal-wrapper").classList.toggle("show-modal")
                }
                jogando = false
            }
        }

        trail.push({x:posicaoCobraX, y:posicaoCobraY})
        while (trail.length > tail){
            trail.shift()
        }

        if(posicaoInicialMacaX==posicaoCobraX && posicaoInicialMacaY==posicaoCobraY ){
            tail++
            console.log(tail)
            const {x,y} = findNewPosition(trail)
            posicaoInicialMacaX = x
            posicaoInicialMacaY = y
        }

    }

    function findNewPosition(currentTrail) {
        let newPosition

        while(!newPosition) {
            const posicaoX = Math.floor(Math.random()*quantidadeDePeca);
            const posicaoY = Math.floor(Math.random()*quantidadeDePeca);
            const estaOcupado = currentTrail.find((parteDoCorpo) => {
                return parteDoCorpo.x === posicaoX && parteDoCorpo.y === posicaoY
            })

            if (!estaOcupado) {
                newPosition = {
                    x: posicaoX,
                    y: posicaoY
                }
            }
        }

        return newPosition
    }

    function keyPush(event) {
        jogando = true
        switch (event.keyCode) {
            case 37: // Left
                if (direcaoAtual === 'right') break;
                direcaoAtual = "left"
                velocidadeX = -velocidade;
                velocidadeY = 0;
                break;
            case 38: // up
                if (direcaoAtual === 'down') break;
                direcaoAtual = "up"
                velocidadeX = 0;
                velocidadeY = -velocidade;
                break;
            case 39: // right
                if (direcaoAtual === 'left') break;
                direcaoAtual = "right"
                velocidadeX = velocidade;
                velocidadeY = 0;
                break;
            case 40: // down
                if (direcaoAtual === 'up') break;
                direcaoAtual = "down"
                velocidadeX = 0;
                velocidadeY = velocidade;
                break;
            default:

                break;
        }


    }

}