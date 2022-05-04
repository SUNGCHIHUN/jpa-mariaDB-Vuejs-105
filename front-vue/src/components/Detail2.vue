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
import { useRouter, useRoute } from 'vue-router'
import { onMounted, onUnmounted, computed } from 'vue'
import { useStore } from 'vuex'

export default {
    name: 'Detail-vue',
    setup() {
        const router = useRouter();
        const route = useRoute();
        const store = useStore();
    
        // 변하지 않는 데이터를 처리하기 위해서는 computed가 적합 cf) I, U의 변하는 데이터 처리를 위해서는 reactive() 사용
        // 위의 테이블에 해당 data가 매핑
        const data = computed(() => {
            return store.state.detailProduct.productDetail;            
        });
        // 돌아가기
        const moveRouter = () => {
            router.push({
                name: 'product',
            })
        }

        onMounted(async () => {
            // d-4. route에서 지정한 query의 key(Product.vue에서 제품정보 클릭시, 넘어온 값)값을 전달
            await store.dispatch('detailProduct/fetchDetail', route.query.id);
            console.log('detail - onMounted data : ' + data.value); // 화면에 출력할 데이터
        });
        
        onUnmounted(() => {
            store.commit('detailProduct/clearProductDetail');
        });

        return {
            data,
            moveRouter,
        }
    },
}
</script>