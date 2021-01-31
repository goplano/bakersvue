<template>
  <article class="md:shadow-lg p-2">
    <div id="wrap" class="flex  justify-center md:flex-row flex-wrap">
      <section class="bg-blue-100 md:w-48 text-center p-4 rounded-full shadow-xl m-7 mx-auto">
        <h1 class="underline text-sm uppercase text-gray-400">Totals</h1>
        <div class="mt-2 mb-3">
          <div class="text-sm text-gray-400">weight</div>
          <div>{{ formatWeight(sd.totalWeight) }}</div>
        </div>
        <div class="mt-1 mb-2">
          <div class="text-sm text-gray-400">water</div>
          <div>{{ formatWeight(sd.totalWater) }}</div>
        </div>
        <div class="mt-1 mb-2">
          <div class="text-sm text-gray-400">flour</div>
          <div>{{ formatWeight(sd.totalFlour) }}</div>
        </div>
        <div class="mt-1 mb-2">
          <div class="text-sm text-gray-400">hydration</div>
          <div>{{ formatPercent(sd.hydration) }}</div>
        </div>
      </section>
      <section class="bg-green-100 md:w-48 text-center p-4 rounded-full shadow-xl m-7 mx-auto">
        <h1 class="underline  text-sm uppercase text-gray-400">Parts</h1>
        <div class="mt-2 mb-3">
          <div class="text-sm text-gray-400">flour</div>
          <div>{{ formatWeight(sd.flour) }}</div>
        </div>
        <div v-if="sd.usingVWG" class="mt-2 mb-3">
          <div class="text-sm text-gray-400">vwg</div>
          <div>{{ formatWeight(sd.vwg) }}</div>
        </div>
        <div class="mt-1 mb-2">
          <div class="text-sm text-gray-400">water</div>
          <div>{{ formatWeight(sd.water) }}</div>
        </div>
        <div class="mt-1 mb-2">
          <div class="text-sm text-gray-400">salt</div>
          <div>{{ formatWeight(sd.salt) }}</div>
        </div>
        <div class="mt-1 mb-2">
          <div class="text-sm text-gray-400">starter</div>
          <div>{{ formatWeight(sd.starter) }}</div>
        </div>
      </section>
      <section id="inputs" class="bg-pink-50 md:w-48 text-center p-4 rounded-full shadow-xl m-7 mx-auto">
        <h1 class="underline  text-sm uppercase text-gray-400">Input</h1>

        <div class="flex overflow-hidden  px-4 mt-2 mb-3 justify-around">
          <input type="radio" id="btnWeights" value="weights" v-model="sd.computationType"
                 class="sr-only">
          <label for="btnWeights"
                 class="cursor-pointer py-2 px-4 -mr-px text-center leading-none text-sm text-gray-400 text-opacity-75 bg-gray-300 border shadow-inner rounded-full">g</label>
          <input type="radio" id="btnPercents" value="percents" v-model="sd.computationType"
                 class="sr-only">
          <label for="btnPercents"
                 class="cursor-pointer py-2 px-4 -mr-px text-center leading-none text-sm text-gray-400 text-opacity-75 bg-gray-300 border shadow-inner rounded-full">%</label>
        </div>
        <div v-show="sd.isWeights">
          <div class="mt-2 mb-3">
            <input-field v-model="sd.flour">flour</input-field>
          </div>
          <div class="mt-1 mb-2">
            <input-field v-model="sd.water">water</input-field>
          </div>
          <div class="mt-1 mb-2">
            <input-field v-model="sd.salt">salt</input-field>
          </div>
          <div class="mt-1 mb-2">
            <input-field v-model="sd.starter">starter</input-field>
          </div>
        </div>

        <div v-show="sd.isPercents">
          <div class="mt-2 mb-3">
            <input-field v-model="sd.totalWeight">weight</input-field>
          </div>
          <div class="mt-1 mb-2">
            <input-field v-model="hydration">hydration</input-field>
          </div>
          <div class="mt-1 mb-2">
            <input-field v-model="psalt">% salt</input-field>
          </div>
          <div class="mt-1 mb-2">
            <input-field v-model="pstarter">% starter</input-field>
          </div>
        </div>

      </section>
      <div id="vwg-switch" class="flex items-center mx-auto my-4 ">
        <input id="btnUseVitalWheatGluten" class="toggle" type="checkbox" v-model="sd.useVWG">
        <label for="btnUseVitalWheatGluten" title="Vital wheat gluten adds protein and a little more structure."
               class="px-2 border-0 shadow-none">Use Vital Wheat Gluten</label>
      </div>
    </div>
    <details>
      <summary>
        <h1 class="inline-block">Instructions</h1>
      </summary>
      <ol class="list-decimal list-outside pl-12 text-sm">
        <li>assemble parts - starter (or levain) should be at peak after the autolyse phase.</li>
        <li>autolyse: mix {{ sd.flour }}g flour and {{ sd.water }}g water <span v-if="sd.useVWG"> and {{ sd.vwg }} g vital wheat gluten</span>
          - rest 1-3 hours
        </li>
        <li>bulk ferment: mix in {{ sd.starter }}g starter - rest 30-45 minutes
          <p>bulk ferment should be around 6 hours and starts when you mix in the starter</p>
        </li>
        <li>mix in {{ sd.salt }}g salt - rest 30-45 minutes</li>
        <li>stretch and fold 1 - rest 30-45 minutes</li>
        <li>stretch and fold 2 - rest 30-45 minutes</li>
        <li>stretch and fold 3</li>
        <li>bulk fermentation - 3 - 3.5 hours</li>
        <li>pre-shape - reset 20-30 minutes</li>
        <li>final shape + secure bottom seam</li>
        <li>proof for 30 minutes</li>
        <li>retard in fridge - 16 hours</li>
        <li>pre-heat oven to 500</li>
        <li>bake lid on 25 minutes</li>
        <li>remove lid bake for 25 more minutes @450</li>
        <li>torture phase: let cool for at least 3 hours</li>
      </ol>
    </details>

  </article>
