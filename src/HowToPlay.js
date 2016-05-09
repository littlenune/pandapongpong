/**
 * Created by Nune on 4/24/2016 AD.
 */
var HowToPlay = cc.Layer.extend({
    ctor: function() {
        this._super();
        this.howToPlaySprite = new HowToPlaySprite();
        this.howToPlaySprite.setPosition( new cc.Point(screenWidth/2,screenHeight/2));
        this.addChild( this.howToPlaySprite );
        this.createBackButton();
    },
    createBackButton : function() {
        this.backButton = new cc.MenuItemImage('res/images/restart.png', 'res/images/restart2.png', function () {
            cc.director.runScene(new StartScene());
            cc.audioEngine.end();
        }, this);
        this.back = new cc.Menu(this.backButton);
        this.back.setPosition(new cc.Point(100, 150));
        this.addChild(this.back);
    }
});
var HowToPlayScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new HowToPlay();
        layer.init();
        this.addChild( layer );

    }
});