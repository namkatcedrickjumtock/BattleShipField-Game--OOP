

function setDefaultConfigurations() {

    // switch fire and start buuton
    $("#startGame").click(function (e) {
        e.preventDefault();
        $("#fire").show().css('backgroundColor', 'red');
        $("#startGame").hide();
    });

}


// complted game alert info
let info = () => {
    // alert(`you hit: ${this.alreadyDestroyedShips.length} ship \n have performance ofrate ${this.alreadyDestroyedShips.length * 50}%`)
    // this.maxGuesses = 0
    alert("completed")
    document.location.reload()
}


let isInputValid = (input) => input != "" ? true : false;

let playShipDestroyed = () => new Audio('../Assets/sounds/destroyed Ship.wav').play()
let playWeaponsReady = () => new Audio('../Assets/sounds/echo-weapons.wav').play()

let playCompleted = () => new Audio('../Assets/sounds/game-level-completed-2059.wav').play().finally(() => { info() })
let playWrongAnsers = () => new Audio('../Assets/sounds/fire.wav').play()


export { setDefaultConfigurations, isInputValid, playShipDestroyed, playWeaponsReady, playCompleted, playWrongAnsers }