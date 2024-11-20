<template>
    <div>
     <Addorder/>
<v-card>
    <v-data-table
          :headers="headers"
          :items="tableData"
          :items-per-page="10"
          class="elevation-1"
        >
        </v-data-table>
</v-card>
</div>
</template>


<script>
  import axios from 'axios';
import Addorder from '~/components/addorder.vue';
export default{
    data() {
        return {
            dialogVisible: false,
            tableData: [],
            headers: [
                { text: "Book Name", value: "bookName" },
                { text: "Card Number", value: "cardNumber" },
                { text: "User Name", value: "userName" },
                { text: "Phone No", value: "phoneNumber" },
                { text: "House Name", value: "houseName" },
                { text: "Barcode", value: "barcode" },
                { text: "Ward No", value: "wardNumber" },
            ]
        };
    },
    mounted() {
        this.getPlacedOrders();
    },
    methods: {
        async getPlacedOrders() {
            try {
                const response = await axios.get(`${process.env.apiUrl}checkout/get_all`);
                if (response.status === 200) {
                    this.tableData = response.data;
                    localStorage.setItem('tableData', JSON.stringify(this.tableData));
                }
            }
            catch (error) {
                console.error('Error fetching placed orders', error);
            }
        },
        addorder() {
            this.dialogVisible = true;
        }
    },
    components: { Addorder }
}
</script>