<template>
    <div>
      <v-list three-line class="pa-6" v-if="getmembershipreq">
        <v-list-item v-for="(item, index) in getmembershipreq" :key="item.phoneNumber">
          <v-list-item-avatar>
            <!-- <v-img src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"></v-img> -->
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-text="item.ame"></v-list-item-title>
            <v-list-item-subtitle v-text="item.wardNumber"></v-list-item-subtitle>
          </v-list-item-content>
          <v-btn color="secondary" @click="getCancelMembershipData(item)">Cancel</v-btn>
          <v-btn color="secondary" @click="getSelectedData(item)">View</v-btn>
        </v-list-item>
        <v-divider :key="index" :inset="true"></v-divider>
      </v-list>
    </div>
  </template>
  
  

  <script>
  import axios from 'axios';
  export default {
    data() {
      return {
        memberStatus: 0, 
        getmembershipreq: [],
      };
    },
    methods: {
      async getMemberShip() {
        try {
          const response = await axios.get(`${process.env.apiUrl}dp/get_all_valid_delivery_persons`);
          console.log(response);
          this.getmembershipreq = response.data; 
        } catch (error) {
          console.error("Error fetching membership requests", error);
        }
      },
      getCancelMembershipData(item) {
        localStorage.setItem('selectedMembershipData', JSON.stringify(item));
      },
      getSelectedData(item) {
        localStorage.setItem('selectedMembershipData', JSON.stringify(item));
      },
    },
    mounted() {
      this.getMemberShip();
    },
  };
  </script>



