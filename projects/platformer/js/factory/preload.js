(function (window) {
    'use strict';
    window.opspark = window.opspark || {};
    let opspark = window.opspark;
    
    // TODO : Load config for url //
    opspark.preload = function (game) {
        game.load.image('cannon', 'https://benspectoros.github.io/projects/platformer/asset/cannon.png');
        game.load.image('projectile', 'https://benspectoros.github.io/projects/platformer/asset/projectile.png');
        game.load.image('platform', 'https://benspectoros.github.io/projects/platformer/asset/platform.png');
        game.load.image('db', 'https://benspectoros.github.io/projects/platformer/asset/collectable/database.png');
        game.load.image('steve', 'https://benspectoros.github.io/projects/platformer/asset/collectable/steve-head.png');
        game.load.image('grace', 'https://benspectoros.github.io/projects/platformer/asset/collectable/grace-head.png');
        game.load.image('kennedi', 'https://benspectoros.github.io/projects/platformer/asset/collectable/kennedi-head.png');
        game.load.image('max', 'https://benspectoros.github.io/projects/platformer/asset/collectable/max-head.png');
        game.load.atlas('halle', 'https://benspectoros.github.io/projects/platformer/asset/halle/phaser-json-array/halle.png', 'https://benspectoros.github.io/projects/platformer/asset/halle/phaser-json-array/halle.json');
    };
})(window);
