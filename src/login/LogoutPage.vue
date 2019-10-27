<script>
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default {
    name: 'LogoutPage',
    beforeCreate () {
        // https://vuejs.org/v2/api/#created
        // "Called synchronously after the instance is created. 
        // At this stage, the instance has finished processing the options"
        this.$store.dispatch('authentication/logout');
        this.$router.push('/login');

    },
};
</script>