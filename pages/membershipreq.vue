<template>
    <div>
      <v-card-title class="headline">Membership Request </v-card-title>
      <v-list three-line class="pa-6" v-if="getmembershipreq">
        <v-list-item v-for="(item, index) in getmembershipreq" :key="item.phoneNumber">
          <v-list-item-avatar>
            <!-- <v-img src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"></v-img> -->
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-text="item.firstName"></v-list-item-title>
            <v-list-item-subtitle v-text="item.wardNumber"></v-list-item-subtitle>
          </v-list-item-content>
          <v-btn color="#27374D" @click="getCancelMembershipData(item)">Reject</v-btn>
          &nbsp;&nbsp;
          <v-btn color="#27374D" @click="getSelectedData(item)">View</v-btn>
        </v-list-item>
        <v-divider :key="index" :inset="true"></v-divider>
      </v-list>
      <v-dialog v-model="bookDetailsDialog" max-width="800px" >
        <v-card>
          <v-card-title>Member Details</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-card>
                  <v-card-text>
                    <v-row>
                      <v-col cols="12" sm="6">
                      <v-text-field v-model="selectedUser.firstName" label="First Name"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                      <v-text-field v-model="selectedUser.lastName" label="Last Name"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                    <v-text-field v-model="selectedUser.email" label="Email"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                    <v-text-field v-model="selectedUser.cardNumber" label="Card Number"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                    <v-text-field v-model="selectedUser.category" label="Category"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                    <v-text-field v-model="selectedUser.phoneNumber" label="Phone Number"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                    <v-text-field v-model="selectedUser.gender" label="Gender"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                    <v-text-field v-model="selectedUser.dob" label="Date of Birth"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                    <v-text-field v-model="selectedUser.age" label="Age"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                    <v-text-field v-model="selectedUser.houseName" label="House Name"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                    <v-text-field v-model="selectedUser.wardName" label="Ward Name"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                    <v-text-field v-model="selectedUser.wardcouncillor" label="Ward Councillor"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                    <v-text-field v-model="selectedUser.wardNumber" label="Ward Number"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                    <v-text-field v-model="selectedUser.postOffice" label="Post Office"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                    <v-text-field v-model="selectedUser.district" label="District"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                    <v-text-field v-model="selectedUser.pincode" label="Pincode"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                    <v-text-field v-model="selectedUser.dateEnrolled" label="Date Enrolled"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                    <v-text-field v-model="selectedUser.expiryDate" label="Expiry Date"></v-text-field>
                    </v-col>
                    <v-col cols="12" >
                    <v-text-field v-model="selectedUser.receiptnodate" label="Receipt No & Date"></v-text-field>
                    </v-col>
                   
                  </v-row>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="AcceptUser">Accept</v-btn>
            <v-btn color="primary" @click="CloseDialog">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  
    </div>
  </template>
  

  <script>
  import axios from 'axios';
  export default {
    data() {
      return {
        bookDetailsDialog:false,
        memberStatus: 0,
        getmembershipreq: [],
        selectedUser:{}
      };
    },
    methods: {
      async getMemberShip() {
  try {
    const response = await axios.get(`${process.env.apiUrl}user/get_membership_requests`);
    console.log(response);   
    this.saveMembershipRequestsToLocalStorage(response.data);
  } catch (error) {
    console.error("Error fetching membership requests", error);
  }
},

saveMembershipRequestsToLocalStorage(data) {
  localStorage.setItem('membershipRequests', JSON.stringify(data));
  this.getmembershipreq = data;
},

loadMembershipRequestsFromLocalStorage() {
  const savedMembershipRequests = localStorage.getItem('membershipRequests');
  if (savedMembershipRequests) {
    this.getmembershipreq = JSON.parse(savedMembershipRequests);
  }
},
      async getCancelMembershipData(item) {
    const phoneNumber = item.phoneNumber; 

    localStorage.setItem('selectedMembershipData', JSON.stringify(item));
    
    try {
      const response = await axios.get(`${process.env.apiUrl}user/reject_membership_request/${phoneNumber}`);
      
      if (response.status === 200) {
        const storedData = JSON.parse(localStorage.getItem('tableData')) || [];
        const updatedData = storedData.filter(request => request.id !== item.id); 
        localStorage.setItem('tableData', JSON.stringify(updatedData));
        this.getMemberShip();
      } else {
        console.error('Error deleting membership request. Unexpected status:', response.status);
      }
    } catch (error) {
      console.error('Error deleting membership request', error);
    }
  },
    getSelectedData(item) {
      this.selectedUser = { ...item };
        localStorage.setItem('selectedMembershipData', JSON.stringify(this.selectedUser));
        this.bookDetailsDialog = true;
      },
   
    async AcceptUser() {
  try {
    const response = await axios.post(`${process.env.apiUrl}user/accept_membership_request`, {
      phoneNumber: this.selectedUser.phoneNumber,cardNumber: this.selectedUser.cardNumber
    });
    console.log(response);  
    const acceptedUsers = JSON.parse(localStorage.getItem('acceptedUsers')) || [];
    acceptedUsers.push(this.selectedUser);
    localStorage.setItem('acceptedUsers', JSON.stringify(acceptedUsers));
    this.bookDetailsDialog = false; 
    this.getmembershipreq();
    alert(response);
  } catch (error) {
    console.error("Error accepting user", error);
  }
},
 async CloseDialog(){
  this.bookDetailsDialog = false;
},
},
    mounted() {
      this.getMemberShip();
    },
  }
  </script>