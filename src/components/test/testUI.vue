<template>
    <div class="big">
        <div class="grid-container">
            <div class="card" v-for="element in elements" :key="element.id">
                <h3>{{ element.title }}</h3>
                <p>{{ element.content }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.big {
    width: 50vw;
    height: 50vh;
}

.grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); /* 自动适应列宽度，每列最小300px宽 */
    gap: 20px; /* 设置网格间距 */
    width: 100%;
    height: 100%;
    overflow: auto;
}

.card {
    border: 1px solid #ccc;
    padding: 20px;
    background-color: #fff;
}
</style>

<script>
export default {
    data() {
        return {
            elements: [
                { id: 1, title: 'Card 1', content: 'Content for Card 1' },
                { id: 2, title: 'Card 2', content: 'Content for Card 2' },
                { id: 3, title: 'Card 3', content: 'Content for Card 3' },
                { id: 1, title: 'Card 1', content: 'Content for Card 1' },
                { id: 2, title: 'Card 2', content: 'Content for Card 2' },
                { id: 3, title: 'Card 3', content: 'Content for Card 3' },
                { id: 1, title: 'Card 1', content: 'Content for Card 1' },
                { id: 2, title: 'Card 2', content: 'Content for Card 2' },
                { id: 3, title: 'Card 3', content: 'Content for Card 3' },
                { id: 1, title: 'Card 1', content: 'Content for Card 1' },
                { id: 2, title: 'Card 2', content: 'Content for Card 2' },
                { id: 3, title: 'Card 3', content: 'Content for Card 3' },
                { id: 1, title: 'Card 1', content: 'Content for Card 1' },
                { id: 2, title: 'Card 2', content: 'Content for Card 2' },
                { id: 3, title: 'Card 3', content: 'Content for Card 3' },
                { id: 1, title: 'Card 1', content: 'Content for Card 1' },
                { id: 2, title: 'Card 2', content: 'Content for Card 2' },
                { id: 3, title: 'Card 3', content: 'Content for Card 3' },
                { id: 1, title: 'Card 1', content: 'Content for Card 1' },
                { id: 2, title: 'Card 2', content: 'Content for Card 2' },
                { id: 3, title: 'Card 3', content: 'Content for Card 3' },
                { id: 1, title: 'Card 1', content: 'Content for Card 1' },
                { id: 2, title: 'Card 2', content: 'Content for Card 2' },
                { id: 3, title: 'Card 3', content: 'Content for Card 3' },
                { id: 1, title: 'Card 1', content: 'Content for Card 1' },
                { id: 2, title: 'Card 2', content: 'Content for Card 2' },
                { id: 3, title: 'Card 3', content: 'Content for Card 3' },
                { id: 1, title: 'Card 1', content: 'Content for Card 1' },
                { id: 2, title: 'Card 2', content: 'Content for Card 2' },
                { id: 3, title: 'Card 3', content: 'Content for Card 3' },
                { id: 1, title: 'Card 1', content: 'Content for Card 1' },
                { id: 2, title: 'Card 2', content: 'Content for Card 2' },
                { id: 3, title: 'Card 3', content: 'Content for Card 3' },
                { id: 1, title: 'Card 1', content: 'Content for Card 1' },
                { id: 2, title: 'Card 2', content: 'Content for Card 2' },
                { id: 3, title: 'Card 3', content: 'Content for Card 3' },
                { id: 1, title: 'Card 1', content: 'Content for Card 1' },
                { id: 2, title: 'Card 2', content: 'Content for Card 2' },
                { id: 3, title: 'Card 3', content: 'Content for Card 3' },
                { id: 1, title: 'Card 1', content: 'Content for Card 1' },
                { id: 2, title: 'Card 2', content: 'Content for Card 2' },
                { id: 3, title: 'Card 3', content: 'Content for Card 3' },
                { id: 1, title: 'Card 1', content: 'Content for Card 1' },
                { id: 2, title: 'Card 2', content: 'Content for Card 2' },
                { id: 3, title: 'Card 3', content: 'Content for Card 3' },
                { id: 1, title: 'Card 1', content: 'Content for Card 1' },
                { id: 2, title: 'Card 2', content: 'Content for Card 2' },
                { id: 3, title: 'Card 3', content: 'Content for Card 3' },
                { id: 1, title: 'Card 1', content: 'Content for Card 1' },
                { id: 2, title: 'Card 2', content: 'Content for Card 2' },
                { id: 3, title: 'Card 3', content: 'Content for Card 3' },
                { id: 1, title: 'Card 1', content: 'Content for Card 1' },
                { id: 2, title: 'Card 2', content: 'Content for Card 2' },
                { id: 3, title: 'Card 3', content: 'Content for Card 3' },
                { id: 1, title: 'Card 1', content: 'Content for Card 1' },
                { id: 2, title: 'Card 2', content: 'Content for Card 2' },
                { id: 3, title: 'Card 3', content: 'Content for Card 3' },
                // 其他元素...
            ]
        };
    },

}
</script>