<template>
    

        <div class="itemlist" @dragstart="handleDragStart">
            <div
                v-for="(item, index) in componentList"
                :key="index"
                class="list"
                draggable
                :data-index="index"
            >
        </div>
        </div>

</template>

<script>
// import componentList from '@/custom-component/component-list'

export default {
    data() {
        return {
            // componentList,
        }
    },
    methods: {
        handleDragStart(e) {
            e.dataTransfer.setData('index', e.target.dataset.index)
        },
    }
}
</script>

<style lang="scss" scoped>
.itemlist{
    padding: 10px;
    display: grid;
    grid-gap: 10px 19px;
    grid-template-columns: repeat(auto-fill, 80px);
    grid-template-rows: repeat(auto-fill, 40px);

    .list {
        width: 80px;
        height: 40px;
        border: 1px solid #ddd;
        cursor: grab;
        text-align: center;
        color: #333;
        padding: 2px 5px;
        display: flex;
        align-items: center;
        justify-content: center;
    
        &:active {
            cursor: grabbing;
        }
    }
}
</style>
