<template>
  <div>
    <p>{{ title }}</p>
    <ul>
      <li v-for="todo in todos" :key="todo.id" @click="increment">
        {{ todo.id }} - {{ todo.content }}
      </li>
    </ul>
    <p>Count: {{ todoCount }} / {{ meta.totalCount }}</p>
    <p>Active: {{ active ? 'yes' : 'no' }}</p>
    <p>Clicks on todos: {{ clickCount }}</p>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, PropType, computed, ref, toRef, Ref
} from '@vue/composition-api'
import { Todo, Meta } from './models'

function useClickCount () {
  const clickCount = ref(0)
  function increment () {
    clickCount.value += 1
    return clickCount.value
  }

  return { clickCount, increment }
}

function useDisplayTodo (todos: Ref<Todo[]>) {
  const todoCount = computed(() => todos.value.length)
  return { todoCount }
}

export default defineComponent({
  name: 'CompositionComponent',
  props: {
    title: {
      type: String,
      required: true
    },
    todos: {
      type: (Array as unknown) as PropType<Todo[]>,
      default: () => []
    },
    meta: {
      type: (Object as unknown) as PropType<Meta>,
      required: true
    },
    active: {
      type: Boolean
    }
  },
  mounted () {
    console.log('mounted!')

    this.$socket.on('whole_chat', (data: any) => {
      console.log('yes', data)
    })

    this.$socket.emit('get_chat')
    this.$socket.emit('chat_message', 'blabl')
  },
  setup (props) {
    return { ...useClickCount(), ...useDisplayTodo(toRef(props, 'todos')) }
  }
})
</script>
