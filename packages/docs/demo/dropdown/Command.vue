<script setup lang="ts">
import {
    type DropdownItemProps,
    type DropdownCommand,
    EcMessage,
} from "easy-collective-ui";

const items: DropdownItemProps[] = [
    { command: "1", label: "Action 1" },
    { command: "2", label: "Action 2" },
    { command: "3", label: "Action 3", disabled: true },
    { command: "4", label: "Action 4", divided: true },
];

function handleCommand(command: DropdownCommand) {
    EcMessage.info("click on item " + command);
}
</script>

<template>
    <ec-dropdown :items="items" @command="handleCommand">
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

    i {
        margin-left: 8px;
    }
}
</style>