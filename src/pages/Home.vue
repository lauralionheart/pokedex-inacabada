
<script setup>
    import {reactive,toRefs} from 'vue'

    const state = reactive({

        pokemons:[]



    })

    //Queremos utilizar la propiedad pokemons sin que se pierda la reactividad (toRefs)
    const {pokemons} = toRefs(state);
    //Conectamos con la API de la pokeapi
try {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
    .then((res)=>res.json())
    .then((data)=>{

        console.log(data)
        data.results.forEach((element, index) => {
            const pokemon = {
                ...element,
                index:index + 1
            }
            state.pokemons.push(pokemon)

        });
    })
    
} catch (error) { console.log(error);
    
}
   

</script>





<template>

    <div>
        <h1>Home</h1>
        
        <ul>
            <li v-for="pokemon in pokemons" :key="pokemon.index"
            class ="p-2 rounded hover:text-red-400 hover:bg-red-100"
            >
                <router-link :to="`/details/${pokemon.index}`">{{ pokemon.name }}</router-link>
                #{{ pokemon.index }}
            </li>
        </ul>

    </div>


</template>

