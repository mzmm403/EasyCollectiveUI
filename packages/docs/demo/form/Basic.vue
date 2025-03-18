<script lang="ts" setup>
import { reactive, ref } from "vue";
import { EcMessage } from "easy-collective-ui";

const form = reactive({
    name: "",
    region: "",
    delivery: false,
    desc: "",
});

const options = ref([
    { value: "beijing", label: "Zone One" },
    { value: "shanghai", label: "Zone Two" },
]);

const onSubmit = () => {
    EcMessage.success("submit!");
};
</script>

<template>
    <ec-form :model="form">
        <ec-form-item label="Activity name">
            <ec-input v-model="form.name" />
        </ec-form-item>
        <ec-form-item label="Activity zone">
            <ec-select v-model="form.region" placeholder="please select your zone" :options="options" />
        </ec-form-item>
        <ec-form-item label="Instant delivery">
            <ec-switch v-model="form.delivery" />
        </ec-form-item>
        <ec-form-item label="Activity form">
            <ec-input v-model="form.desc" type="textarea" />
        </ec-form-item>
        <ec-form-item>
            <ec-button type="primary" @click="onSubmit">Create</ec-button>
            <ec-button>Cancel</ec-button>
        </ec-form-item>
    </ec-form>
</template>