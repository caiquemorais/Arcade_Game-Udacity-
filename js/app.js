//Declara inimigos
var Enemy = function() {
    this.x = -100;
    this.y = (Math.floor(Math.random()*250)+40);
    this.velocidade = Math.floor(Math.random() * 100)*(Math.random())+100;    
    this.sprite = 'images/enemy-bug.png';
};
var Sc; //variavel da pontuação
var Bonus = 0; //Bonus que dobra a pontuação caso não morra
Enemy.prototype.update = function(dt) {
    if (this.x < player.x + 25 && this.x > player.x - 25 && this.y < player.y + 30 && this.y > player.y -30)
    {
            Sc -= 1;
            if(Sc<1){Sc=0;}
            if(Sc>20 ){
            Sc=0;}
            Bonus = 0;
            player.reset();    
    } // Colisão
    
    if (this.x <= 570) {
        this.x += this.velocidade * dt;
    } else {
        this.x = -10;
        this.y =  Math.floor((Math.random() * 200*(1+0.015*Sc))+35);//Com o almento da pontuação os insetos começam a andar sobre a grama
        this.velocidade = (Math.floor(Math.random()*240)+(20*Sc)+50);//Média da velocidade almenta com a pontuação
    }//Velocidade e Caminho dos insetos
};

// Desenhe o inimigo na tela, método exigido pelo jogo
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.font = "30px Arial";//Usado apenas para mostra a pontuação 
    if(Sc>=20){ //Mostra se o usuário ganhou
        ctx.fillText(`Parabéns você terminou o jogo` ,50,100);}
        else{ctx.fillText(`${Sc} Pontos` ,200,100);}
    if(Bonus>2) {ctx.fillText(`Multiple Points ${Bonus}+` ,200,150);
}};

var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
    Sc = 0;
};
//Reseta a posição do personagem
Player.prototype.reset = function() {
    this.y = 400;};


Player.prototype.update = function() {
    if (this.y < 25 ) {//Chegou na Agua
        this.reset();
        Sc += 1;
        Bonus +=1;
        if(Bonus>2){
            Sc +=Bonus;}
    };
    //Passo o persenagem    
    if (this.ctlKey =='left'&& this.x>10){this.x -= 75;}
    if (this.ctlKey =='up'){this.y -= 75;}
    if (this.ctlKey =='right' && this.x<420){this.x += 75;}    
    if (this.ctlKey =='down' && this.y<430){this.y += 75;}
    this.ctlKey = null;
    };
Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
};

//Recebe o valor do input
Player.prototype.handleInput = function(e) {
    this.ctlKey = e;
};

//Declara inimigos
var allEnemies = [];
(function setEnemies() {
    allEnemies.push(new Enemy(50, 60));
    allEnemies.push(new Enemy(-200, 100));
    allEnemies.push(new Enemy(-200, 150));
    allEnemies.push(new Enemy(-200, 220));
    allEnemies.push(new Enemy(-200, 240));
}());

var player = new Player();

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
   
    player.handleInput(allowedKeys[e.keyCode]);
});