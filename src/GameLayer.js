/**
 * Created by Nune on 3/14/2016 AD.
 */
var GameLayer = cc.LayerColor.extend({
    init: function() {
        this._super(screenHeight,screenWidth);
        this.background = new Background();
        this.addChild(this.background);
        this.background.setPosition( new cc.Point( screenWidth / 2 , screenHeight/2 ));
        this.player = new Player();
        this.player.setPosition(new cc.Point( screenWidth / 2 , 150 ));
        this.addChild(this.player);
        this.addKeyboardHandlers();
        this.items = null;

    },

    onKeyDown: function( keyCode, event ) {
        if ( keyCode == cc.KEY.left ) {
            this.player.updateLEFT();
            this.createItems();
        }
        else if ( keyCode == cc.KEY.right ){
            this.player.updateRIGHT();
            this.createItems();
        }
    },
    onKeyUp: function( keyCode, event ) {
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
    createItems: function() {
        this.items = new Items();
        this.items.setPosition( new cc.Point( (Math.random()*700) , 650));
        this.addChild( this.items );
        this.items.scheduleUpdate();
    },
});



var StartScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new GameLayer();
        layer.init();
        this.addChild( layer );
    }
});