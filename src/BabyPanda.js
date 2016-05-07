/**
 * Created by Nune on 4/22/2016 AD.
 */
var Babypanda = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'res/images/baby.png' );
        this.setPosition( new cc.Point ( 0 , 112.5 ));
        this.vy = 0;
    },
    update: function(){
        var pos = this.getPosition();
        if ( pos.x == 0){
            this.vy = 5;
        }
        else if ( pos.x == screenWidth){
            this.vy = - 5;
        }
        this.setPosition( new cc.Point( pos.x += this.vy , pos.y));
    },
    closeTo: function( obj ) {
        var myPos = this.getPosition();
        var oPos = obj.getPosition();
        return ( Math.abs( myPos.x - oPos.x) <= 30) &&
            ( Math.abs(myPos.y - oPos.y)  <= 30 );
    }
});