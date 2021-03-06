/**
 * Created by Nune on 4/25/2016 AD.
 */
var GameOverPage = cc.LayerColor.extend({
    init: function () {
        this._super(screenHeight,screenWidth);
        this.gameover = new Gameover();
        cc.audioEngine.playEffect('res/effect/tata.mp3');
        this.addChild(this.gameover);
        this.gameover.setPosition( new cc.Point(screenWidth / 2 , screenHeight/2 ));
        this.scoreTotalLabel = cc.LabelTTF.create( scoreTotal+"", 'Phosphate', 60 );
        this.createRestartButton();
        this.scoreTotalLabel.setPosition( new cc.Point( 550, 300 ) );
        this.addChild( this.scoreTotalLabel , 1);
    },
    createRestartButton : function() {
        this.restartImage = new cc.MenuItemImage('res/images/restart.png', 'res/images/restart2.png', function () {
            cc.director.runScene(new StartScene());
            cc.audioEngine.end();

        }, this);
        this.restart = new cc.Menu(this.restartImage);
        this.restart.setPosition(new cc.Point(screenWidth / 2, 150));
        this.addChild(this.restart);
        scoreTotal = 0;
    }
});

var GameOverScreen = cc.Scene.extend({
        onEnter: function() {
            this._super();
            var layer = new GameOverPage();
            layer.init();
            this.addChild( layer );
        }
});