
export default class ModelClass {
    // class attributes
    globalGeneratedCoordinates;
    shipCoordinates = []
    targetedShips = []
    maxGuesses = 0;
    prefixCoordinates = []



    // generate ids 
    generatCoordinates() {
        let finalGeneratedCoordinates = []
        this.prefixCoordinates.map(prefix => {
            for (let suffix = 0; suffix < this.prefixCoordinates.length; suffix++) {
                finalGeneratedCoordinates.push(`${prefix}${suffix}`.toUpperCase())
            }
        })
        return this.globalGeneratedCoordinates = finalGeneratedCoordinates;
    }

}