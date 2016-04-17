/**
 * Created by Nune on 3/14/2016 AD.
 */
var GameLayer = cc.LayerColor.extend({
    init: function() {
        this._super(screenHeight,screenWidth);
        this.scheduleUpdate();

        this.background = new Background();
        this.addChild(this.background);
        this.background.setPosition( new cc.Point( screenWidth / 2 , screenHeight/2 ));
        this.player = new Player();
        this.player.setPosition(new cc.Point( screenWidth / 2 , 150 ));
        this.addChild(this.player);
        this.player.scheduleUpdate();
        //this.animation();

        this.addKeyboardHandlers();

        this.scoreLabel = cc.LabelTTF.create( '0', 'Arial', 40 );
        this.scoreLabel.setPosition( new cc.Point( 750, 550 ) );
        this.addChild( this.scoreLabel );


        this.LifeLabel = cc.LabelTTF.create( '3' , 'Arial',50 );
        this.LifeLabel.setPosition( new cc.Point( 500 , 550 ) );
        this.addChild( this.LifeLabel );

        this.panda = new Panda();
        this.addChild(this.panda);
        //this.movingAction = this.createAnimationAction();
        //this.runAction( this.movingAction );
        //
        //this.createAnimationAction();
        this.spacebar = new Spacebar();
        this.addChild(this.spacebar);
        this.spacebar.setPosition( new cc.Point ( screenWidth / 2 , 350 ));


        //this.scoreCount = 0;
        //this.jump == false;
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
            this.startGame = true;
            this.createItem();
            this.createBomb();
        }
        if ( keyCode == cc.KEY.left ) {
            this.player.updateLEFT();
        }
        else if ( keyCode == cc.KEY.right ){
            this.player.updateRIGHT();
        }
        else if ( keyCode == cc.KEY.up) {
            this.player.updateJUMP();
        }
    },
    onKeyUp: function( keyCode, event ) {
        this.player.initWithFile( 'res/images/panda.png' );
        if ( this.jump == true ) {
            this.player.setPosition(this.player.getPosition().x, this.player.getPosition.y -= 1);
        }
    },
    update : function() {
            if ( this.startGame == true ) {
                for ( var i = 0 ; i <= 1 ; i++) {
                    if (this.bread[i].closeTo(this.player)) {
                        cc.audioEngine.playEffect( 'res/effect/eatSound.wav' );
                        this.scoreCount+=1;
                        //this.updateScore(this.scoreCount);
                        this.scoreLabel.setString(parseInt(this.scoreLabel.string) + 1);
                        this.player.initWithFile('res/images/pandaEat.png');
                        this.bread[i].randomPosition();
                    }
                    else if (this.icecream[i].closeTo(this.player)) {
                        cc.audioEngine.playEffect( 'res/effect/eatSound.wav' );
                        this.scoreCount+=5;
                        //this.updateScore(this.scoreCount);
                        this.scoreLabel.setString(parseInt(this.scoreLabel.string) + 5);
                        this.player.initWithFile('res/images/pandaEat.png');
                        this.icecream[i].randomPosition();
                    }
                    else if (this.candy[i].closeTo(this.player)) {
                        cc.audioEngine.playEffect( 'res/effect/eatSound.wav' );
                        this.scoreCount+10;
                        //this.updateScore(this.scoreCount);
                        this.scoreLabel.setString(parseInt(this.scoreLabel.string) + 10);
                        this.player.initWithFile('res/images/pandaEat.png');
                        this.candy[i].randomPosition();
                    }
                    else if (this.bomb[i].closeTo(this.player)) {
                        cc.audioEngine.playEffect( 'res/effect/eatSound.wav' );
                        this.LifeLabel.setString(parseInt(this.LifeLabel.string) - 1);
                        this.player.initWithFile('res/images/pandaEat.png');
                        this.bomb[i].randomPosition();
                        //if ( parseInt(this.LifeLabel.string) == 0{
                        //    this.startGame == false;
                        //}
                    }
                }
            }
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
    },
    createBomb : function () {
        this.bomb = [];
        this.bomb[0] = new Bomb();
        this.addChild( this.bomb[0] );
        this.bomb[0].randomPosition();
        this.bomb[0].scheduleUpdate();
        this.bomb[1] = new Bomb();
        this.addChild(this.bomb[1]);
        this.bomb[1].randomPosition();
        this.bomb[1].scheduleUpdate();
    },
    //updateScore: function( score ){
    //    var posX = 750;
    //    this.score = [];
    //    var i = 0;
    //    while ( score > 0){
    //        this.score[i] = new Score;
    //        this.addChild(this.score[i]);
    //        this.score[i] = score % 10;
    //        score = score / 10;
    //    if ( this.score[i] == 0){
    //        this.score[i].initWithFile('res/images/number/zero.png');
    //        //this.score[i].setSelectedImage(Zero);
    //    }
    //    else if ( this.score[i] == 1){
    //        //this.score[i].setSelectedImage(One);
    //        this.score[i].initWithFile('res/iamges/number/one.png');
    //    }
    //    else if ( this.score[i] == 2){
    //        //this.score[i].setSelectedImage(Two);
    //        this.score[i].initWithFile('res/iamges/number/two.png');
    //    }
    //    else if ( this.score[i] == 3){
    //        //this.score[i].setSelectedImage(Three);
    //        this.score[i].initWithFile('res/images/number/three.png');
    //    }
    //    else if ( this.score[i] == 4 ){
    //        //this.score[i].setSelectedImage(Four);
    //        this.score[i].initWithFile('res/images/number/four.png');
    //    }
    //    else if ( this.score[i] == 5 ){
    //        //this.score[i].setSelectedImage(Five);
    //        this.score[i].initWithFile('res/images/number/five.png');
    //    }
    //    else if ( this.score[i] == 6 ){
    //        //this.score[i].setSelectedImage(Six);
    //        this.score[i].initWithFile('res/images/number/six.png');
    //    }
    //    else if ( this.score[i] == 7 ){
    //        //this.score[i].setSelectedImage(Seven);
    //        this.score[i].initWithFile('res/images/number/seven.png');
    //    }
    //    else if ( this.score[i] == 8 ){
    //        //this.score[i].setSelectedImage(Eight);
    //        this.score[i].initWithFile('res/images/number/eight.png');
    //    }
    //    else if ( this.score[i] == 9 ){
    //        //this.score[i].setSelectedImage(Nine);
    //        this.score[i].initWithFile('res/images/number/nine.png');
    //    }
    //        this.score[i].setPosition(posX,550);
    //        posX-=50;
    //        i++;
    //    }
    //},
    //createAnimationAction: function() {
    //    var animation = new cc.Animation.create();
    //    animation.addSpriteFrameWithFile( 'res/images/spacebar1.png' );
    //    animation.addSpriteFrameWithFile( 'res/images/spacebar2.png' );
    //    console.log( animation.getDelayPerUnit() );
    //    animation.setDelayPerUnit( 0.2 );
    //    return cc.RepeatForever.create( cc.Animate.create( animation ) );
    //}
});
var StartScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new GameLayer();
        layer.init();
        this.addChild( layer );
    }
});