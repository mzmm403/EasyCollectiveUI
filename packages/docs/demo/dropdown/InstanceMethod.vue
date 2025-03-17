<script setup lang="ts">
import type { DropdownItemProps, DropdownInstance } from "easy-collective-ui";
import { ref } from "vue";

const items: DropdownItemProps[] = [
    { command: "1", label: "Action 1" },
    { command: "2", label: "Action 2" },
    { command: "3", label: "Action 3", disabled: true },
    { command: "4", label: "Action 4", divided: true },
];
const dropdownRef = ref<DropdownInstance>();
</script>

<template>
    <ec-button @click="() => dropdownRef?.open()">open</ec-button>
    <ec-button @click="() => dropdownRef?.close()">close</ec-button>
    <br />
    <ec-dropdown ref="dropdownRef" :items="items">
        <span class="dropdown-link">
            Dropdown List
            <ec-icon icon="angle-down" />
        </span>
    </ec-dropdown>
</template>

<style scoped>
.dropdown-link {
    display: flex;
    align-items: center;
    cursor: pointer;
    color: var(--ec-color-primary);
    margin-top: 20px;

    i {
        margin-left: 8px;
    }
}
</style>