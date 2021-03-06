import axios from "axios";

export default {
    namespaced: true,
    state: {
        deleteId: 0,
    },
    mutations: {
        setDeleteId(state, payload) {
            state.deleteId = payload;
        }
    },
    actions: {
        async deleteProduct({state, commit}, payload) {
            // deleteId 0 초기화
            
            commit('setDeleteId', payload);
            let param = {
                id: state.deleteId
            }

            try {
                // 스프링 부트에서 axios 요청 후 응답 받아오기
                let response = await axios.post('http://localhost:8040/api/delete', param, {
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    }
                });
                
                console.log(response);

            } catch(error) {
                console.log(error);
            }
        }
    }
}