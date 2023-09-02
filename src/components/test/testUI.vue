<template class="above">

    <el-empty description="description" />

</template>

<script>
import router from "@/router";
import { ref, onMounted } from "vue";
import axios from "axios";
import {ElMessage} from "element-plus";
export default {
    name: "ShowProject",
    setup() {
        const elements_p = ref([]);
        // const elements_p = [
        //     { id: 1, title: 'Card 1', content: 'Content for Card 1' },
        //     { id: 2, title: 'Card 2', content: 'Content for Card 2' },
        //     { id: 3, title: 'Card 3', content: 'Content for Card 3' },
        //     { id: 1, title: 'Card 1', content: 'Content for Card 1' },
        //     { id: 2, title: 'Card 2', content: 'Content for Card 2' },
        //     { id: 3, title: 'Card 3', content: 'Content for Card 3' },
        //     { id: 1, title: 'Card 1', content: 'Content for Card 1' },
        //     { id: 2, title: 'Card 2', content: 'Content for Card 2' },
        //     { id: 3, title: 'Card 3', content: 'Content for Card 3' },
        //     { id: 1, title: 'Card 1', content: 'Content for Card 1' },
        //     { id: 2, title: 'Card 2', content: 'Content for Card 2' },
        //     { id: 3, title: 'Card 3', content: 'Content for Card 3' },
        //     { id: 1, title: 'Card 1', content: 'Content for Card 1' },
        //     { id: 2, title: 'Card 2', content: 'Content for Card 2' },
        //     { id: 3, title: 'Card 3', content: 'Content for Card 3' },
        //     // 其他元素...
        // ]
        const elements_w = ref([]);
        // const elements_w = [
        //     { id: 1, title: 'Card 1', content: 'Content for Card 1' },
        //     { id: 2, title: 'Card 2', content: 'Content for Card 2' },
        //     { id: 3, title: 'Card 3', content: 'Content for Card 3' },
        //     { id: 1, title: 'Card 1', content: 'Content for Card 1' },
        //     { id: 2, title: 'Card 2', content: 'Content for Card 2' },
        //     { id: 3, title: 'Card 3', content: 'Content for Card 3' },
        //     { id: 1, title: 'Card 1', content: 'Content for Card 1' },
        //     { id: 2, title: 'Card 2', content: 'Content for Card 2' },
        //     { id: 3, title: 'Card 3', content: 'Content for Card 3' },
        //     { id: 1, title: 'Card 1', content: 'Content for Card 1' },
        //     { id: 2, title: 'Card 2', content: 'Content for Card 2' },
        //     { id: 3, title: 'Card 3', content: 'Content for Card 3' },
        //     { id: 1, title: 'Card 1', content: 'Content for Card 1' },
        //     { id: 2, title: 'Card 2', content: 'Content for Card 2' },
        //     { id: 3, title: 'Card 3', content: 'Content for Card 3' },
        //     // 其他元素...
        // ]

        const getdocslist = () => {
            axios.post('/doc/root', {
                "project_id": Number(window.sessionStorage.getItem('curProjectId')),
            })
                .then((response)=>{
                    if (response.data.code === 200) {
                        ElMessage({
                            message: response.data.message,
                            type: 'success'
                        });
                        elements_w.value = response.data.docs;
                        console.log(response.config.data);
                        console.log(response.data);
                    }
                    else {
                        ElMessage({
                            message: response.data.error,
                            type: 'error'
                        });
                        console.log(response.config.data);
                        console.log(response.data);
                    }
                })
                .catch((error) => {
                    ElMessage({
                        message: "获取文档错误，请重试",
                        type: 'error'
                    });
                    console.log(error.config.data);
                    console.log(error.data);
                })
        };

        const getProToTypeList = () => {
            axios.post('/prototype/info', {
                "project_id": Number(window.sessionStorage.getItem('curProjectId')),
            })
                .then((response)=>{
                    if (response.data.code === 200) {
                        ElMessage({
                            message: response.data.message,
                            type: 'success'
                        });
                        elements_p.value = response.data.prototypes;
                        console.log(response.config.data);
                        console.log(response.data);
                    }
                    else {
                        ElMessage({
                            message: response.data.error,
                            type: 'error'
                        });
                        console.log(response.config.data);
                        console.log(response.data);
                    }
                })
                .catch((error) => {
                    ElMessage({
                        message: "获取文档错误，请重试",
                        type: 'error'
                    });
                    console.log(error.config.data);
                    console.log(error.data);
                })
        };

        const jumpToP = () => {
            router.push('/prototype');
        };

        const jumpToW = () => {
            router.push('/documentadmin');
        };

        onMounted(() => {
            getdocslist();
            getProToTypeList();
        })

        return {
            elements_p,
            elements_w,

            jumpToP,
            jumpToW,
            getdocslist,
            getProToTypeList
        }
    }
}
</script>

<style scoped>
.grid-container {
    padding-top: 10px;
    display: grid;
    grid-template-columns: repeat(7, 1fr); /* 自动适应列宽度，每列最小300px宽 */
    gap: 20px; /* 设置网格间距 */
    width: 100%;
    height: 100%;
    justify-content: center;
    overflow: auto;
}

.grid-container::-webkit-scrollbar {
    width: 0; /* 隐藏Chrome和Safari的滚动条 */
    display: none; /* 隐藏Chrome和Safari的滚动条 */
}

.card {
    border: 1px solid #ccc;
    padding: 20px;
    background-color: #fff;
    width: 100px;
    height: 100px;
    box-sizing: border-box;
    text-align: center;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}


.above {
    width: calc(100vh - 20px);
}

.body {
    height: calc(93vh - 40px);
    /*width: calc(100vh - 20px);*/
    /*width: 80vh;*/
    /*overflow-y: hidden;*/
}

.sh-card-container {
    display: flex;
    flex-direction: column; /* This makes cards stack vertically */
    height: 100%;
}

.sh-card-p {
    display: flex;
    flex: 1;
    margin: 10px;
    height: 45%;
    flex-direction: column; /* This makes cards stack vertically */
}

.sh-card-w {
    display: flex;
    flex: 1;
    margin: 10px;
    height: 45%;
    flex-direction: column; /* This makes cards stack vertically */
}

.sh-p-t {
    height: 10%;
    padding-left: 5px;
    margin-bottom: 30px;
}

.sh-w-t {
    height: 10%;
    padding-left: 5px;
    margin-bottom: 30px;
}

.sh-p-l {
    height: 75%;
}

.sh-w-l {
    height: 75%;
}

h3 {
    overflow:hidden;
    max-height: 100%;
    max-width: 100%;
    text-overflow:ellipsis;
    white-space:nowrap;
}
</style>