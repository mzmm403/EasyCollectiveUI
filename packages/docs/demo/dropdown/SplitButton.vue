<script setup lang="ts">
import { type DropdownItemProps, EcMessage } from "easy-collective-ui";

const items: DropdownItemProps[] = [
    { command: "1", label: "Action 1" },
    { command: "2", label: "Action 2" },
    { command: "3", label: "Action 3", disabled: true },
    { command: "4", label: "Action 4", divided: true },
];

function handleClick() {
    EcMessage.info("button click");
}
</script>

<template>
    <div class="row">
        <ec-dropdown :items="items">
            <ec-button type="primary">
                Dropdown List
                <ec-icon icon="angle-down" style="margin-left: 8px" />
            </ec-button>
        </ec-dropdown>
        <ec-dropdown :items="items" type="primary" @click="handleClick" split-button>
            Dropdown List
        </ec-dropdown>
    </div>
</template>

<style scoped>
.row div {
    margin-right: 16px;
}
</style>