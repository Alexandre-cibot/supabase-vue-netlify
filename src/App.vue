<template>
  <div id="app">
    <h1>Ceci est une todolist</h1>
    <TodoList :list="list" @send="sendNewRow" @delete="deleteRow" @update="updateRow"/>
    
  </div>
</template>

<script>
import axios from 'axios'
import TodoList from './components/TodoList'

export default {
  name: 'App',
  components: {
    TodoList
  },
  data() {
    return {
      list: [],
    }
  },
  created() {
    this.fetchList()
  },
  methods: {
    async fetchList() {
      this.list = await (axios.get('.netlify/functions/getNotes')).then(res => res.data)    
    },
    sendNewRow(data) {
      axios.get('.netlify/functions/createNote', {params: data})
      .then(res => {
        console.log('res', res)  
        this.fetchList()
      })
      .catch(e => {
        console.warn('Errorr', e)
      })
    },
    deleteRow(rowId) {
      axios.get('.netlify/functions/deleteNote', {params: {id: rowId}})
      .then(res => {
        console.log('res', res)
        this.fetchList()
      })
      .catch(e => {
        console.warn('Errorr', e)
      })
    },
    updateRow(row) {
      axios.get('.netlify/functions/updateNote', {params: row})
       .then(res => {
        console.log('res', res)  
        this.fetchList()
      })
      .catch(e => {
        console.warn('Errorr', e)
      })
    }
  }
}
</script>

