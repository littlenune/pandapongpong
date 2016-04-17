/**
 * Created by Nune on 4/17/2016 AD.
 */
var Spacebar = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'res/images/spacebar1.png' );
        var animation = new cc.Animation.create();
        animation.addSpriteFrameWithFile( 'res/images/spacebar1.png' );
        animation.addSpriteFrameWithFile( 'res/images/spacebar2.png' );
        animation.setDelayPerUnit( 0.2 );
        var spacebarAction = cc.RepeatForever.create( cc.Animate.create( animation ) );
        this.runAction( spacebarAction );
    }
});