</template>

<script>
// import WeightsForm from "@/components/WeightsForm";
import Sourdough from "@/Sourdough";
import InputField from "@/components/InputField";

const sd = new Sourdough();
export default {
  name: "Sourdough",
  data() {
    return {
      sd: sd,
      pstarter: this.pstarter,
      psalt: this.psalt,
      hydration: this.hydration
    }
  },
  components: {InputField},
  mounted() {
    window.addEventListener('onbeforeprint', this.openInstructions);
    var mediaQueryList = window.matchMedia('print');
    mediaQueryList.addListener((mql) => {
      if (mql.matches) {
        this.openInstructions();
      }
    });
  },

  unmounted() {
    window.removeEventListener('onbeforeprint', this.openInstructions);
  },
  methods: {
    formatPercent(num) {
      return new Intl.NumberFormat("en-US", {
        maximumFractionDigits: 1,
        style: "percent"
      }).format(num);
    },
    formatWeight(num) {
      return new Intl.NumberFormat("en-US", {
        maximumFractionDigits: 1,
      }).format(num) + 'g';
    },
    openInstructions() {
      document.querySelectorAll('details').forEach((elem) => {
        elem.setAttribute("open", "open");
      });
    },
    computed() {
      return {
        psalt: {
          get: function () {
            return (parseInt(this.sd.psalt * 100) / 100);
          },
          set: function (value) {
            this.sd.psalt = value;
          }
        },
        pstarter: {
          get: function () {
            return (parseInt(this.sd.pstarter * 10) / 10);
          },
          set: function (value) {
            this.sd.pstarter = value;
          }
        },
        hydration: {
          get: function () {
            return (parseInt(this.sd.hydration * 10) / 10);
          },
          set: function (value) {
            this.sd.hydration = value;
          }
        },
      }
    },
  }
}
</script>

<style scoped>
input[type=radio]:checked + label {
  background-color: rgba(209, 250, 229, 1);
  box-shadow: none;
  color: black;
}

input[type=radio] + label {
  background-color: rgba(249, 250, 251, 1);
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3), 0 1px rgba(255, 255, 255, 0.1);
  transition: all 0.1s ease-in-out;
}

@screen print {
  section {
    @apply shadow-none;
  }

  #vwg-switch, #inputs {
    display: none;
  }

  #wrap {
    flex-direction: row-reverse;
  }
}

</style>