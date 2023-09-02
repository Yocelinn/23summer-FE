<template class="above">
    <d-row class="body">
        <div class="sh-card-container">
            <d-card class="sh-card-p" @click="jumpToP">
                <h2 class="sh-p-t">
                    原型设计
                </h2>
                <div class="sh-p-l">
                    <div class="grid-container">
                        <d-card shadow="always" class="card" v-for="element in elements_p" :key="element.id">
                            <h3>{{ element.title }}</h3>
                        </d-card>
                    </div>
                </div>
            </d-card>
            <d-card class="sh-card-w" @click="jumpToW">
                <h2 class="sh-w-t">
                    文档编辑
                </h2>
                <div class="sh-w-l">
                    <div class="grid-container">
                        <d-card shadow="always" class="card" v-for="element in elements_w" :key="element.id">
                            <h3>{{ element.name }}</h3>
                        </d-card>
                    </div>
                </div>
            </d-card>
        </div>
    </d-row>
</template>

<script>
import router from "@/router";
import { ref } from "vue";
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
        const jumpToP = () => {
            router.push('/prototype');
        };

        const jumpToW = () => {
            router.push('/documentadmin');
        };

        return {
            elements_p,
            elements_w,

            jumpToP,
            jumpToW
        }
    }
}
</script>

<style scoped>
.grid-container {
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
    box-sizing: border-box;
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
    height: 76%;
}

.sh-w-l {
    height: 76%;
}
</style>c