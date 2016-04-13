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

        this.LifeLabel = cc.LabelTTF.create( '3' , 'Arial',50 );
        this.LifeLabel.setPosition( new cc.Point( 500 , 550 ) );
        this.addChild( this.LifeLabel );

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
            if (this.bread.closeTo(this.player)) {
                this.scoreLabel.setString(parseInt(this.scoreLabel.string) + 1);
                this.player.initWithFile('res/images/pandaEat.png');
                this.bread.randomPosition();
            }
            else if ( this.icecream.closeTo(this.player)) {
                this.scoreLabel.setString(parseInt(this.scoreLabel.string) + 5);
                this.player.initWithFile('res/images/pandaEat.png');
                this.icecream.randomPosition();
            }
            else if ( this.candy.closeTo(this.player)) {
                this.scoreLabel.setString(parseInt(this.scoreLabel.string) + 10);
                this.player.initWithFile('res/images/pandaEat.png');
                this.candy.randomPosition();
            }
            else if (this.bomb.closeTo(this.player)) {
                this.LifeLabel.setString(parseInt(this.LifeLabel.string) - 1);
                this.player.initWithFile('res/images/pandaEat.png');
                this.bomb.randomPosition();
            }
    },
    //createItem : function() {
    //    this.items = [];
    //    for (var i = 0; i <= 3; i++) {
    //        this.items[i] = new Items();
    //        if ( i == 0){
    //            this.items[i].initWithFile('res/images/icecream.png');
    //        }
    //        else if ( i === 2){
    //            this.items[i].initWithFile('res/images/candy.png');
    //        }
    //        this.addChild(this.items[i]);
    //        this.items[i].randomPosition();
    //        this.items[i].scheduleUpdate();
    //    }
    //},
    createIcecream : function() {
        this.icecream = new Icecream();
        this.addChild(this.icecream);
        this.icecream.randomPosition;
        this.icecream.scheduleUpdate();
    },
    createBread : function(){
        this.bread = new Bread();
        this.addChild(this.bread);
        this.bread.randomPosition();
        this.bread.scheduleUpdate();
    },
    createCandy : function(){
        this.candy = new Candy();
        this.addChild(this.candy);
        this.candy.randomPosition();
        this.candy.scheduleUpdate();
    },
    createItem : function(){
        this.createBread();
        this.createIcecream();
        this.createCandy();
    },
    createBomb : function () {
        this.bomb = new Bomb();
        this.addChild( this.bomb );
        this.bomb.randomPosition();
        this.bomb.scheduleUpdate();
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