<template>
    <div>
      <v-toolbar color="indigo" dark>
        <v-toolbar-title class="ml-4"> Book Management System - Book Details Download</v-toolbar-title>
      </v-toolbar>
  
      <v-form @submit.prevent="searchBooks" class="d-flex align-center mt-4">
        <v-select v-model="selectedSearchField" :items="searchFields" label="Search by" />
        <v-text-field v-model="search" label="Search" />
        <v-btn type="submit" icon>
          <v-icon>mdi-search</v-icon>
        </v-btn>
        <v-btn @click="downloadDetails" icon>
          <v-icon>mdi-download</v-icon>
        </v-btn>
      </v-form>
      <v-btn @click="searchhistory(item.bookName)" >
          book history
          </v-btn>
      <v-card v-if="tableData.length > 0" class="mt-4">
        <v-data-table
          :headers="headers"
          :items="tableData"
          :items-per-page="10"
          class="elevation-1"
        >
          <!-- ... your existing data table ... -->
        </v-data-table>
      </v-card>
  
      <v-card v-if="selectedBook" class="mt-4">
        <v-list>
          <v-list-item-group>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>{{ selectedBook.bookTitle }}</v-list-item-title>
                <v-list-item-subtitle>{{ selectedBook.author }}</v-list-item-subtitle>
                <v-list-item-subtitle>{{ selectedBook.language }}</v-list-item-subtitle>
                <v-list-item-subtitle>{{ selectedBook.category }}</v-list-item-subtitle>
                <v-list-item-subtitle>{{ selectedBook.accessionNo }}</v-list-item-subtitle>
                <v-list-item-subtitle>{{ selectedBook.subjectHeading }}</v-list-item-subtitle>
                <!-- Add other details as needed -->
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
  
      <!-- Snackbar for No Results -->
      <v-snackbar v-model="snackbar" :timeout="3000" color="error">
        No books found for the given search criteria.
      </v-snackbar>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        search: '',
        selectedSearchField: 'bookTitle',
        searchFields: [
          { text: 'Title', value: 'bookTitle' },
          { text: 'Author', value: 'author' },
          { text: 'Language', value: 'language' },
          { text: 'Category', value: 'subjectHeading' },
          { text: 'Accession No', value: 'accessionNo' },
        ],
        headers: [
          { text: 'Title', value: 'bookTitle' },
          { text: 'Author', value: 'author' },
          { text: 'Category', value: 'subjectHeading' },
          { text: 'Accession No', value: 'accessionNo' },
        ],
        tableData: [],
        selectedBook: null,
        snackbar: false,
      };
    },
  
    methods: {
      async searchBooks() {
        try {
          const response = await axios.post('http://localhost:5000/api/v1/amc/admin/search_books', {
            field: this.selectedSearchField,
            text: this.search,
          });
  
          if (response.status === 200) {
            this.tableData = response.data.data;
            this.selectedBook = null;
            if (this.tableData.length === 0) {
              this.showSnackbar();
            }
          }
        } catch (error) {
          console.error('Error searching for books:', error);
        }
      },
  
      async downloadDetails() {
    try {
      if (this.tableData.length > 0 && this.search.trim() !== '') {
        const field = this.selectedSearchField;
        const value = this.search;
  
        const downloadResponse = await axios.get(`${process.env.apiUrl}admin/exportBooksToExcel`, {
          params: {
            field: field,
            value: value,
          },
          responseType: 'arraybuffer',
        });
  
        if (downloadResponse.status === 200) {
          const blob = new Blob([downloadResponse.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
  
          // Corrected template string
          link.download = `book_details_${field}_${value}.xlsx`;
  
          link.click();
          window.URL.revokeObjectURL(link.href);
        } else {
          console.error('Failed to download book details. Status:', downloadResponse.status);
        }
      } else {
        console.warn('No valid search input to download. Perform a valid search first.');
      }
    } catch (error) {
      console.error('Error downloading book details:', error);
      console.log('Error response:', error.response);
    }
  },
  
      showSnackbar() {
        this.snackbar = true;
      },
      async searchhistory(){
        try{
          const response = await axios.get(`${process.env.apiUrl}checkout/book_history/${bookName}`);  
        if (response.status === 200)
        {
          // this.historyData = true;
          // this.tableData= response.data;
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