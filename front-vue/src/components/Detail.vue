<template>
    <div align="center">
        <h1>상세</h1>
        <table>
            <tr>
                <th>Product Id</th>
                <td>{{ data.id }}</td>
            </tr>
            <tr>
                <th>Product Name</th>
                <td>{{ data.name }}</td>
            </tr>
            <tr>
                <th>Product Brand</th>
                <td>{{ data.brand }}</td>
            </tr>
            <tr>
                <th>Product Madein</th>
                <td>{{ data.madein }}</td>
            </tr>
            <tr>
                <th>Product price</th>
                <td>{{ data.price }}</td>
            </tr>
        </table>
        <button @click="moveRouter()">돌아가기</button>
    </div>
</template>

<script>
import { onMounted, onUnmounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'

export default {
    name: 'Detail-vue',
    setup() {

        const router = useRouter();
        const route = useRoute();
        const store = useStore();

        const data = computed(() => {
            return store.state.detailProduct.productDetail;
        });

        const moveRouter = () => {
            router.push({
                name: 'product',
            });
        }
        
        onMounted(async () => {
            await store.dispatch('fetchDetail', route.query.id);
        });
        
        onUnmounted(() => {
            store.commit('detailProduct/clearProductDetail');
        });
        
        return {
            data,
            moveRouter,
        }
    }
}
</script>
