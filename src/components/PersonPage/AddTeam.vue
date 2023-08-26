<!--没什么用-->
<template>
    <d-modal v-model="visible">
        <template #header>
            <d-modal-header>
                <!--                <d-icon name="like"></d-icon>-->
                <span>创建团队</span>
            </d-modal-header>
        </template>
        <div class="text"><b>团队名称：</b></div>
        <d-input class="custom-input" v-model="valueBasic1" clearable @clear="handleClear" placeholder="你的新团队名称"></d-input>
        <template #footer>
            <d-modal-footer style="text-align: right; padding-right: 20px;">
                <d-button class="custom-button" @click="hidden">取消</d-button>
                <d-button class="custom-button-i" @click="hidden">确认</d-button>
            </d-modal-footer>
        </template>
    </d-modal>
</template>
<script>

import { ref, defineComponent, reactive } from 'vue';
export default defineComponent({
    setup() {
        const visible = ref(false);
        const valueBasic1 = ref('');
        const data = reactive({
            name: 'Tom',
            age: 20,
            address: 'Chengdu',
        });
        const handleClear = () => {
            console.log('clear');
        };

        const handleClick = () => {
            visible.value = true;
        };
        const hidden = () => {
            visible.value = false;
        };

        return {
            visible,
            valueBasic1,
            data,
            handleClear,
            handleClick,
            hidden };
    },
});
</script>

<style>

.text {
    margin-top: -10px;
    margin-bottom: 20px;
}

.custom-input {
    border: 1px solid #9E9CF4;
    border-radius: 8px; /* 添加圆角边框 */
    padding: 8px;
    transition: border-color 0.3s, box-shadow 0.3s;
}

.custom-input:hover,
.custom-input:focus {
    border-color: #9E9CF4;
    box-shadow: 0 0 5px rgba(158, 156, 244, 0.7);
    outline: none;
}

.custom-button:hover,
.custom-button:focus {
    background-color: white;
    border-color: #7E7CCB;
    color: #7E7CCB;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
}

.custom-button {
    background-color: white;
    border-color: #9E9CF4;
    color: #9E9CF4;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
}

.custom-button:active {
    background-color: #7E7CCB;
    color: white;
}

.custom-button-i:hover,
.custom-button-i:focus {
    background-color: #7E7CCB;
    border-color: #7E7CCB;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
}

.custom-button-i {
    background-color: #9E9CF4;
    border-color: white;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
}

.custom-button-i:active {
    background-color: white;
    color: #7E7CCB;
}


</style>