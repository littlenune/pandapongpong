/**
 * Created by Nune on 3/14/2016 AD.
 */
var Player = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'res/images/panda.png' );
        this.velocity = 0;

    },

    update : function (){
        var pos = this.getPosition();
        if ( pos.y > 150 )
            this.setPosition( new cc.Point( pos.x, pos.y - 2 ) );
    },
    updateLEFT: function (){
        var position = this.getPosition();
        this.initWithFile('res/images/pandaRun.png');
        if (  position.x - 100 >= 0 ) {
            position.x -= (100+this.velocity);
            this.setPosition(new cc.Point(position.x, position.y));
        }
    },
    updateRIGHT: function(){
        var position = this.getPosition();
        this.initWithFile('res/images/pandaRun.png');
        if ( position.x + 100 <= screenWidth  ) {
            position.x += (100+this.velocity);
            this.setPosition ( new cc.Point ( position.x , position.y ) );
        }
    },
    updateJUMP : function(){
        this.vy = 150;
        var pos = this.getPosition();
        this.setPosition( new cc.Point( pos.x, pos.y + this.vy ) );
        this.vy += -1;
    }
});
Player.DIR = {
    LEFT : cc.KEY.left,
    RIGHT : cc.KEY.right,
};