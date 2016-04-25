/**
 * Created by Nune on 3/14/2016 AD.
 */
var GameLayer = cc.LayerColor.extend({
    init: function() {
        this._super(screenHeight,screenWidth);
        this.scheduleUpdate();
        cc.audioEngine.end();
        this.background = new Background();
        this.addChild(this.background);
        this.background.setPosition( new cc.Point( screenWidth / 2 , screenHeight/2 ));
        this.player = new Player();
        this.player.setPosition(new cc.Point( screenWidth / 2 , 150 ));
        this.addChild(this.player);
        this.player.scheduleUpdate();
        this.createHowToPlayButton();
        this.addKeyboardHandlers();

        this.scoreLabel = cc.LabelTTF.create( '0', 'Phosphate', 60 );
        this.scoreLabel.setPosition( new cc.Point( 750, 550 ) );
        this.addChild( this.scoreLabel );

        this.life = cc.LabelTTF.create( 'Life : ', 'Phosphate' , 50);
        this.life.setPosition(new cc.Point( 400 , 550 ));
        this.addChild(this.life);
        this.lifeLabel = cc.LabelTTF.create( '3' , 'Phosphate',60 );
        this.lifeLabel.setPosition( new cc.Point( 500 , 550 ) );
        this.addChild( this.lifeLabel );

        this.panda = new Panda();
        this.addChild(this.panda);
        this.bomb = [];
        this.baby = [];
        this.bombCount = 0;
        this.babyCount = 0;
        this.spacebar = new Spacebar();
        this.addChild(this.spacebar);
        this.spacebar.setPosition( new cc.Point ( screenWidth / 2 , 350 ));

        cc.audioEngine.playEffect( 'res/effect/gameSong.mp3',true );
        this.startGame = false;
        return true;
    },
    addKeyboardHandlers: function() {
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed : function( keyCode, event ) {
                self.onKeyDown( keyCode, event );
            },
            onKeyReleased: function( keyCode, event ) {
                self.onKeyUp( keyCode, event );
            }
        }, this);
    },
    onKeyDown: function( keyCode, event ) {
        if ( keyCode == cc.KEY.space && this.startGame == false ){
            this.removeChild(this.panda);
            this.removeChild(this.spacebar);
            this.removeChild(this.howToPlay);
            this.startGame = true;
            this.createItem();
            this.createBomb();
        }
        if ( keyCode == 37 ) {
            this.player.setDirection(0);
            this.player.scheduleUpdate();
            this.player.initWithFile( 'res/images/pandaRun.png' );
        }
        else if ( keyCode == 39 ){
            this.player.setDirection(1);
            this.player.scheduleUpdate();
            this.player.initWithFile( 'res/images/pandaRun.png' );
        }
        else if ( keyCode == cc.KEY.up) {
            this.player.scheduleUpdate();
        }
    },
    onKeyUp: function( keyCode, event ) {
        this.player.initWithFile( 'res/images/panda.png' );
        if ( this.jump == true ) {
            this.player.setPosition(this.player.getPosition().x, this.player.getPosition.y -= 1);
        }
        else {
            this.player.setDirection(3);
        }
    },
    update : function() {
        if ( this.startGame == true ) {
            for ( var i = 0 ; i <= 1 ; i++) {
                if (this.bread[i].closeTo(this.player)) {
                    cc.audioEngine.playEffect('res/effect/eatSound.wav');
                    this.scoreLabel.setString(parseInt(this.scoreLabel.string) + 1);
                    this.player.initWithFile('res/images/pandaEat.png');
                    this.bread[i].randomPosition();
                    this.createBomb();

                }
                else if (this.icecream[i].closeTo(this.player)) {
                    cc.audioEngine.playEffect('res/effect/eatSound.wav');
                    this.scoreLabel.setString(parseInt(this.scoreLabel.string) + 5);
                    this.player.initWithFile('res/images/pandaEat.png');
                    this.icecream[i].randomPosition();
                    this.createBomb();

                }
                else if (this.candy[i].closeTo(this.player)) {
                    cc.audioEngine.playEffect('res/effect/eatSound.wav');
                    this.scoreLabel.setString(parseInt(this.scoreLabel.string) + 10);
                    this.player.initWithFile('res/images/pandaEat.png');
                    this.candy[i].randomPosition();
                    this.createBomb();


                }
                else if ( this.cupcake[i].closeTo(this.player)){
                    cc.audioEngine.playEffect('res/effect/eatSound.wav');
                    this.player.initWithFile('res/images/pandaEat.png');
                    this.cupcake[i].randomPosition();
                    this.createBaby();
                    this.createBomb();
                }
            }
            if ( this.bombCount > 0){
            for ( var j = 1 ; j <= this.bombCount ; j++) {
                if (this.bomb[j].closeTo(this.player)) {
                    this.createBomb();
                    var lifeCount = parseInt(this.lifeLabel.string) - 1;
                    cc.audioEngine.playEffect('res/effect/eatSound.wav');
                    this.lifeLabel.setString(parseInt(this.lifeLabel.string) - 1);
                    this.player.initWithFile('res/images/pandaEat.png');
                    this.bomb[j].randomPosition();
                    this.createBomb();
                    if (lifeCount == 0) {
                        this.startGame == false;
                        cc.audioEngine.end();
                        cc.director.runScene(new GameOverScreen());
                    }
                }
                if (this.babyCount > 0) {
                    for ( var k = 1 ; k <= this.babyCount ; k++){
                    if (this.bomb[j].closeTo(this.baby[k])) {
                        this.removeChild(this.baby[k]);
                        this.bomb[j].randomPosition();
                        this.babyCount-=1;
                        }
                    }
                }
            }
            }
        }
    },
    createCupcake : function(){
        this.cupcake = [];
        this.cupcake[0] = new Cupcake();
        this.addChild(this.cupcake[0]);
        this.cupcake[0].randomPosition();
        this.cupcake[0].scheduleUpdate();
        this.cupcake[1] = new Cupcake();
        this.addChild(this.cupcake[1]);
        this.cupcake[1].randomPosition();
        this.cupcake[1].scheduleUpdate();
    },
    createIcecream : function() {
        this.icecream = [];
        this.icecream[0] = new Icecream();
        this.addChild(this.icecream[0]);
        this.icecream[0].randomPosition();
        this.icecream[0].scheduleUpdate();
        this.icecream[1] = new Icecream();
        this.addChild(this.icecream[1]);
        this.icecream[1].randomPosition();
        this.icecream[1].scheduleUpdate();
    },
    createBread : function(){
        this.bread = [];
        this.bread[0] = new Bread();
        this.addChild(this.bread[0]);
        this.bread[0].randomPosition();
        this.bread[0].scheduleUpdate();
        this.bread[1] = new Bread();
        this.addChild(this.bread[1]);
        this.bread[1].randomPosition();
        this.bread[1].scheduleUpdate();
    },
    createCandy : function(){
        this.candy = [];
        this.candy[0] = new Candy();
        this.addChild(this.candy[0]);
        this.candy[0].randomPosition();
        this.candy[0].scheduleUpdate();
        this.candy[1] = new Candy();
        this.addChild(this.candy[1]);
        this.candy[1].randomPosition();
        this.candy[1].scheduleUpdate();
    },
    createItem : function(){
        this.createBread();
        this.createIcecream();
        this.createCandy();
        this.createCupcake();
    },
    createBomb : function () {
        this.bombCount += 1;
        this.bomb[this.bombCount] = new Bomb();
        this.addChild( this.bomb[this.bombCount] );
        this.bomb[this.bombCount].randomPosition();
        this.bomb[this.bombCount].scheduleUpdate();
    },
    createBaby : function(){
        this.babyCount+=1;
        this.baby[this.babyCount] = new Babypanda();
        this.addChild(this.baby[this.babyCount]);
        this.baby[this.babyCount].setPosition( new cc.Point ( 0 , 112.5 ));
        this.baby[this.babyCount].scheduleUpdate();
    },
    createHowToPlayButton : function() {
        this.howToPlayImage = new cc.MenuItemImage('res/images/howtoplay1.png', 'res/images/howtoplay2.png', function () {
            cc.director.runScene(new HowToPlayScene());
        }, this);
        this.howToPlay = new cc.Menu(this.howToPlayImage);
        this.howToPlay.setPosition(new cc.Point(screenWidth / 2, 300));
        this.addChild(this.howToPlay);
    },
    checkBabyEat : function () {
        for ( var i = 0 ; i <= 1 ; i++) {
            for (var j = 0; j < this.babyCount; i++) {
                if (this.bread[i].closeTo(this.baby[j])) {
                    cc.audioEngine.playEffect('res/effect/eatSound.wav');
                    this.scoreLabel.setString(parseInt(this.scoreLabel.string) + 1);
                    this.baby[j].initWithFile('res/images/babyEat.png');
                    this.bread[i].randomPosition();
                    this.createBomb();

                }
                else if (this.icecream[i].closeTo(this.player)) {
                    cc.audioEngine.playEffect('res/effect/eatSound.wav');
                    this.scoreLabel.setString(parseInt(this.scoreLabel.string) + 5);
                    this.player.initWithFile('res/images/pandaEat.png');
                    this.icecream[i].randomPosition();
                    this.createBomb();

                }
                else if (this.candy[i].closeTo(this.player)) {
                    cc.audioEngine.playEffect('res/effect/eatSound.wav');
                    this.scoreLabel.setString(parseInt(this.scoreLabel.string) + 10);
                    this.player.initWithFile('res/images/pandaEat.png');
                    this.candy[i].randomPosition();
                    this.createBomb();


                }
                else if (this.cupcake[i].closeTo(this.player)) {
                    cc.audioEngine.playEffect('res/effect/eatSound.wav');
                    this.player.initWithFile('res/images/pandaEat.png');
                    this.cupcake[i].randomPosition();
                    this.createBaby();
                    this.createBomb();
                }
            }
        }
    }
});
var StartScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new GameLayer();
        layer.init();
        this.addChild( layer );
    }
});