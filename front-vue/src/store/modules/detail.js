import axios from "axios";

export default {
    name: 'Detail-vue',
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
        async fetchDetail({commit}, payload) {
            
            // 초기화
            commit('clearProductDetail');
            
            try {
                const response = await axios.get('http://localhost:8040/api/detail?id=' + payload, {}, {
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    }
                });

                console.log(response);

                let temp = {};
                for (const [key, value] of Object.entries(response.data.resultVo)) {
                    temp[key] = value ?? '';
                }
                
                commit('setProductDetail', temp);
            
            } catch(error) {
                console.log(error);
            }
        }
    }
}