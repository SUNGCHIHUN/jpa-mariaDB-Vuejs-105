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
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'

export default {
    name: 'Update-vue',
    setup() {
        
        const store = useStore();
        const route = useRoute();
        const router = useRouter();

        const updateData = reactive(store.state.detailProduct.productDetail);
        
        const {
            id,
            name,
            brand,
            madein,
            price
        } = toRefs(updateData);

        const updateProduct = async () => {
            let updateObj = {
                id: id.value ?? '',
                name: name.value ?? '',
                brand: brand.value ?? '',
                madein: madein.value ?? '',
                price: price.value ?? ''
            }

            await store.dispatch('updateProduct/updateProduct', updateObj);
            moveHome();
        }

        const moveHome = () => {
            router.push({
                name: 'product'
            });
        }

        onMounted(async () => {
            await store.dispatch('detailProduct/fetchDetail', route.query.id);
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
            moveHome,
            updateProduct,
        }

    },
}
</script>