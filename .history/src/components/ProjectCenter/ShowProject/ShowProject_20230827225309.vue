<template class="above">
    <d-row class="body">
        <div class="sh-card-container">
            <d-card class="sh-card-p" @click="jumpToP">
                原型设计
            </d-card>
            <d-card class="sh-card-w" @click="jumpToW">
                文档编辑
            </d-card>
        </div>
    </d-row>
</template>

<script>
import router from "@/router";

export default {
    name: "ShowProject",
    setup() {
        const jumpToP = () => {
            router.push('/prototype');
        };

        const jumpToW = () => {
            router.push('/documentadmin');
        };

        return {
            jumpToP,
            jumpToW
        }
    }
}
</script>

<style scoped>
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
}

.sh-card-w {
    display: flex;
    flex: 1;
    margin: 10px;
}

</style>