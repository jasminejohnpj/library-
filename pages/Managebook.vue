<template>
  <div>
    <form @submit.prevent="searchBooks" class="d-flex">
      <!-- Search form -->
      <v-text-field
        class="pt-6 px-6 flex-grow-1"
        label="Search Books"
        append-icon="mdi-window-close"
        append-outer-icon="mdi-magnify"
        outlined
        v-model="search"
      ></v-text-field>
      
    </form>

    <!-- Header Card -->
    <div class="pa-2">
      <v-card color="#757575" class="card1">
        <v-col cols="2" sm="6">
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="headline mb-1 white--text">
                Library Book Management
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-col>
      </v-card>
    </div>

    <!-- Book Details Dialog -->
    <v-dialog v-model="bookDetailsDialog" max-width="800px">
      <v-card>
        <v-card-title>Book Details</v-card-title>
        <v-card-text>
          <!-- Display all book details in the form -->
         
          <v-row>
              <v-col cols="12" sm="6">
                <v-text-field label="Title" v-model="selectedBook.title" ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field label="Author" v-model="selectedBook.author" ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field label="Category" v-model="selectedBook.category" ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field label="Subject" v-model="selectedBook.subject" ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field label="Language" v-model="selectedBook.language" ></v-text-field>
              </v-col> 
              <v-col cols="12" sm="6">
                <v-text-field label="Publisher" v-model="selectedBook.publisher" ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field label="Place & Year" v-model="selectedBook.placeyear" ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field label="Edition" v-model="selectedBook.edition" ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field label="Volume" v-model="selectedBook.volume" ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field label="Accession No" v-model="selectedBook.accessionno" ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field label="Shelf No" v-model="selectedBook.shelfNo"></v-text-field>
              </v-col>
              
              <v-col cols="12" sm="6">
                <v-text-field label="Call No" v-model="selectedBook.callno" ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field label="ISBN" v-model="selectedBook.Isbn" ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field label="Price" v-model="selectedBook.price" ></v-text-field>
              </v-col>
            </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="bookDetailsDialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text  @click="updateBookDetails()">UPDATE</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Book List -->
    <v-card>
      <v-data-table
        :headers="headers"
        :items="tableData"
        :items-per-page="10"
        class="elevation-1"
      >
        <template v-slot:item.action="{ item }">
          <v-btn @click.stop="showBookDetails(item)" icon>
            <v-icon>mdi-eye</v-icon>
          </v-btn>
          <v-btn @click.stop="deleteBook(item)" icon>
            <v-icon>mdi-delete</v-icon>
          </v-btn>
          <v-btn @click="searchhistory(item.bookTitle)" icon>
  <v-icon> mdi-history</v-icon>
</v-btn>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog v-model="historyData">
      <v-data-table
        :headers="headers1"
        :items="tableData1"
        :items-per-page="10"
        class="elevation-1"
      >
      </v-data-table>
    </v-dialog>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
            search: "",
      tableData: [],
      headers: [
        { text: "Title", value: "bookTitle" },
        { text: "Author", value: "author" },
        { text: "Category", value: "subjectHeading" },
        { text: "Accession No", value: "accessionNo" },
        { text: '', value: 'action', sortable: false },
    ],
    tableData1:[],
    headers1:[
        { text: "User Name ", value: "userName" },
        { text: "House Name", value: "houseName" },
        
      ],
      selectedBook: {},
      bookDetailsDialog: false,
      historyData:false
    };
  },
  mounted() {
    this.getBookList();
  },
  methods: {
    async searchBooks() {
      try {
        const response = await axios.post(`${process.env.apiUrl}admin/search_books`, {
          text: this.search,
        });
        if (response.status === 200) {
          this.tableData = response.data.data;
        }
      } catch (error) {
        console.error('Error searching books:', error);
        alert(error.message);
      }
    },
    
    async updateBookDetails() {
      try {
        if (!this.selectedBook || !this.selectedBook._id) {
          console.error('Invalid or undefined _id for the book update.');
          return;
        }

        const response = await axios.put(
          `${process.env.apiUrl}admin/update_book/${this.selectedBook._id}`,
          this.selectedBook
        );

        if (response.status >= 200 && response.status < 300) {
          alert(response.data);
          this.getBookList();
          this.bookDetailsDialog = false;
        } else {
          console.error('Failed to update book details. Status:', response.status);
        }
      } catch (error) {
        console.error('Error updating book details:', error);
      }
    },
   
    showBookDetails(item) {
      this.selectedBook = {
        title: item.bookTitle,
    author: item.author,
    category: item.category,
    subject:item.subjectHeading,
    language:item.language,
    accessionno: item.accessionNo,
    publisher: item.publisherName,
    placeyear: `${item.publicationPlace}, ${item.publicatonDate}`,
    edition:item.edition,
    volume:item.volume,
    shelfNo: item.shelfNo,
    callno:item.callNo,
    Isbn:item.ISBN,
  price:item.price
      };

      for (const field in item) {
        this.selectedBook[field] = item[field];
      }

      this.bookDetailsDialog = true;
    },
    async deleteBook(item) {
      try {
        await axios.delete(`${process.env.apiUrl}admin/delete_book/${item._id}`);
        this.getBookList();
        this.bookDetailsDialog = false;
      } catch (error) {
        console.error('Error deleting book:', error);
      }
    },
    async getBookList() {
      try {
        const response = await axios.get(`${process.env.apiUrl}admin/all_books`);
        if (response.status === 200) {
          this.tableData = response.data.data;
        }
      } catch (error) {
        console.error('Error fetching book list:', error);
      }
    },
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    async searchhistory(bookTitle){
        try{
          const response = await axios.get(`${process.env.apiUrl}checkout/book_history/${bookTitle}`);  
        if (response.status === 200)
        {
           this.historyData = true;
           this.tableData1= response.data;
          console.log(response);
         
        }
      }
      catch (error) {
        console.error('Error fetching history:', error);
  }
}
  },
};
</script>
