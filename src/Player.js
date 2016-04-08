/**
 * Created by Nune on 3/14/2016 AD.
 */
var Player = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'res/images/panda.png' );

    },
    updateLEFT: function (){
        var position = this.getPosition();
        if (position.x - 100 >= 100  ) {
            this.initWithFile('res/images/pandaRun.png');
            this.setPosition(new cc.Point(position.x - 100, position.y));
        }
        else {
            this.setPosition ( new cc.Point ( 100 , position.y ) );
        }

    },
    updateRIGHT: function(){
        var position = this.getPosition();
        this.initWithFile('res/images/pandaRun.png');

        if ( position.x + 100 <= screenWidth-100  ) {
            this.setPosition ( new cc.Point ( position.x + 100 , position.y ) );
        }
        else {  this.setPosition ( new cc.Point ( screenWidth-100 , position.y ) )
        }
    }
});
