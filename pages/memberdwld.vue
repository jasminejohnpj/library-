<template>
    <div>
      <v-app>
       <v-app-bar app color="indigo" dark>
          <v-app-bar-title class="ml-4">
            Member Management System - Member Details Download
          </v-app-bar-title>
        </v-app-bar>
  
        <!-- Search Form -->
        <form @submit.prevent="searchdata">
          <v-select
            v-model="selectedSearchField"
            :items="searchFields"
            label="Search by"
          ></v-select>
          <v-text-field
            class="pt-6 px-6"
            label="Search Member"
            append-icon="mdi-window-close"
            append-outer-icon="mdi-magnify"
            outlined
            v-model="search"
          ></v-text-field>
          <v-btn type="submit" icon>
            <v-icon>mdi-search</v-icon>
          </v-btn>
        </form>
  
        <!-- Member List -->
        <v-list three-line class="pa-6" v-if="getmembershipreq">
          <v-list-item v-for="(item, index) in getmembershipreq" :key="item.phoneNumber">
            <v-list-item-avatar>
            </v-list-item-avatar>
  
            <v-list-item-content>
              <v-list-item-title v-text="item.firstName"></v-list-item-title>
              <v-list-item-subtitle v-text="item.cardNumber"></v-list-item-subtitle>
            </v-list-item-content>
  
            <v-list-item-action>
              <v-row>
              <v-btn @click = "searchhistory()">Previous Books</v-btn>
              <v-btn @click="downloadMemberDetails(item.firstName, item.cardNumber, selectedSearchField)" icon>
                <v-icon>mdi-download</v-icon>
              </v-btn>
            </v-row>
            </v-list-item-action>
          </v-list-item>
  
          <v-divider :key="index" :inset="true"></v-divider>
        </v-list>
  
        <!-- Snackbar for No Results -->
        <v-snackbar v-model="snackbar" :timeout="3000" color="error">
          No members found for the given search criteria.
        </v-snackbar>
      </v-app>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        search: '',
        selectedSearchField: 'firstName',
        searchFields: [
          { text: 'Name', value: 'firstName' },
          { text: 'Card Number', value: 'cardNumber' },
        ],
        getmembershipreq: [],
        selectedUser: {
          cardNumber:""
        },
        snackbar: false,
      };
    },
    methods: {      
      async searchdata() {
        try {
          const response = await axios.post(`${process.env.apiUrl}admin/search_users`, {
            text: this.search,
            searchBy: this.selectedSearchField,
          });
          console.log(response);
          if (response.status === 200) {
            this.getmembershipreq = response.data.data;
            if (this.getmembershipreq.length === 0) {
              this.showSnackbar();
            }
            if (typeof localStorage !== 'undefined') {
              localStorage.setItem('searchResults', JSON.stringify(this.getmembershipreq));
            } else {
              console.warn('localStorage is not available. Unable to save search results.');
            }
          }
        } catch (error) {
          console.error('Error searching users:', error);
          alert(error.message);
        }
      },
      async downloadMemberDetails(value, cardNumber, field) {
  try {
    const downloadResponse = await axios.get(`${process.env.apiUrl}admin/exportUsersToExcel`, {
      params: {
        field: field,
        value: value,
        cardNumber: cardNumber,
      },
      responseType: 'arraybuffer',
    });

    if (downloadResponse.status === 200) {
      const blob = new Blob([downloadResponse.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      
      link.download = `member_details_${value}_${cardNumber}.xlsx`;
      
      link.click();
      window.URL.revokeObjectURL(link.href);
    } else {
      console.error('Failed to download member details. Status:', downloadResponse.status);
    }
  } catch (error) {
    console.error('Error downloading member details:', error);
    alert(error.message);
  }
},
showSnackbar() {
  this.snackbar = true;
},
async searchhistory(){
        try{
          const response = await axios.get(`${process.env.apiUrl}user/past_read_books/${this.selectedUser.cardNumber}`);
            if (response.status === 200)
        {
          
          console.log(response);
          this.historyData = true;
        }
      }
      catch (error) {
        console.error('Error fetching history:', error);
  }
}

    },
  };
  </script>