<template class="above">
    <d-row class="body">
        <div class="sh-card-container">
            <d-card class="sh-card-w" @click="jumpToP">
                <h2 class="sh-p-t" style="color: #7E7CCB">
                    原型设计
                </h2>
                <div class="sh-p-l">
                    <el-empty v-if="show_p" description="empty" />
                    <div class="grid-container" v-if="!show_p">
                        <d-card shadow="always" class="card" v-for="element in elements_p" :key="element.id">
                            <h3  style="color: #9E9CF4">{{ element.prototypeName }}</h3>
                        </d-card>
                    </div>
                </div>
            </d-card>
            <d-card class="sh-card-w" @click="jumpToW">
                <h2 class="sh-w-t"  style="color: #7E7CCB">
                    文档编辑
                </h2>
                <div class="sh-w-l">
                    <el-empty v-if="show_w" description="empty" />
                    <div class="grid-container" v-if="!show_w">
                        <d-card shadow="always" class="card" v-for="element in elements_w" :key="element.id">
                            <h3  style="color: #9E9CF4">{{ element.name }}</h3>
                        </d-card>
                    </div>
                </div>
            </d-card>
        </div>
    </d-row>
</template>

<script>
import router from "@/router";
import { onMounted, computed } from "vue";
// import axios from "axios";
// import {ElMessage} from "element-plus";
import { useStore, mapState, mapActions } from "vuex";
export default {
    name: "ShowProject",
    computed: {
        ...mapState(['elements_W']),
        ...mapState(['elements_P']),
        ...mapState(['show_W']),
        ...mapState(['show_P'])
    },
    setup() {
        const store = useStore();
        const elements_p = computed(() => {
            return store.state.elements_P;
        })
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
        const elements_w = computed(() => {
            return store.state.elements_W;
        })

        const { fetchElementWList } = mapActions(['fetchElementWList']);

        const callFetchElementWList = () => {
            store.dispatch('fetchElementWList', Number(window.sessionStorage.getItem('curProjectId')));
        }

        const { fetchElementPList } = mapActions(['fetchElementPList']);

        const callFetchElementPList = () => {
            store.dispatch('fetchElementPList', Number(window.sessionStorage.getItem('curProjectId')));
        }

        const show_p = computed(() => {
            return store.state.show_P;
        });
        const show_w = computed(() => {
            return store.state.show_W;
        });

        const jumpToP = () => {
            router.push('/prototype');
        };

        const jumpToW = () => {
            router.push('/documentadmin');
        };

        onMounted(() => {
            callFetchElementWList();
            callFetchElementPList();
        })

        return {
            elements_p,
            elements_w,
            show_p,
            show_w,

            fetchElementWList,
            fetchElementPList,
            callFetchElementWList,
            callFetchElementPList,

            jumpToP,
            jumpToW,
            // getdocslist,
            // getProToTypeList
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
    /*align-items: center; !* 垂直居中 *!*/
    /*place-items: center;*/
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
    height: 43%;
    flex-direction: column; /* This makes cards stack vertically */
    width: 100%;
}

.sh-card-w {
    display: flex;
    flex: 1;
    margin: 10px;
    height: 43%;
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

.sh-w-l {
    height: 75%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}

.sh-p-l {
    height: 75%;
    display: flex;
    justify-content: center;
    align-items: center;
}

h3 {
    overflow:hidden;
    max-height: 100%;
    max-width: 100%;
    text-overflow:ellipsis;
    white-space:nowrap;
}
</style>