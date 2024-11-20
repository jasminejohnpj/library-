<template>
    <div >
     
      <v-dialog
        v-model="dialog"
        persistent
        max-width="290"
      >
        <v-card>
          <v-card-title class="text-h5">
            Confirm Logout
          </v-card-title>
          <v-card-text>Are you sure you want to logout?</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="green darken-1"
              text
              @click="dialog = false"
            >
              No
            </v-btn>
            <v-btn
              color="red darken-1"
              text
              @click="logout"
            >
              Yes
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
         <v-toolbar  flat>
       
        <v-app-bar flat color="rgba(0,0,0,0)" class="ml-16">
          <v-spacer></v-spacer><h3>വിജ്ഞാന നഗരം - വായനശാല വാതിൽപ്പടിയിൽ</h3>
         
        </v-app-bar>
        <v-spacer></v-spacer>
        
        <v-btn color="red lighten-1" dark @click="dialog = true"> <v-icon>mdi-logout</v-icon>
                Logout
        </v-btn>
   
      </v-toolbar>
      <v-divider></v-divider>
    </div>
  </template>
  
  <script>
  export default {
    data(){
      return{
        dialog:false,
      };
    },
  methods:{
    logout(){
      localStorage.removeItem('userName')
      this.dialog=false;
      console.log(store.state.loginAuth);
      this.$router.push("/");
    }
  },
  }
  </script>
  
  <style>
  
  </style>