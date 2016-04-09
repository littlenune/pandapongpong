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

        this.createItem();

        this.createBomb();

        this.addKeyboardHandlers();
        this.scoreLabel = cc.LabelTTF.create( '0', 'Arial', 40 );
        this.scoreLabel.setPosition( new cc.Point( 750, 550 ) );
        this.addChild( this.scoreLabel );

        this.health = cc.LabelTTF.create('3','Arial',50);
        this.health.setPosition( new cc.Point( 200, 550 ) );
        this.addChild( this.health );
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
        if ( keyCode == cc.KEY.left ) {
            this.player.updateLEFT();
        }
        else if ( keyCode == cc.KEY.right ){
            this.player.updateRIGHT();
        }
    },
    onKeyUp: function( keyCode, event ) {
        this.player.initWithFile( 'res/images/panda.png' );
    },
    update : function() {
        //if ( !this.checkDeath()) {
            for (var i = 0; i <= 3; i++) {
                if (this.items[i].closeTo(this.player)) {
                    this.scoreLabel.setString(parseInt(this.scoreLabel.string) + 1);
                    this.player.initWithFile('res/images/pandaEat.png');
                    this.items[i].randomPosition();
                    //this.updateHealth();
                }
                else if (this.bomb.closeTo(this.player)) {
                    this.health.setString(parseInt(this.health.string) - 1);
                    this.player.initWithFile('res/images/pandaEat.png');
                    this.bomb.randomPosition();
                }
                else if ( this.bomb2.closeTo(this.player)){
                this.health.setString(parseInt(this.health.string) - 1);
                    this.player.initWithFile('res/images/pandaEat.png');
                    this.bomb2.randomPosition();
                }
            }
        //}
    },
//    updateHealth : function() {
//        for ( var i = 0 ; i <= 1 ; i++) {
//            if ( this.bomb[i].closeTo(this.player)){
//                this.health.setString(parseInt(this.health.string) - 1);
//                this.player.initWithFile('res/images/pandaEat.png');
//                this.bomb[i].randomPosition();
//            }
//        }
//    }
//    checkDeath : function() {
//    if ( this.health.getString() == 0 ){
//        this.console("Game Over");
//        return true;
//    }
//},
    createItem : function() {
        this.items = [];
        for (var i = 0; i <= 3; i++) {
            this.items[i] = new Items();
            this.addChild(this.items[i]);
            this.items[i].randomPosition();
            this.items[i].scheduleUpdate();
        }

    },
    createBomb : function () {
        this.bomb = new Bomb();
        this.bomb2 = new Bomb();
        this.addChild(this.bomb);
        this.bomb.randomPosition();
        this.bomb.scheduleUpdate();
        this.addChild(this.bomb2);
        this.bomb2.randomPosition();
        this.bomb2.scheduleUpdate();
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