<!--整体作为模板不需要大改，10行和22行分别放该页面vue文件和聊天页面vue文件-->
<template>
    <div class="body">
        <section>
            <d-splitter class="splitter-border" :orientation="orientation" :splitBarSize="splitBarSize">
                <template v-slot:DSplitterPane>
                    <d-splitter-pane minSize="40%">
                        <div class="pane-content">
                            <ProjectList/>
                        </div>
                    </d-splitter-pane>
                    <d-splitter-pane
                            collapseDirection="after"
                            :size="size"
                            :minSize="minSize"
                            :collapsible="false"
                            @sizeChange="sizeChange"
                            @collapsedChange="collapsedChange"
                    >
                        <div class="pane-content">
                            <TeamList/>
                        </div>
                    </d-splitter-pane>
                </template>
            </d-splitter>
        </section>
    </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import ProjectList from "@/components/PersonPage/ProjectList/ProjectList.vue";
import TeamList from "@/components/PersonPage/TeamList/TeamList.vue";

export default defineComponent({
    name: 'MainPage',
    components: {TeamList, ProjectList},
    setup() {
        const orientation = ref('horizontal');
        const splitBarSize = '2px';
        // splitter pane input
        const size = ref('34%');
        const minSize = ref('30%');
        const maxSize = ref('70%');
        const sizeChange = (size) => {
            console.log(size);
        };
        const collapsedChange = (event) => {
            console.log(event);
        };

        return {
            orientation,
            splitBarSize,
            size,
            minSize,
            maxSize,
            sizeChange,
            collapsedChange,
        };
    },
});
</script>

<style>
.pane-content {
    padding: 0 5px;
}

.body {
    height: calc(100vh - 70px);
    overflow: hidden;
    display: flex;
    flex-direction: column;
}

.splitter-border {
    border: 1px solid #dfe1e6;
    height: 100%;
}
</style>
