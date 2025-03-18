<script lang="ts" setup>
import { reactive, ref } from "vue";
import { EcMessage, type FormProps } from "easy-collective-ui";

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
const labelPosition = ref<FormProps["labelPosition"]>("right");

const onSubmit = () => {
    EcMessage.success("submit");
};
</script>

<template>
    <ec-button-group size="small">
        <ec-button @click="labelPosition = 'left'"
            :type="labelPosition === 'left' ? 'primary' : 'info'">Left</ec-button>
        <ec-button @click="labelPosition = 'right'"
            :type="labelPosition === 'right' ? 'primary' : 'info'">Right</ec-button>
        <ec-button @click="labelPosition = 'top'" :type="labelPosition === 'top' ? 'primary' : 'info'">Top</ec-button>
    </ec-button-group>
    <div style="margin: 20px"></div>
    <ec-form :model="form" :label-position="labelPosition">
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