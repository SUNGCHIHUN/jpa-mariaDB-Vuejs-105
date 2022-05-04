<template>
        <!-- m-3. 자식 컴포넌트에게 props로 key전달 : props로 값을 전달받는다. -->
        <Modal v-if="isModalOpen" @modalClose="closeModal()" :isModalOpen="isModalOpen" />
        <div align="center">
            <!-- s-10. list 결과 출력 -->
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
                        <!-- 데이터 클릭 시 상세페이지로 이동 -->
                        <td @click="moveDetail(product.id)"> {{ product.id }} </td>
                        <td>  {{ product.name }} </td>
                        <td>  {{ product.brand }} </td>
                        <td>  {{ product.madein }} </td>
                        <td>  {{ product.price }} </td>
                        <td>
                            <button @click="updateProduct(product.id)">수정</button> <!-- u-1. -->
                            <button @click="deleteProduct(product.id)">삭제</button> <!-- d-1. -->
                        </td>
                    </tr>
                </tbody>
            </table>
            <button @click="openModal()">등록</button>
        </div>    
</template>

<script>
// vue lifeCycle과 ref등의 객체, computed, watch 등의 고유함수를 호출
import Modal from './Modal.vue'
// s-11. useStore 함수를 import
// import { defineComponent } from '@vue/composition-api'
import { onMounted, computed, ref} from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

// composition API의 사용
// https://v3.ko.vuejs.org/api/composition-api.html
// composition API는 기존 vue2(Global API)의 script 상에서 소스의 규모가 커질수록
// data나 method를 찾아 연결하는 것이 불편하여 새로이 개선된 script 작성 방법이다.
// setup() 함수를 export default 객체 내부에 선언해 사용한다.
// 추후에는 <script setup>으로 더 간략화된 문법으로 사용이 가능하며, export가 필요없이 defileProps, defileEmits등의 함수로 data 전달이 가능

export default {
    name: 'Product-vue',
    components: {
        Modal,
    },
    // setup() 함수는 vue2의 created() 상태와 동일하며, DOM이 만들어질 때 호출되는 함수이다.
    setup(){
        // s-12. composition API에서는 userStore 함수를 내부에서 store 변수에 대입해 사용
        const router = useRouter();
        const store = useStore()

        // s-13. computed() : store를 반응형으로 받는 두가지 방법중 하나
        // 주로 리스트나 상세 데이터 등 화면상에서 직접 변경하지 않는 객체를 쓰기 위해 사용
        const productList = computed(() => {
            // vue 파일에서 state를 받는 방법
            // store.state.(모듈이름).(state이름)
            return store.state.listProduct.productList
        })

        // m-1. 모달창을 표시하기 위한 객체 기본값은 닫힌 상태(false), template 영역의 Modal 컴포넌를 확인
        const isModalOpen = ref(false);

        // m-2. 모달 렌더링용 함수 생성
        // 모달 띄움
        const openModal = () => {
            alert('openModal()');
            isModalOpen.value = true;
        }

        // 모달 닫음
        const closeModal = () => {
            isModalOpen.value = false;
        }

        // d-4 router/index.js에서 상세페이지로(detail?id=id)로 이동
        const moveDetail = (id) => {
            // 방법1. query
            router.push( {
                name: 'detail',
                query: {
                    id: id
                }
            });

            // // 방법2. path는 query와 달리 주소에 표기되지 않음
            // router.push({
            //     path: '/detail',
            //     param: {
            //         id: id
            //     }
            // })
        };

        // Detail.vue의 스크립트 영역으로 이동

        // d-2. 삭제함수 생성, id 매개변수로 받음
        const deleteProduct = async (id) => {
            // store.dispatch('modules.index.js의 모듈명]/함수명', 매개변수);
            await store.dispatch('deleteProduct/deleteProduct', id);
            await store.dispatch('listProduct/fetchList');
        }

        // u-2. 수정함수 생성
        // components/Update.vue 생성 및 작성
        // router/index.js() path 추가
        // src/store/modules/update.js로 이동
       const updateProduct = (id) => {
            router.push({
                path: '/update',
                query: {
                    id: id
                }
            })
        }

        // 라이프사이클
        // vue2의 mounted()와 동일한 역할(DOM에 해당 component가 구성된 상태)
        // mounted()의 시점은 created의 시점보다 나중이므로
        // (property).(name)의 null 에러를 방지하기 위해 리스트 호출을 나중에 함
        // async .. await 문법을 적용해 비동기로 사용이 가능
        onMounted(async () => {
            // s-14. store의 actions의 호출방법, backend와 통신
            // store.dispatch('[모듈이름]/[action이름]')
            await store.dispatch('listProduct/fetchList')
        })

        // s-15. setup() 함수 안에서 작성한 객체들을 return해야 html영역에서 해당 객체를 사용가능
        return {
            productList,
            isModalOpen,
            openModal,
            closeModal,
            deleteProduct, // d-3.
            updateProduct, // u-3.
            moveDetail,
        }
        // 반드시 이클립스 톰캣 실행, Postman에서 Header값 추가 -> send 버튼 -> 리스트 결과 출력
        // 실행 : npm run serve 실행
    },
}
</script>