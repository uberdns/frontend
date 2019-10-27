<template>
    <div id="app">
        <Navbar></Navbar>
        <div class="jumbotron">
            <div class="container">
                <div class="row">
                    <div class="col-sm-6 offset-sm-3">

                        <div v-if="alert.message" :class="`alert ${alert.type}`">{{alert.message}}</div>
                        <router-view></router-view>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from './Navbar'
export default {
    components: {
        'Navbar': Navbar
    },
    name: 'app',
    computed: {
        alert () {
            return this.$store.state.alert
        }
    },
    watch:{
        $route (to, from){
            // clear alert on location change
            this.$store.dispatch('alert/clear');
        }
    } 
};
</script>
