<template>
    <!-- u-5 -->
    <div align="center">
        <h1> 수정 </h1>
        <table>
            <tr>
                <th>Product Id</th>
                <td>{{ id }}</td>
            </tr>
            <tr>
                <th>Product Name</th>
                <td><input type="text" v-model="name" placeholder="Name..."></td>
            </tr>
            <tr>
                <th>Product Brand</th>
                <td><input type="text" v-model="brand" placeholder="Brand..."></td>
            </tr>
            <tr>
                <th>Product Madein</th>
                <td><input type="text" v-model="madein" placeholder="Madein..."></td>
            </tr>
            <tr>
                <th>Product Price</th>
                <td><input type="number" v-model="price" placeholder="Price..."></td>
            </tr>
        </table>
        <button @click="updateProduct">수정</button>
        <button @click="moveHome">취소</button>
    </div>
</template>

<script>
import { onMounted, onUnmounted, reactive, toRefs } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'

export default ({
    name: 'update-vue',
    setup() {
        const router = useRouter();
        const route = useRoute();
        const store = useStore();

        // u-6. 상세 데이터를 가져옴
        const updateData = reactive(store.state.detailProduct.productDetail);        
        
        // toRefs : 해당 키값과 동일하게 매핑
        // 부트의 vo == input name == state 변수명
        // es6의 비구조화 할당
        const {
            id,
            name,
            brand,
            madein,
            price
        } = toRefs(updateData);
        // 같은 의미
        // const id = ref(updateData.id);

        const updateProduct = async() => {
            let updObj = {
                id: id.value ?? '',
                name: name.value ?? '',
                brand: brand.value ?? '',
                madein: madein.value ?? '',
                price: price.value ?? 0
            }

            console.log('update Object : ' + updObj);
            await store.dispatch('updateProduct/updateProduct', updObj);
            moveHome();
        }
        
        const moveHome = () => {
            router.push({
                name: 'product'
            });
        }

        onMounted(async () => {
            await store.dispatch('detailProduct/fetchDetail', route.query.id);
            console.log('onMounted data : ' + updateData);
        });

        onUnmounted(() => {
            store.commit('detailProduct/clearProductDetail');
        });

        return {
            id,
            name,
            brand,
            madein,
            price,
            updateProduct,
            moveHome,
        }
        
    },
});

</script>