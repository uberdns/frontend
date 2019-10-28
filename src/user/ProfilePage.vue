<template>
  <div>
    <div id="Profile">
    <h1>Welcome, {{profile.name}}</h1>
      <div id="records">
        <b-pagination
          v-model="currentRecordPage"
          :total-rows="records.length"
          :per-page="maxRecordPerPage"
          aria-controls="record-table"
        ></b-pagination>
        <b-table 
          striped 
          hover
          id="record-table"
          :items="records" 
          :fields="fields"
          :per-page="maxRecordPerPage"
          :current-page="currentRecordPage"
        ></b-table>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
      name: 'UserProfile',

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
              vm.records = data.records
              vm.profile = data
              });
            });
        }
      },

      data() {
        return { 
          currentRecordPage: 1,
          maxRecordPerPage: 5,
          profile: [],
          records: [],
          fields: ['name', 'ip', 'created_on'],
        }
      },
  }
</script>