<template>
    <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand href="#">UberDNS</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
            <b-nav-item-dropdown text="Domains" right>
              <b-dropdown-item href="#">Create</b-dropdown-item>
              <b-dropdown-item href="#">Manage</b-dropdown-item>
            </b-nav-item-dropdown>
            <b-nav-item-dropdown text="Records" right>
              <b-dropdown-item href="#">Create</b-dropdown-item>
              <b-dropdown-item href="#">Manage</b-dropdown-item>
            </b-nav-item-dropdown>
            <!--<b-nav-item href="#" disabled>Disabled</b-nav-item>-->
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
            <!--<b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
            </b-nav-form>-->

            <!--<b-nav-item-dropdown text="Lang" right>
            <b-dropdown-item href="#">EN</b-dropdown-item>
            <b-dropdown-item href="#">ES</b-dropdown-item>
            <b-dropdown-item href="#">RU</b-dropdown-item>
            <b-dropdown-item href="#">FA</b-dropdown-item>
            </b-nav-item-dropdown>-->

            <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
                <em>{{ profile.name }}</em>
            </template>
            <b-dropdown-item href="/profile">Profile</b-dropdown-item>
            <b-dropdown-item href="/logout">Logout</b-dropdown-item>
            </b-nav-item-dropdown>
        </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script>
export default {
    name: 'navbar',
    computed: {
        alert () {
            return this.$store.state.alert
        }
    },
    mounted () {
        this.getProfile()
    },
    methods: {
        getProfile() {
          var vm = this
          const requestOptions = {
            method: 'GET',
            headers: { 
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + window.$cookies.get('token')
            },
          };
          
          fetch('http://127.0.0.1:8081/user/profile', requestOptions)
            .then(response => { 
              return response.text().then(text => {
                const data = text && JSON.parse(text);
                if (!response.ok) {
                  if (response.status === 401) {
                    // auto logout if 401 response returned from api
                    logout();
                    location.reload(true);
                  }

                  const error = (data && data.message) || response.statusText;
                  return Promise.reject(error);
                }
              //debugger;
              vm.profile = data
              });
            });
        }
    },
    data() {
        return { 
          currentRecordPage: 1,
          maxRecordPerPage: 5,
          username: '',
          profile: [],
          records: [],
          fields: ['name', 'ip', 'created_on'],
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