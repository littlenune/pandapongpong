
var Items = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'res/images/bread.png' );
        this.vy = 0.05;
        this.started = true;
    },
    update: function( dt ) {
        if ( this.started ){
            var pos = this.getPosition();
            this.setPosition( new cc.Point( pos.x, pos.y + this.vy ) );
            this.vy += -0.05;
        }
    },
    start: function() {
        this.started = true;
    }
});
