// Imports
import GameWrapper from "../../eccl/base/gameWrapper.js";
import Game from "./game/game.js";

// Function for determining if document is ready
function onReady(fn) {
    if (document.readyState != 'loading'){
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}


function startGame()
{
    var gameWrapper = GameWrapper();
    var game = Game();

    gameWrapper.init('main-canvas', game);
    gameWrapper.gameLoop();

    console.log('Ready to play.');
}


// Start
onReady(function() {
    startGame();
});
