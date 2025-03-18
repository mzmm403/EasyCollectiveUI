<script lang="ts" setup>
import { reactive, ref } from "vue";
import { EcMessage, type FormInstance } from "easy-collective-ui";

const formRef = ref<FormInstance>();
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

const rules = reactive({
    name: [
        { required: true, message: "请输入活动名称", trigger: "blur" },
        { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
    ],
    region: [{ required: true, message: "请选择活动区域", trigger: "change" }],
    desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }],
});

const onSubmit = () => {
    formRef.value?.validate().then((valid) => {
        if (valid) {
            EcMessage.success("submit!");
        }
    });
};

const onReset = () => {
    formRef.value?.resetFields();
};
</script>

<template>
    <ec-form ref="formRef" :model="form" :rules="rules">
        <ec-form-item label="Activity name" prop="name">
            <ec-input v-model="form.name" />
        </ec-form-item>
        <ec-form-item label="Activity zone" prop="region">
            <ec-select v-model="form.region" placeholder="please select your zone" :options="options" />
        </ec-form-item>
        <ec-form-item label="Instant delivery" prop="delivery">
            <ec-switch v-model="form.delivery" />
        </ec-form-item>
        <ec-form-item label="Activity form" prop="desc">
            <ec-input v-model="form.desc" type="textarea" />
        </ec-form-item>
        <ec-form-item>
            <ec-button type="primary" @click="onSubmit">Create</ec-button>
            <ec-button @click="onReset">Reset</ec-button>
        </ec-form-item>
    </ec-form>
</template>