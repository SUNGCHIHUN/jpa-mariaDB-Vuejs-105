import axios from "axios";

export default {
    namespaced: true,
    state: {
        productDetail: {}        
    },
    mutations: {
        setProductDetail(state, payload) {
            state.productDetail = payload;
        },
        clearProductDetail(state) {
            state.productDetail.length = 0;
        }
    },
    actions: {
        async fetchDetail({state, commit}, payload) {
            // 초기화
            commit('clearProductDetail');
            
            try {
                let response = await axios.get('http://localhost:8040/api/detail?id=' + payload, {}, {
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    }
                });
                console.log(response);

                let temp = {};
                for (const [key, value] of Object.entries(response.data.resultVo)) {
                    temp[key] = value ?? '';
                }
                console.log(temp);
                commit('setProductDetail', temp);
                console.log('Detail-fetchDetail state 확인 : ', state.productDetail);
            } catch(error) {
                console.log(error);
            }
        }
    }
}