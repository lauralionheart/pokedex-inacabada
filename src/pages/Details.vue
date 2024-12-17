
<script setup>
    import{useRoute} from 'vue-router'
    import{reactive,toRefs,computed,ref,onMounted,watch} from 'vue'
    import BarChart from '../components/BarChart.vue';
    import RadarChart from '../components/RadarChart.vue';

    const route = useRoute(); //para poder capturar el id que pasamos en los parametros
    const pokemonId = route.params.id; //obtenemos el parametro reactivo de la ruta 
    const state = reactive({

        pokemon: null,
        stats:computed(()=>filterStats()), //stats dependera de una funcion
        types:computed(()=>filterType()),
    })

    function filterStats(){
        if(state.pokemon){
            return state.pokemon.stats.map((stat)=> stat.base_stat)
        }
    }
    function filterType(){
        if(state.pokemon){
            return state.pokemon.types.map((type)=> type.type.name)
        }
    }

    const {pokemon,stats,types} = toRefs(state)

    const getData = async() => {
        await fetch(`https://pokeapi.co/api/v2/pokemon/${route.params.id}`)
        .then((res)=>res.json())
        .then((data)=>{
        console.log(data)
        state.pokemon = data;      //Ponemos el fetch en una funcion asincrona para poder llamarla cuando queramos
    })
    }

    watch(route,()=>{     //watch va a vigilar la variable route, que es dinamica, cuando cambie route entonces se ejecuta getData()
        getData()
    })

    onMounted(()=>{        //onMounted para que se ejecute lo de dentro cuando se cargue el componente
        getData();
    })

    


    

    const isBar = ref(true);
    const buttonBar = ()=>{

        isBar.value = !isBar.value

    }


</script>


<template>

    <div>
        
        <div v-if="pokemon">
            <div class="w-4/6 mx-auto rounded-xl p-10 shadow-lg">
                <h1 class="font-black md:text-3xl text-xl text-red-900 mb-2">{{ pokemon.name }}</h1>
                <span v-for="type in types" class="py-1 px-2 shadow-md rounded-full bg-red-500 text-white font-semibold mr-2">
                    {{ type }}
                </span>
                <div class="flex flex-wrap">
                    <div class="flex-1 grid place-items-center">
                        <img class="w-48 h-48" :src="pokemon.sprites.front_default" :alt="`imagen de ${pokemon.name}`">
                    </div>
                    <div class="flex-1">
                        <button class="shadow-md px-2 py-1 bg-blue-300 font-semibold text-white" @click="buttonBar()">{{ isBar?'Radar':'Bar'}}</button>
                        <!-- <bar-chart :stats="stats"/> -->
                         <component
                         :is="isBar ? BarChart:RadarChart"
                         :stats="stats"
                         ></component>
                        
                    </div>
                </div>
                
                
                
                
            </div>

        </div>
        <div v-else>
            <p>No hay informacion</p>
        </div>
        

    </div>

</template>