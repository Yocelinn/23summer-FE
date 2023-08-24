<template>
    <div class="draggable-split-layout">
        <draggable-resizable
            :x="0"
            :y="0"
            :w="leftWidth"
            :h="height"
            :parent="true"
            :ratio="false"
            :draggable="true"
            :resizable="true"
            @resize="onResize"
        >
            <ProjectList />
            <slot name="left"></slot>
        </draggable-resizable>
        <div class="divider"></div>
        <div class="right-content">
            <TeamList />
            <slot name="right"></slot>
        </div>
    </div>
</template>

<script>
import DraggableResizable from 'vue-draggable-resizable';
import ProjectList from "@/components/PersonPage/ProjectList.vue";
import TeamList from "@/components/PersonPage/TeamList.vue";

export default {
    components: {
        TeamList,
        ProjectList,
        DraggableResizable,
    },
    props: {
        leftWidth: {
            type: Number,
            default: 200,
        },
        height: {
            type: Number,
            default: 300,
        },
    },
    methods: {
        onResize(newWidth) {
            this.$emit('update:leftWidth', newWidth);
        },
    },
};
</script>

<style scoped>
.draggable-split-layout {
    display: flex;
    width: 100%;
    height: 100vh;
    overflow: hidden;
}

.divider {
    width: 10px;
    cursor: col-resize;
    background-color: #ccc;
}

.right-content {
    flex: 1;
    overflow: auto;
    padding: 20px;
    background-color: #f0f0f0;
}

/* 自定义左侧区域的样式 */
.left-content {
    padding: 20px;
    background-color: #fff;
    box-shadow: 2px 0px 5px rgba(0, 0, 0, 0.1);
}

/* 自定义分隔条的样式 */
.divider {
    background-color: #e0e0e0;
}

/* 自定义拖动句柄的样式 */
.vue-draggable-resizable-handle {
    background-color: #42b983;
    border-radius: 4px;
}

</style>
