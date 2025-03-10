<script setup lang="ts">
const args = {
  accordion: false,
  modelValue: ["a"]
}
</script>

<template>
  <ec-collapse v-bind="args">
      <ec-collapse-item name="a" title="Title a">
        <div>this is content a</div>
      </ec-collapse-item>
      <ec-collapse-item name="b" title="title b">
        <div>this is content b</div>
      </ec-collapse-item>
      <ec-collapse-item name="c" title="title c  disable" disabled>
        <div>this is content c</div>
      </ec-collapse-item>
  </ec-collapse>
</template>


