// s-2. vuex에서 createStore 함수를 import
import { createStore } from 'vuex'

// s-6. store에서 사용할 module을 import
// 모듈이름은 store의 namespace로 사용하는 모듈이름
import createProduct from './modules/create.js'
import deleteProduct from './modules/delete.js'
import detailProduct from './modules/detail.js'
import listProduct from './modules/list.js'
import updateProduct from './modules/update.js'

// modules 객체에 import한 모듈을 담는다.
const modules = {
    createProduct,
    deleteProduct,
    detailProduct,
    listProduct,
    updateProduct,
}

// s-3. default로 해당 모듈이 포함된 함수를 내보낸다.
// main.js로 이동
export default createStore({
    // s-7. modules export
    // > npm run serve
    // http://localhost:8081/  => 기본페이지
    // src/store/modules/list.js로 이동
    modules
})