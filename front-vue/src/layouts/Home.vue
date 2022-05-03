<template>
    <Content />
    <Footer />
</template>

<script>
import Content from './content/index.vue'
import Footer from './footer/index.vue'
// import Home from '../../components/Product.vue'

export default {
    name: 'home-vue',
    components: {
        Content,
        Footer,
    }
}
</script>