<template>
  <table class="table-fixed border m-3">
    <thead class="bg-gray-300">
      <tr>
        <th class="px-4 py-2" v-for="(element, index) in header" :key="index">
          {{element}}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="todo in list" :key="todo.id">
        <td v-for="(element, index) in header" :key="index" class="p-4">
          {{todo[element]}}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'TodoList',
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    header() {
      const base = this.list[0]
      if (!base) return []
      
      return Object.keys(base)
      
    }
  }
}
</script>

<style>

</style>