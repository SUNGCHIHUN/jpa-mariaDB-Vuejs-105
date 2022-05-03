<template>
    <!-- c-0. Modal 화면에 입력 -->
    <!-- telport는 html tag 작성 순서와 상관없이 
         해당 영역의 컴포넌트를 렌더링
         to로 자식 element를 public/index.html의 id에 렌더링 함 -->
    <teleport to="#modal">
        <!-- 반응형 데이터에 따라서 class나 style을 변경할 수 있다. -->
        <div class="modal" :class="isModalOpen ? 'show' : ''">
            <div class="modal_body">
                <h2>상품 등록</h2>
                <table>
                    <tbody>
                        <tr>
                            <th>Product Name</th>
                            <td><input type="text" v-model="inputName" placeholder="Product Name..."></td>
                        </tr>
                        <tr>
                            <th>Product Brand</th>
                            <td><input type="text" v-model="inputBrand" placeholder="Product Brand..."></td>
                        </tr>
                        <tr>
                            <th>Product Madein</th>
                            <td><input type="text" v-model="inputMadein" placeholder="Product Madein..."></td>
                        </tr>
                        <tr>
                            <th>Product Price</th>
                            <td><input type="text" v-model="inputPrice" placeholder="Product Price..."></td>
                        </tr>
                    </tbody>
                </table>
                <button @click="regProduct()">등록</button>
                <button @click="closeModal()">닫기</button>
            </div>
        </div>
    </teleport>
</template>

<script>
import {onUnmounted, reactive, toRefs, watch} from 'vue'
import {useStore} from 'vuex'

export default {
    name: 'modal-view',
    
    // Product.vue에서 넘긴 값을 받을 때 props 사용
    // Product.vue로 전달할 때 $emit 사용
    // $emit은 1번만 사용
    props: {
        isModalOpen: Boolean
    },
    emits: ['modalClose'],
    
    // setup 함수 내부에서 props, emit을 쓰기 위한 설정
    setup(props, { emit }) {
        const store = useStore();

        // reactive() : computed와 다른 용도로 사용하는 반응형 객체
        // 주로 Array, Object에 사용
        // v-model을 사용해서 화면상에서 input 태그에 연결된 객체의 값을 변경하고 싶을 때 사용
        // store.state.[모듈이름] => 해당 모듈의 state의 객체를 담겠다는 의미
        const createData = reactive(store.state.createProduct);
        const {
            inputName,
            inputBrand,
            inputMadein,
            inputPrice
        } = toRefs(createData)
        // 동일 의미
        // const inputName = ref(createData.inputName);
        // const inputBrand = ref(createData.inputBrand);
        // const inputMadein = ref(createData.inputMadein);
        // const inputPrice = ref(createData.inputPrice);

        // console.log('store data', store.state.[모듈명].inputName)
        // watch(감시하다)를 통해 input태그에 입력한 값을 감지해서 newValue에 담아 create.js의 mutations: setInputDate()의 payload로 전달
        watch(inputName, (newValue) => {
            console.log('inputName : ' + newValue);
            store.commit('createProduct/setInputData', newValue);
            console.log('store data : ' + store.state.createProduct.inputName);
        });

        watch(inputBrand, (newValue) => {
            console.log('inputBrand : ' + newValue);
            store.commit('createProduct/setInputData', newValue);
            console.log('store data : ' + store.state.createProduct.inputBrand);
        });

        watch(inputMadein, (newValue) => {
            console.log('inputMadein : ' + newValue);
            store.commit('createProduct/setInputData', newValue);
            console.log('store data : ' + store.state.createProduct.inputMadein);
        });

        watch(inputPrice, (newValue) => {
            console.log('inputPrice : ' + newValue);
            store.commit('createProduct/setInputData', newValue);
            console.log('store data : ' + store.state.createProduct.inputPrice);
        });

        // c-1. 화면에서 입력받은 값을 등록하는 함수 작성
        const regProduct = async () => {
            // c-2. 새로운 객체 생성 후 Backend의 jpa의 VO property에 맞춰서 key값을 설정
            // => insert 위한 값 전달을 위한 것
            let regObj = {
                name: inputName.value ?? '',
                brand: inputBrand.value ?? '',
                madein: inputMadein.value ?? '',
                price: inputPrice.value ?? '',
            }

            // c-3. actions를 호출(dispatch)
            // => src/store/modules/create.js
            // => actions 내부의 createProduct(), fetchList() 함수 호출
            await store.dispatch('createProduct/createProduct', regObj);
            await store.dispatch('listProduct/fetchList');
            
            //  입력이 끝나면 Modal 닫기(emit으로 함수 호출)
            closeModal();
        };

        // emit으로 modal을 닫는 함수를 호출
        const closeModal = () => {
            emit('modalClose');
        };
        // Product.vue <Modal @modalClose="closeModal()" /> 추가

        // LifeCycle 모달이 닫힐 때 실행됨
        onUnmounted(() => {
            store.commit('createProduct/clearInputData');
        });

        return {
            inputName,
            inputBrand,
            inputMadein,
            inputPrice,
            regProduct,
            closeModal,
        }
    }
}

</script>

<style>
.modal {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: none;
    background-color: rgba(0, 0, 0, 0.4);
}

.modal.show {
    display: block;
}

.modal_body {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 400px;
    height: 600px;
    padding: 40px;
    text-align: center;
    background-color: rgb(255, 255, 255);
    border-radius: 10px;
    box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);

    transform: translateX(-50%) translateY(-50%);
}
</style>