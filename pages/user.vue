<template>
    <div class="admin-login">
        
      <v-container fluid>
        <v-row justify="center">
          <v-col cols="12" sm="8" md="6">
            <v-card class="elevation-12 transparent-card">
              <v-card-title class="headline text-center">Admin Login</v-card-title>
              <v-card-text>
                <v-form @submit.prevent="login">
                  <v-text-field
                    v-model="username"
                    label="Username"
                    required
                    outlined
                  ></v-text-field>
                  <v-text-field
                    v-model="password"
                    label="Password"
                    type="password"
                    required
                    outlined
                  ></v-text-field>
                  <v-btn color="primary" class="login-button" @click="login">Login</v-btn>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </template>

  <script>
  export default{
    data(){
        return{

        }
    }
  }
</script>
<style scoped>
.admin-login {
  background-image: url('@/components/images/login.jpg');
  background-size: cover;
  background-position: center;
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.transparent-card {
    position: relative;
    top:-100px;
    left: 70px;
    width: 400px;
  background-color: rgba(55, 62, 57, 0.7); /* Set the card background color with opacity */
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
 align-items: center;
}

.headline {
  text-align: center;
}
.login-button{
 
  width: 100%;
}
</style>