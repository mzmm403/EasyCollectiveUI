<script lang="ts" setup>
import { reactive, ref } from "vue";
import { EcMessage, type FormInstance } from "easy-collective-ui";

const formRef = ref<FormInstance>();
const form = reactive({
    name: "",
    password: "",
    passwordConfirm: "",
});

const rules: any = reactive({
    name: [
        { required: true, message: "请输入活动名称", trigger: "blur" },
        { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
    ],
    password: [{ required: true, trigger: "blur", message: "请输入密码" }],
    passwordConfirm: [
        {
            required: true,
            trigger: "blur",
            message: "请再次输入密码",
        },
        {
            validator: (_: typeof rules, value: string) => value === form.password,
            trigger: "blur",
            message: "两个密码必须相同",
        },
    ],
});

const onSubmit = async (instance?: FormInstance) => {
    const valid = await instance?.validate();
    if (!valid) return;
    EcMessage.success("submit!");
};

const onReset = () => {
    formRef.value?.resetFields();
};
</script>

<template>
    <ec-form ref="formRef" :model="form" :rules="rules" label-position="top" @submit.prevent="onSubmit(formRef)">
        <ec-form-item label="Activity name" prop="name">
            <ec-input v-model="form.name" />
        </ec-form-item>
        <ec-form-item label="Password" prop="password">
            <ec-input v-model="form.password" type="password" />
        </ec-form-item>
        <ec-form-item label="Password Confirm" prop="passwordConfirm">
            <ec-input v-model="form.passwordConfirm" type="password" />
        </ec-form-item>
        <ec-form-item>
            <ec-button type="primary" native-type="submit">Create</ec-button>
            <ec-button @click="onReset">Reset</ec-button>
        </ec-form-item>
    </ec-form>
</template>