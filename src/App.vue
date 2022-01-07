<template>
  <div id="app">
    <TodoList :list="list"/>
  </div>
</template>

<script>
import TodoList from './components/TodoList'

export default {
  name: 'App',
  components: {
    TodoList
  },
  data() {
    return {
      list: [
        {
          id: 1,
          created_at: '2022-01-07T10:53:03+00:00',
          title: 'Titre 1 ',
          content: 'Ma description'
        }
      ]
    }
  }
}
</script>

