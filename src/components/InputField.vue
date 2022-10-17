<template>
  <div class="flex justify-center ">
    <label for="field" class="text-gray-400 text-sm focus-within:text-black block"><slot></slot>
      <input
          type="number"
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
          class="text-center block border rounded focus:outline-none  focus:border-gray-900 w-16"/>
    </label>
  </div>

</template>

<script>
export default {
  name: "InputField",
  props: ['modelValue'],
  emits: ['update:modelValue']
}
</script>

<style scoped>

</style>