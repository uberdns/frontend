<template>
    <div id="records">
        <h1>Manage Records</h1>
        <div>
          <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="record-table"></b-pagination>
          <b-table id="record-table" striped hover :items="profile.records" :per-page="perPage" :current-page="currentPage" :fields="fields"></b-table>
        </div>
    </div>
</template>

<script>
export default {
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
              vm.rows = data.records.length;
              vm.profile = data
              });
            });
        }
    },
    computed: {
        user () {
            return this.$store.state.authentication.user;
        },
        users () {
            return this.$store.state.users.all;
        }
    },
    data() {
        return {
            profile: [],
            fields: ['name', 'ip', 'created_on', 'domain_id'],
            perPage: 25,
            rows: 1,
            currentPage: 1
        }
        
    },

};
</script>