<template>
  <div>
    <table class="table-fixed border m-3">
      <thead class="bg-gray-300">
        <tr>
          <th class="px-4 py-2" v-for="(element, index) in header" :key="index">
            {{element}}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="todo in list" :key="todo.id" class="ac-row relative cursor-pointer" :class="{'bg-yellow-200' : todo.id === updateId, 'hover:bg-gray-100' :  todo.id !== updateId}">
          <td v-for="(element, index) in header" :key="index" class="p-4">
            <span v-if="element === 'created_at'">
              {{new Date(todo[element]).toLocaleString()}}
            </span>
            <span v-else-if="todo.id !== updateId">
              {{todo[element]}}
            </span>
            <input v-else type="text" v-model="updateRowData[element]" class="p-2">
          </td>
          <div  class="ac-edition-block hidden hover:flex absolute -right-24 h-full px-4 space-x-4 ">
            <button @click="setUpdate(todo.id)">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
            <button @click="$emit('delete', todo.id)">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </tr>
        <tr v-if="newRow">
          <td v-for="(element, index) in header" :key="index" class="p-4">
            <input
              :disabled="isHiddenKey(element)"
              :class="{'hidden': isHiddenKey(element)}"
              type="text"
              v-model="newRowData[element]"
              class="border"
            >
          </td>
        </tr>
      </tbody>
    </table>
    <template v-if="updateId">
      <button @click="handleUpdateRow" class="px-3 py-2 rounded-md bg-yellow-400 text-white font-semibold mx-3 mt-5">
        <div class="flex items-center">
           <span class="mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </span>
          <span>Mettre à jour</span>
        </div>
      </button>
      <button @click="updateId=null" class=" px-3 py-2 rounded-md bg-red-500 text-white font-semibold mx-3 mt-5">
        <div class="flex items-center">
          <span class="mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </span>
          <span>
            Annuler
          </span>
        </div>
      </button>
    </template>
    <template v-else-if="!newRow">
      <button @click="newRow = true" class="px-3 py-2 rounded-md bg-green-500 text-white font-semibold mx-3 mt-5">
        <div class="flex items-center">
        <span class="mr-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </span>
        Ajouter
        </div>
        
      </button>
    </template>
    <template v-else>
      <button @click="handleSendRow" class="px-3 py-2 rounded-md bg-blue-500 text-white font-semibold mx-3 mt-5">
        <div class="flex items-center">
           <span class="mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </span>
          <span>Valider</span>
        </div>
      </button>
      <button @click="resetNewRow" class=" px-3 py-2 rounded-md bg-red-500 text-white font-semibold mx-3 mt-5">
        <div class="flex items-center">
          <span class="mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
          </span>
          <span>
            Annuler
          </span>
        </div>
      </button>
    </template>
  </div>
</template>

<script>
export default {
  name: 'TodoList',
  props: {
    list: {
      type: Array,
      default: () => []
    },
  },
  data() {
    return {
      newRow: false,
      newRowData: {},
      updateId: null,
      updateRowData: {}
    }
  },
  computed: {
    header() {
      const base = this.list[0]
      if (!base) return []
      
      return Object.keys(base)
      
    }
  },
  methods: {
    isHiddenKey(key) {
      return ['created_at', 'id'].includes(key)
    },
    handleSendRow() {
      this.$emit('send', this.newRowData)
      this.resetNewRow()
    },
    resetNewRow() {
      this.newRow = false
      this.newRowData = {}
    },
    setUpdate(id) {
      this.updateId = id
      this.updateRowData = this.list.find(todo => todo.id === id)
    },
    handleUpdateRow() {
      this.$emit('update', this.updateRowData)
      this.resetUpdate()
    },
    resetUpdate() {
      this.updateId = null
      this.updateRowData = {}
    }
  }
}
</script>

<style  scoped>

  td {
    max-width: 500px;
  }
  
  .ac-row:hover  .ac-edition-block {
    display: flex;
  }

</style>