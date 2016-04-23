/**
 * Created by Nune on 3/14/2016 AD.
 */
var Player = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'res/images/panda.png' );
        this.direction = 2;

    },
    update : function (){
        var pos = this.getPosition();
        if (  pos.y > 150 )
            this.setPosition( new cc.Point( pos.x, pos.y - 10 ) );
        else if ( this.direction == 0  && pos.x > 0)
            this.setPosition( new cc.Point( pos.x - 10 , pos.y ) );
        else if ( this.direction == 1 && pos.x < screenWidth )
            this.setPosition( new cc.Point( pos.x + 10 , pos.y ) );
    },
    setDirection : function(direction){
        this.direction = direction;
    }
});
