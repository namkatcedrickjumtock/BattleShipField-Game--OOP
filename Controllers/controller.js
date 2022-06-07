import ModelClass from '../models/Model.js';
import { ViewClass as View } from '../Views/view.js';
import { setDefaultConfigurations, isInputValid, playShipDestroyed, playCompleted, playWrongAnsers } from "./helper.js";


export class ControllerClass extends ModelClass {


    // preliminary loads before start playing Game
    constructor(props) {
        super(props);
        this.setPrefixCoordinateToModel(["a", "b", 'c', 'd', 'e', 'f', 'g'])
        View.generateDivElements(49)
        this.generatCoordinates()
        this.assignCoordinatesToDivs()
        this.loadBattleShips()
    }

    // set up and push prefix Coordinates to Model
    setPrefixCoordinateToModel = (prefix) => prefix.forEach(element => { this.prefixCoordinates.push(element) });

    // static method are called direct class name.methodName directly
    static getElemId = (id) => document.getElementById(id)
    static getElemClsName = (classN) => document.getElementsByClassName(classN)

    // assign Coordinates to divs
    assignCoordinatesToDivs() {
        let genCoordinates = this.generatCoordinates()
        for (const coordinates in genCoordinates) {
            let div = ControllerClass.getElemId('grid')
            div.children[coordinates].setAttribute('id', genCoordinates[coordinates])
        }
    }

    filterCoordinates(coordinates) {
        let filterdDuplicatesCoordinates = []
        coordinates.filter((id, index) => {
            coordinates.indexOf(id) === index ? filterdDuplicatesCoordinates.push(id) : filterdDuplicatesCoordinates.push(this.generateRandomCoordinates())
        })
        this.shipCoordinates = filterdDuplicatesCoordinates;
        console.log(`wining coor ${this.shipCoordinates}`);
    }

    // generating random coordinates
    generateRandomCoordinates = () => this.globalGeneratedCoordinates[Math.floor(Math.random() * this.globalGeneratedCoordinates.length)]

    loadBattleShips() {
        let holdCoordinates = []
        for (let i = 0; i < 3; i++) {
            holdCoordinates.push(this.generateRandomCoordinates())
        }
        this.filterCoordinates(holdCoordinates)
    }


    // if ships has been targeted at first
    isShipAlreadyTargeted = (targets) => this.targetedShips.includes(targets) ? true : false;




    // start playing games
    startGame(userGuess) {

        this.maxGuesses += 1

        this.maxGuesses === 3 ? playCompleted() : false;

        let setAssUpperCase = userGuess.toUpperCase()


        let isAConfirmHit = this.isPlayerGuessCorrect(setAssUpperCase, this.shipCoordinates)


        this.isShipAlreadyTargeted(setAssUpperCase) ? alert(`Already Targeted this Coordinate ${setAssUpperCase}`, this.maxGuesses--) : false

        /* @ setting confirm hit @ */
        isAConfirmHit ? this.displayShips(setAssUpperCase, "url('../Assets/images/ship.png')", playShipDestroyed()) :
            this.displayShips(setAssUpperCase, "url('../Assets/images/miss.png')", playWrongAnsers())
    }

    // verifying user guess
    isPlayerGuessCorrect = (guess, answers) => answers.includes(guess) ? true : false;

    // show ships and miss errors
    displayShips(locations, bgUrl) {
        let elem = ControllerClass.getElemId(locations)
        elem.style.backgroundImage = bgUrl
        this.targetedShips.push(locations)
    }

}



// when windows load    
window.onload = (event) => {
    let controllerObject = new ControllerClass()
    let form = ControllerClass.getElemId('myForm')

    setDefaultConfigurations()

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let UserInput = ControllerClass.getElemId('inpt').value.trim()
        isInputValid(UserInput) ? controllerObject.startGame(UserInput) : alert('Please Enter a Target!')
        // empty search bar
        ControllerClass.getElemId('inpt').value = " "
    })

}