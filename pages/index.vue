<template>
  <div class="admin-login">
      
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="12" sm="8" md="6">
          <v-card class="elevation-12 transparent-card">
            <v-card-title class="headline text-center">Admin Login</v-card-title>
            <v-card-text>
              <v-form @submit.prevent="login">
                <v-text-field class="username"
                  v-model="username"
                  label="Username"
                  required
                  outlined
                ></v-text-field>
                <v-text-field class="password"
                  v-model="password"
                  label="Password"
                  type="password"
                  required
                  outlined
                ></v-text-field>
                <v-btn class="login-button" @click="login">Login</v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  layout: 'login',
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post(`${process.env.apiUrl}admin/login`, {
          userName: this.username,
          password: this.password
        });

        console.log(response.data);
        localStorage.setItem('userName',this.username)
        this.$router.push("/dashboard");
      } catch (error) {
        console.error("Error login", error);
      }
    }
  }
}
</script>


<style scoped>
.admin-login {
  background-image: url('@/components/images/login.jpg');
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.transparent-card {
  position: relative;
  left: 35vw;
  bottom: 10vh;
  width: 400px;
  background-color: rgba(102, 103, 108, 0.7);
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.headline {
  text-align: center;
}

.login-button {
  width: 100%;
  color: white;
  background-color: rgb(28, 71, 155) !important;
}

.username {
  color: rgb(28, 71, 155); /* Change the color for the username label */
}

.password {
  color: rgb(28, 71, 155); /* Change the color for the password label */
}
</style>
