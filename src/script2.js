window.onload = function () {

    var stage = document.getElementById('stage');
    var ctx = stage.getContext("2d");
    document.addEventListener("keydown", keyPush);
    setInterval(game, 80);

    const velocidade = 1;

    var velocidadeX = 0
    var velocidadeY = 0;
    var posicaoDaCabecaX = 10;
    var posicaoDaCabecaY = 15;
    var tamanhoDaPeca = 20;
    var quantidadeDePeca = 20;
    var posicaoInicialDaMacaX = 5
    var posicaoInicialDaMacaY = 5;

    var trail = [];
    tail = 5;

    function game() {
        posicaoDaCabecaX += velocidadeX;
        posicaoDaCabecaY += velocidadeY;
        if (posicaoDaCabecaX < 0) {
            posicaoDaCabecaX = quantidadeDePeca - 1;
        }
        if (posicaoDaCabecaX > quantidadeDePeca - 1) {
            posicaoDaCabecaX = 0;
        }
        if (posicaoDaCabecaY < 0) {
            posicaoDaCabecaY = quantidadeDePeca - 1;
        }
        if (posicaoDaCabecaY > quantidadeDePeca - 1) {
            posicaoDaCabecaY = 0;
        }

        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, stage.width, stage.height);

        ctx.fillStyle = "red";
        ctx.fillRect(posicaoInicialDaMacaX * tamanhoDaPeca, posicaoInicialDaMacaY * tamanhoDaPeca, tamanhoDaPeca, tamanhoDaPeca);

        ctx.fillStyle = "gray";
        for (var i = 0; i < trail.length; i++) {
            ctx.fillRect(trail[i].x * tamanhoDaPeca, trail[i].y * tamanhoDaPeca, tamanhoDaPeca - 1, tamanhoDaPeca - 1);
            if (trail[i].x == posicaoDaCabecaX && trail[i].y == posicaoDaCabecaY) {
                velocidadeX = velocidadeY = 0;
                tail = 5;
            }
        }

        trail.push({x: posicaoDaCabecaX, y: posicaoDaCabecaY})
        while (trail.length > tail) {
            trail.shift();
        }

        if (posicaoInicialDaMacaX == posicaoDaCabecaX && posicaoInicialDaMacaY == posicaoDaCabecaY) {
            tail++;
            posicaoInicialDaMacaX = Math.floor(Math.random() * quantidadeDePeca);
            posicaoInicialDaMacaY = Math.floor(Math.random() * quantidadeDePeca);
        }

    }

    function keyPush(event) {

        switch (event.keyCode) {
            case 37: // Left
                velocidadeX = -velocidade;
                velocidadeY = 0;
                break;
            case 38: // up
                velocidadeX = 0;
                velocidadeY = -velocidade;
                break;
            case 39: // right
                velocidadeX = velocidade;
                velocidadeY = 0;
                break;
            case 40: // down
                velocidadeX = 0;
                velocidadeY = velocidade;
                break;
            default:

                break;
        }


    }

}
