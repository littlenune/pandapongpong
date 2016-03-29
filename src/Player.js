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
        //if ( position >= 0 && position <= screenWidth )
        this.initWithFile('res/images/pandaRun.png');
        this.setPosition ( new cc.Point ( position.x - 100 , position.y ) );

    },
    updateRIGHT: function(){
        var position = this.getPosition();
        this.initWithFile('res/images/pandaRun.png');

        //if ( position >= 0 && position <= screenWidth )
            this.setPosition ( new cc.Point ( position.x + 100 , position.y ) );
    }

});
