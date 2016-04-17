/**
 * Created by Nune on 4/13/2016 AD.
 */
var Panda = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'res/images/pandaPongPong.png' );
        this.setPosition( new cc.Point ( screenWidth / 2 + 50 , 450 ));
    }
});