// logic for the count game
class NumberedBox extends createjs.Container{
    constructor(game ,number=0){
        super();

        this.game = game;
        this.number = number;

        var movieClip = new lib.NumberedBox();
        movieClip.numberText.text = number;
        this.addChild(movieClip);

        this.setBounds(0,0,50,50);

        //click or tap
        this.on('click', this.handleClick.bind(this));


    }
    handleClick(){
        this.game.handleClick(this);
    }
}
//The base of the game
class GameData{
    constructor(){
        this.amountOfBox = 20;
        this.resetData();
    }
    resetData(){
        this.currentNumber = 1;
    }
    nextNumber(){
        this.currentNumber +=1;
    }
    isRightNumber(number){
        return(number === this.currentNumber);
    }
    isGameWin(){
        return (this.currentNumber > this.amountOfBox);
    }

}

class Game{
    constructor(){
        console.log(`welcome to the Game. Version ${this.version()}`);

        //provide the canvas we want to draw on.
        this.canvas = document.getElementById("game-canvas");
        this.stage = new createjs.Stage(this.canvas);

        this.stage.width = this.canvas.width;
        this.stage.height = this.canvas.height;

        //enable touch
        createjs.Touch.enable(this.stage);

        //retina screen
        // this.retinalize();

        //ticker - cloak
        createjs.Ticker.setFPS(60);

        //INITIALIZE THE GAME
        this.gameData = new GameData();

        //keep redrawing the stage
        createjs.Ticker.on("tick", this.stage);

        //background
        this.stage.addChild(new lib.Background());

        //test
        this.generateMultipleBoxes(this.gameData.amountOfBox);
    }

    version(){
        return '1.0.0';
    }
    generateMultipleBoxes(amount=10){
        for(var i=amount; i>0; i--){
            var movieClip = new NumberedBox(this, i);
            this.stage.addChild(movieClip);

            //random position
            movieClip.x = Math.random()* (this.stage.width - 
            movieClip.getBounds().width);
            movieClip.y = Math.random()* (this.stage.height -
            movieClip.getBounds().height);
    
        }
    }
    handleClick(NumberedBox){
        if(this.gameData.isRightNumber(NumberedBox.number)){
            this.stage.removeChild(NumberedBox);
            this.gameData.nextNumber();

            // gameover
            if(this.gameData.isGameWin()){
                var gameOverView = new lib.GameOverView();
                this.stage.addChild(gameOverView);
            
            }
        }      
    }
    retinalize(){
        this.stage.width = this.canvas.width;
        this.stage.height = this.canvas.height;

        let ratio = window.devicePixelRatio;
        if (ratio === undefined){
            return;
        }

        this.canvas.setAttribute('width',Math.round(this.stage.width *ratio));
        this.canvas.setAttribute('height',Math.round(this.stage.height *ratio));

        this.stage.scaleX = this.stage.scaleY = ratio;

        //css
        this.canvas.style.width = this.stage.width + "px";
        this.canvas.style.height = this.stage.height + "px";
    }


}

// start the game
var game = new Game();