import axios from "axios"

export default {
    // 반드시 namespaced 값이 true이어야 모듈 이름을 호출 가능
    namespaced: true,
    state: {
        inputName: '',
        inputBrand: '',
        inputMadein: '',
        inputPrice: '',
        result: '',
        msg: ''
    },
    mutations: {
        setInputData(state, payload) {
            console.log('payload : ', payload);
            state[`${payload}`] = payload;
        },
        clearInputDate(state) {
            state.inputName = '';
            state.inputBrand = '';
            state.inputMadein = '';
            state.inputPrice = '';
        },
    },
    actions: {
        async createProduct({ commit }, payload) {
            commit('clearInputDate');
            console.log('create param : ', payload);
        
            try { 
                // parameter를 대입
                // 외부 api를 호출해서 response 변수에 response값을 받아옴

                let response = await axios.post('http://localhost:8040/api/insert', payload, {
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                    }
                });
                
                alert(response.data.resultMsg);
                commit('clearInputData');
                
            } catch(error) {
                console.log(error);
            }
        }
    }
}