 import {ControllerClass as Controller}  from '../Controllers/controller.js'


 export class ViewClass{

    // generate divs
    static generateDivElements(numOfDivs) {
        let div = Controller.getElemId('grid')
        for (let id = 0; id < numOfDivs; id++) {
            let childDiv = document.createElement('div')
            div.appendChild(childDiv)
        }
    }

    

}
