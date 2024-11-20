<template>
  <div>
    <v-card-title class="headline">Members List</v-card-title>
    <form @submit.prevent="searchdata">
    <v-text-field
  class="pt-6 px-6"
  label="Search Member"
  append-icon="mdi-window-close"
  append-outer-icon="mdi-magnify"
  outlined
  v-model="search"
  ></v-text-field>
</form>
  <div style="position: relative; right: 1010px;">
<addmember/> 
</div>
    <v-dialog v-model="bookDetailsDialog" max-width="800px" >
      <v-card>
        <v-card-title>Member Details</v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-card>
                <v-card-text>
                  <v-spacer></v-spacer>
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
                  <v-text-field v-model="selectedUser.dob"  type = "date" label="Date of Birth"></v-text-field>
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
                  <v-text-field v-model="selectedUser.wardCouncillor" label="Ward Councillor"></v-text-field>
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
                  <v-text-field v-model="selectedUser.expiryDate" type="date" label="Expiry Date"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                  <v-text-field v-model="selectedUser.receiptNo" label="Receipt No & Date"></v-text-field>
                  </v-col>
                </v-row>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="updateUser">Update</v-btn>
          <v-btn color="primary" @click="bookDetailsDialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> 

    <v-list three-line class="pa-6" v-if="getmembershipreq">
      <v-list-item v-for="(item, index) in getmembershipreq" :key="item.phoneNumber">
       
        <v-list-item-content >
          <v-list-item-title v-text="item.firstName"></v-list-item-title>
          <v-list-item-subtitle v-text="item.cardNumber"></v-list-item-subtitle>
        </v-list-item-content>


       

         <v-btn color="#27374D" @click="viewUser(item)">View</v-btn> 
    
        &nbsp;&nbsp;
        <v-btn color="#27374D" @click="deleteUser(item.cardNumber)">Delete</v-btn>
        <v-btn @click="searchhistory(item.cardNumber)" icon>
          <v-icon> mdi-history</v-icon>
        </v-btn>

      </v-list-item>
      <v-divider :key="index" :inset="true"></v-divider>
    </v-list>
    <v-dialog v-model="historyData">
      <v-card>
        <v-card-text>
          <v-data-table
      :headers="headers"
      :items="tableData"
      :items-per-page="10"
      class="elevation-1"
    >
</v-data-table>

        </v-card-text>
      </v-card>
    </v-dialog>     

  </div>

</template>



<script>
import axios from 'axios';
import addmember from '~/components/addmember.vue';
export default {
  data() {
      return {
          search: '',
          bookDetailsDialog: false,
          memberStatus: 0,
          getmembershipreq: [],
          selectedUser: {},
          historyData:false,
          history:"",
          tableData:[],
          headers:[
          { text: "Title", value: "bookName" },
          { text: "Accession No", value: "accessionNo" },
          { text: "check in Status" ,value:"checkinStatus"}
          ]
      };
  },
  methods: {
  async getMemberShip() {
          try {
              const response = await axios.get(`${process.env.apiUrl}user/get_all_valid_users`);
              console.log(response);
              this.getmembershipreq = response.data;
          }
          catch (error) {
              console.error("Error fetching membership requests", error);
          }
      },
      viewUser(user) {
          this.selectedUser = { ...user };
          localStorage.setItem('selectedUserData', JSON.stringify(this.selectedUser));
          this.bookDetailsDialog = true;
      },
  async deleteUser(cardNumber) {
         await axios.get(`${process.env.apiUrl}user/delete/${cardNumber}`)
              .then(response => {
              console.log("Delete user with card number:", cardNumber, response);
              this.getMemberShip(); 
          })
              .catch(error => {
              console.error("Error deleting user details", error);
          })
              .finally(() => {
              localStorage.removeItem('selectedUser');
          });
      },
  async updateUser() {
          localStorage.setItem('selectedUser', JSON.stringify(this.selectedUser));
          const selectedUser = {
              firstName: this.firstName,
              lastName: this.lastName,
              email: this.email,
              cardNumber: this.cardNumber,
              category: this.category,
              phoneNumber: this.phoneNumber,
              gender: this.gender,
              dob: this.dob,
              age: this.age,
              houseName: this.houseName,
              wardName: this.wardName,
              wardCouncillor: this.wardCouncillor,
              postOffice: this.postOffice,
              district: this.district,
              pincode: this.pincode,
              expiryDate: this.expiryDate,
              receiptNo: this.receiptNo,
          };
          await axios.put(`${process.env.apiUrl}admin/update_user/${this.selectedUser.cardNumber}`, this.selectedUser)
              .then(response => {
              console.log("User details updated successfully", response);
              alert(message);
              this.getMemberShip(); // Optionally refresh the list of users after updating
          })
              .catch(error => {
              console.error("Error updating user details", error);
          })
              .finally(() => {
              this.bookDetailsDialog = false;          
              localStorage.removeItem('selectedUser');
          });
      },
   
  async searchdata() {
try {
  const response = await axios.post(`${process.env.apiUrl}admin/search_users`, {
    text: this.search
  });
  console.log(response);
  if (response.status === 200) {
    this.getmembershipreq = response.data.data;
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
  async searchhistory(cardNumber){
      try{
        const response = await axios.get(`${process.env.apiUrl}user/past_read_books/${cardNumber}`);  
      if (response.status === 200)
      {
        this.historyData = true;
        this.tableData= response.data;
        console.log(response);
       
      }
    }
    catch (error) {
      console.error('Error fetching history:', error);
}
}
  },
  mounted() {
      this.getMemberShip();
      const storedSelectedUser = localStorage.getItem('selectedUser');
      if (storedSelectedUser) {
          this.selectedUser = JSON.parse(storedSelectedUser);
      }
  },
  components: { addmember }
}
</script> 
<style scoped>
