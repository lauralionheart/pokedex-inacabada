<script setup>
import { computed } from 'vue';


//definimos la propiedad que el elemento padre nos pasa
const props = defineProps({
    stats:Array
})

//apexchart para hacer graficos, editamos las opciones y series como nos convenga
const options = {
        chart: {
          id: 'vuechart-example'
        },
        xaxis: {
           
          categories: ["PV", "Ataque", "Defensa", "Ataque ES", "Defensa ES", "Velocidad"],
          labels:{
            rotate:0,
          }, 
        }
      }
const series = computed(()=>{
    return[{
        name:'Estadistica',
        data:props.stats
    }]
})      
</script>

<template>
    <div>
        <apexchart width="500" type="radar" :options="options" :series="series"></apexchart>
    </div>
</template>