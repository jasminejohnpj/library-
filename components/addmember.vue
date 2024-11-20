<template>
  <div>
    <v-row>
    <v-spacer></v-spacer>
  <v-btn @click="opendialogue">Add Member</v-btn></v-row>
  <v-dialog v-model="Dialog" max-width="800px" >
      <v-card>
        <v-card-title>Member Details</v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-card>
                <v-card-text>
                  <v-row>
                    <v-col cols="12" sm="6">
                    <v-text-field v-model="firstName" label="First Name"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                    <v-text-field v-model="lastName" label="Last Name"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                  <v-text-field v-model="email" label="Email"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                  <v-text-field v-model="cardNumber" label="Card Number"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                  <v-text-field v-model="category" label="Category"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                  <v-text-field v-model="phoneNumber" label="Phone Number"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                  <v-text-field v-model="gender" label="Gender"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                  <v-text-field v-model="dob" type="date" label="Date of Birth"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                  <v-text-field v-model="age" label="Age"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                  <v-text-field v-model="houseName" label="House Name"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                  <v-text-field v-model="wardName" label="Ward Name"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                  <v-text-field v-model="wardCouncillor" label="Ward Councillor"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                  <v-text-field v-model="wardNumber" label="Ward Number"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                  <v-text-field v-model="postOffice" label="Post Office"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                  <v-text-field v-model="district" label="District"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                  <v-text-field v-model="pincode" label="Pincode"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                  <v-text-field v-model="expiryDate" type="date" label="Expiry Date"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                  <v-text-field v-model="receiptNo" label="Receipt No & Date"></v-text-field>
                  </v-col>
                </v-row>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="adduser">Accept</v-btn>
          <v-btn color="primary" @click="this.Dialog= false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> 
   
  </div>
</template>
<script>
import axios from 'axios'
export default{
  data(){
      return{
          firstName:'',
          lastName:'',
          email:'',
          cardNumber:'',
          category:'',
          phoneNumber:'',
          gender:'',
          dob:'',
          age:'',
          houseName:'',
          wardName:'',
          wardCouncillor:'',
          wardNumber:'',
          postOffice:'',
          district:'',
          pincode:'',
          dateEnrolled:'',
          expiryDate:'',
          receiptNo:'',
          Dialog:false,
          
      }
  },
  methods:{
      opendialogue(){
          this.Dialog = true;
      },
      async adduser() {
try {
  const user = {
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
    wardNumber: this.wardNumber,
    postOffice: this.postOffice,
    district: this.district,
    pincode: this.pincode,
    expiryDate: this.expiryDate,
    receiptNo: this.receiptNo,
  };

  const response = await axios.post(`${process.env.apiUrl}admin/add_new_user`,user);
  console.log(response.data);

  localStorage.setItem('user', JSON.stringify(user));

} catch (error) {
  console.error('Error adding user:', error);
}
      },
      
  }
}
</script>