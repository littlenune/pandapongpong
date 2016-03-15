/**
 * Created by Nune on 3/14/2016 AD.
 */
var GameLayer = cc.LayerColor.extend({
    init: function() {
        this._super(screenHeight,screenWidth);
        this.background = new Background();
        this.addChild(this.background);
        this.background.setPosition( new cc.Point(screenWidth/2.0,screenHeight/2.0));

        //this.background.setPosition( new cc.Point( 600 , 400 ));
        this.player = new Player();
        this.player.setPosition(new cc.Point( screenWidth / 2 , screenHeight / 2 ));
        this.addChild(this.player);
        this.player.scheduleUpdate();
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