/**
 * Created by Nune on 4/24/2016 AD.
 */
var HowToPlay = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'res/images/howtoplay.png' );
        this.setPosition( new cc.Point( screenWidth / 2 , screenHeight/2 ));
        this.createBackButton();
    },
    createBackButton : function() {
        this.backButton = new cc.MenuItemImage('res/images/restart.png', 'res/images/restart2.png', function () {
            cc.director.runScene(new StartScene());
        }, this);
        this.back = new cc.Menu(this.backButton);
        this.back.setPosition(new cc.Point(100, 150));
        this.addChild(this.back);
        cc.audioEngine.playEffect('res/effect/gameSong.mp3',true);
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