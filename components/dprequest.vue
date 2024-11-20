<template>
    <div>
        
        <v-dialog v-model="dialogVisible" max-width="600px">
        <v-card>
          <v-card-text>
                        <v-text-field v-model=" selectedDeliveryPerson.name" label=" Name"></v-text-field>
                        <v-text-field v-model="selectedDeliveryPerson.address" label="Address"></v-text-field>
                      <v-text-field v-model="selectedDeliveryPerson.phoneNumber" label="Phone Number"></v-text-field>
                      <v-text-field v-model="selectedDeliveryPerson.wardNumber" label=" Ward"></v-text-field>
                    </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="closeDialog">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
</template>

<script>
export default{
    data(){
        return{
             
        }
    },
    methods:{
        getSelectedData(selectedDeliveryPerson){
            localStorage.setItem('selectedDeliveryPerson', JSON.stringify(item));

            this.dialogVisible = true;
        }


          }
}
</script>