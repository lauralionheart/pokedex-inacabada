import { createRouter,createWebHistory } from "vue-router";
import Home from '../pages/Home.vue';
import Details from '../pages/Details.vue';


//Creamos las rutas

const routes = [

    {path: '/',
     component: Home,   
    },

    {path: '/details/:id',    //parametro dinamico id
    component: Details,   
    },
]

//Ahora hay que crear el router

const router = createRouter({

    history:createWebHistory(),
    routes,

})

export default router