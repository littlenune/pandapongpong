
var Bomb = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'res/images/bomb.png' );
        this.vy = 10;
        this.started = true;

    },
    update: function( dt ) {
        if ( this.started ){
            var pos = this.getPosition();
            this.setPosition( new cc.Point( pos.x, pos.y - this.vy ) );
            //this.vy += -0.025;

        }
        if ( this.getPosition().y == -10)
            this.randomPosition();
    },
    start: function() {
        this.started = true;
    },
    randomPosition: function() {
        var x,y;
        x = 100+(100*Math.round((Math.random()*5)));
        y = 650+((100*Math.round((Math.random()*5))));
        return this.setPosition( new cc.Point( x, y ) );
    },
    closeTo: function( obj ) {
        var myPos = this.getPosition();
        var oPos = obj.getPosition();
        return ( Math.abs( myPos.x - oPos.x) <= 30) &&
            ( Math.abs(myPos.y - oPos.y)  <= 30 );

    }
});
