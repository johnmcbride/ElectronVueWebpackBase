<template>
    <div>
        <tree-view :data="jsonSource" :options="{maxDepth: 3}"></tree-view>
    </div>
</template>

<script>
    //import Vue from 'vue'
    import TreeView from "vue-json-tree-view"
    
    Vue.use(TreeView) 
    
    export default {
       
    }
</script>

<style scoped>

</style>