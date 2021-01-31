import config from  "./sourdough-config";


export default class Sourdough {
    constructor() {
        this.computationType = config.computationType;
        this.usingVWG = config.usingVWG;
        this.levainHydration = config.levainHydration;
        this.hidden = config.hidden;
    }

    get pflour() {
        this.hidden.pflour = 100 * this.flour / this.totalFlour;
        return Math.round(this.hidden.pflour * 10) / 10;
    }

    set pflour(val) {
        this.hidden.pflour = val;
    }

    get pwater() {
        this.hidden.pwater = this.water / this.totalFlour * 100;
        return Math.round(this.hidden.pwater * 10) / 10;
    }

    set pwater(val) {
        this.hidden.pwater = val;
    }

    get pvwg() {
        this.hidden.pvwg = 100 * this.vwg / this.totalFlour;
        return Math.round(this.hidden.pvwg * 10) / 10;
    }

    set pvwg(val) {
        this.hidden.pvwg = val;
    }

    get psalt() {
        if (this.isWeights) {
            this.hidden.psalt = this.salt / this.totalFlour * 100;
        }
        if(isNaN(this.hidden.psalt)) return 0;
        return Math.round(this.hidden.psalt * 10) / 10;
    }

    set psalt(val) {
        this.hidden.psalt = val;
    }

    get pstarter() {
        if (this.isWeights) {
            this.hidden.pstarter = this.starter / this.totalFlour * 100;
        }
        if(isNaN(this.hidden.pstarter)) return 0;
        return Math.round(this.hidden.pstarter * 10) / 10;
    }

    set pstarter(val) {
        this.hidden.pstarter = val;
    }

    get flour() {
        if (this.usingVWG) {
            return Math.round(this.hidden.flour);
        }
        if (this.isPercents) {
            this.hidden.flour = this.totalFlour - this.levainFlour;
        }
        return Math.round(this.hidden.flour);
    }

    set flour(val) {
        this.hidden.flour = val;
    }

    get water() {
        if (this.isPercents) {
            this.hidden.water = this.totalWater - this.levainWater;
        } else {
            // this.hidden.water = parseInt(parseFloat((this.hydration * this.totalWeight) / (1 + this.hydration)).toFixed(0));
        }
        return Math.round(this.hidden.water);
    }

    set water(val) {
        this.hidden.water = val;
    }

    get vwg() {
        return Math.round(this.hidden.vwg);
    }

    set vwg(val) {
        this.hidden.vwg = val;
    }

    get salt() {
        if (this.isPercents) {
            this.hidden.salt = this.psalt / 100 * this.totalFlour;
        }
        return Math.round(this.hidden.salt);
    }

    set salt(val) {
        this.hidden.salt = val;
    }

    get totalWeight() {
        if (this.isWeights) {
            this.hidden.totalWeight = this.totalFlour + this.totalWater + parseInt(this.salt);
        }
        if(isNaN(this.hidden.totalWeight)) return 0;
        return Math.round(this.hidden.totalWeight);
    }

    set totalWeight(val) {
        this.hidden.totalWeight = parseInt(val);
    }

    get starter() {
        if (this.isPercents) {
            this.hidden.starter = this.pstarter / 100 * this.totalFlour;
        }
        return Math.round(this.hidden.starter);
    }

    set starter(val) {
        this.hidden.starter = val;
    }

    get useVWG() {
        return this.usingVWG;
    }

    set useVWG(val) {
        this.usingVWG = val;
        if (this.usingVWG === true) {
            const vwg = this.VWG.vwgGrams(this.totalFlour);
            this.flour = this.flour - vwg;
            this.vwg = vwg;
        } else {
            this.flour = this.hidden.flour + this.hidden.vwg;
            this.pflour = 100;
            this.vwg = 0;
            this.pvwg = 0;
        }
    }


    get levainFlour() {
        if (this.starter === 0) return 0;
        return ((this.starter * 100) / (100 + this.levainHydration));
    }

    get levainWater() {
        return this.hidden.starter - this.levainFlour;
    }

    get totalFlour() {
        if (this.isWeights) {
            return parseInt(this.hidden.flour) + parseInt(this.hidden.vwg) + parseInt(this.levainFlour);
        }
        return parseInt(parseFloat(this.totalWeight * 100 / (100 + (this.hydration))));
    }

    get totalWater() {
        if (this.isPercents) {
            return Math.round(this.hydration / (100 + this.hydration) * this.totalWeight);
        }
        return parseInt(this.hidden.water) + parseInt(this.levainWater);
    }

    get hydration() {
        if (this.isWeights) {
            this.hidden.hydration = parseFloat(parseInt(this.totalWater) / parseInt(this.totalFlour) * 100);
        }
        if(isNaN(this.hidden.hydration)) return 0;
        return Math.round(this.hidden.hydration * 10) / 10;
    }

    set hydration(val) {
        this.hidden.hydration = parseFloat(val);
    }

    get isPercents() {
        return this.computationType === 'percents';
    }

    get isWeights() {
        return this.computationType === 'weights';
    }

    get percentsInputClass() {
        return {
            'w-16': true,
            'text-right': true,
            'px-2': true,
            'bg-opacity-25': this.isWeights,
            'bg-white': true,
        }
    }

    get weightsInputClass() {
        return {
            'w-16': true,
            'text-right': true,
            'px-2': true,
            'bg-opacity-25': this.isPercents,
            'bg-white': true,
        }
    }

    get dump() {
        return JSON.stringify([this.VWG, this.totalFlour, this.levainFlour]);
    }

    get tabWeights() {
        if (this.isWeights) {
            return 0
        }
        return -1;
    }

    get tabPercents() {
        if (this.isPercents) {
            return 0
        }
        return -1;
    }

    get VWG() {
        return {
            targetPercentProtein: 12.5,
            flourPercentProtein: 10,
            vitalGlutenPercentProtein: 76.6,
            get partsVWG() {
                return this.targetPercentProtein - this.flourPercentProtein;
            },
            get partsFlour() {
                return this.vitalGlutenPercentProtein - this.targetPercentProtein;
            },

            get totalParts() {
                return this.partsVWG + this.partsFlour;
            },

            get percentFlour() {
                return this.partsFlour / this.totalParts;
            },

            get percentVWG() {
                return this.partsVWG / this.totalParts;
            },

            vwgGrams(totalWeight) {
                return Math.round(this.percentVWG * totalWeight)
            },
        }
    }



}