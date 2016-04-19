/**
 * Created by Nune on 4/19/2016 AD.
 */
var Monster = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'res/images/monster.png' );
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
    }
});