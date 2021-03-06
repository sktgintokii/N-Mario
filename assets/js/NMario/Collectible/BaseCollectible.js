require.config({
  paths: {
    'Phaser': '../libs/phaser/phaser.min'
  },
  shim: {
    'Phaser': {
      exports: 'Phaser'
    }
  }
});

define('BaseCollectible', ['Phaser'], function (Phaser) {

  var BaseCollectible = function (game, objects, x, y, attr, sprite) {

    var self = this;

    Phaser.Sprite.call(this, game, x * 16 * localStorage.scale, y * 16 * localStorage.scale, sprite, 0);
    objects.add(this);

    this.body.collideWorldBounds = true;
    this.scale.setTo(localStorage.scale, localStorage.scale);

    this.broadcast = function (socket) {
      socket.emit('collectible data update', this.lastestData);
    };

    this.__defineGetter__('lastestData', function () {
      return { id: attr.id };
    });

    this.__defineGetter__('id', function () {
      return attr.id;
    });

    this.collected = function (player, collect_index) {
      console.log('collect: ' + self.Type);
    };

  };

  BaseCollectible.collide_objects = null;
  BaseCollectible.overlap_objects = null;
  BaseCollectible.floating_objects = null;
  BaseCollectible.ref_collectibles = {};
  BaseCollectible.structure_objects = [];

  BaseCollectible.prototype = Object.create(Phaser.Sprite.prototype);
  BaseCollectible.prototype.constructor = BaseCollectible;
  BaseCollectible.prototype.Type = 'Collectible';

  return BaseCollectible;
});
