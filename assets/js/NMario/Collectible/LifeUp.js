require.config({
  paths: {
    'BaseCollectible': 'NMario/Collectible/BaseCollectible',
    'Music': 'Music'
  },
  shim: {
    'Phaser': {
      exports: 'Phaser'
    }
  }
});

define('LifeUp', ['BaseCollectible', 'Music'], function (BaseCollectible, Music) {
  var type2color = {
    lifeup: 0
  };

  var LifeUp = function(game, objects, x, y, attr) {

    var self = this;
    
    BaseCollectible.call(this, game, objects, x, y, attr, 'power-up');

    this.frame = type2color[attr.type];

    this.scale.setTo(localStorage.scale, localStorage.scale);

    this.body.velocity.x = 20 * localStorage.scale;
    this.body.gravity.y = 800 * localStorage.scale;
    this.body.bounce.x = 1;

    this.anchor.setTo(0, 0);
    this.body.setSize(16, 16, 0, 0);

    var lastestPhysics = null;

    this.update = function () {

      if (lastestPhysics != null) {
        self.body.x = lastestPhysics.position.x * localStorage.scale;
        self.body.y = lastestPhysics.position.y * localStorage.scale;

        self.body.velocity.x = lastestPhysics.velocity.x * localStorage.scale;
        self.body.velocity.y = lastestPhysics.velocity.y * localStorage.scale;

        self.body.acceleration.x = lastestPhysics.acceleration.x * localStorage.scale;
        self.body.acceleration.y = lastestPhysics.acceleration.y * localStorage.scale;

        lastestPhysics = null;
      }
    };

    this.__defineSetter__('lastestData', function (data) {
      lastestPhysics = data.physics;
    });

    this.__defineGetter__('lastestData', function () {
      return {
        id: attr.id,
        physics: {
          position: { x: self.body.x / localStorage.scale, y: self.body.y / localStorage.scale },
          velocity: { x: self.body.velocity.x / localStorage.scale, y: self.body.velocity.y / localStorage.scale },
          acceleration: { x: self.body.acceleration.x / localStorage.scale, y: self.body.acceleration.y / localStorage.scale }
        }
      };
    });

    this.collected = function (player, collect_index) {
      if (attr.type == 'lifeup') {
        console.log('life up', player);
        player.lives+=1;
        Music.sound('one-up');
        self.kill();
      }
    };

  };

  LifeUp.prototype = Object.create(BaseCollectible.prototype);
  LifeUp.prototype.constructor = LifeUp;
  LifeUp.prototype.Type = 'LifeUp';

  return LifeUp;
});
