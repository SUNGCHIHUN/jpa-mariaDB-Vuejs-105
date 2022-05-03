<template>
    <section>
        <!-- router 변경으로 호출한 페이지 컴포넌트가 랜더링되는 부분 -->
        <router-view></router-view>
    </section>
</template>

<script>

export default {
    name: 'content-index',
    setup(){


    },
}
</script>

<style>
section {
    display: flex;
    justify-content: center;
    height: auto;
    min-height: 100%;
    padding-bottom: 300px;
}
</style>
