<template>
  <div id="app">
    <TodoList :list="list"/>
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
      list: []
    }
  },
  async created() {
    this.list = await (axios.get('.netlify/functions/getNotes')).then(res => res.data)    
  }
}
</script>

