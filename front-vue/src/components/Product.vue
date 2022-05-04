<template>
        <Modal v-if="isModalOpen" @modalClose="closeModal()" :isModalOpen="isModalOpen" />
        <div align="center">
            <h1> Product List </h1>
            <table>
                <thead>
                    <tr>
                        <th> Product Id </th>
                        <th> Product Name </th>
                        <th> Product Brand </th>
                        <th> Product Madein </th>
                        <th> Product Price </th>
                    </tr>
                </thead>    

                <tbody>
                    <tr v-for="product in productList" v-bind:key="product.id">
                        <td @click="moveDetail(product.id)"> {{ product.id }} </td>
                        <td>  {{ product.name }} </td>
                        <td>  {{ product.brand }} </td>
                        <td>  {{ product.madein }} </td>
                        <td>  {{ product.price }} </td>
                        <td>
                            <button @click="updateProduct(product.id)">수정</button>
                            <button @click="deleteProduct(product.id)">삭제</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <button @click="openModal()">등록</button>
        </div>    
</template>

<script>
import Modal from './Modal.vue'
import { onMounted, computed, ref} from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default {
    name: 'Product-vue',
    components: {
        Modal,
    },
    setup(){
        const store = useStore()

        const productList = computed(() => {
            return store.state.listProduct.productList
        })

        const isModalOpen = ref(false);

        const openModal = () => {
            alert('openModal()');
            isModalOpen.value = true;
        }

        const closeModal = () => {
            isModalOpen.value = false;
        }

        // 삭제함수 생성
        const deleteProduct = async (id) => {
            if(confirm('삭제하시겠습니까?')) {
                await store.dispatch('deleteProduct/deleteProduct', id);
                await store.dispatch('listProduct/fetchList');
            }
        }

        // 상세페이지 이동 함수
        const router = useRouter();
        const moveDetail = (id) => {
            router.push({
                name: 'detail',
                query: {
                    id: id
                }
            })
        }

        // 수정함수 생성
        const updateProduct = (id) => {
            router.push({
                name: 'update',
                query: {
                    id: id
                }
            })
        }

        onMounted(async () => {
            await store.dispatch('listProduct/fetchList')
        })

        return {
            productList,
            isModalOpen,
            openModal,
            closeModal,
            updateProduct,
            deleteProduct,
            moveDetail,
        }
    },
}
</script>