import axios from "axios";

export default {
    // 반드시 namespaced 값이 true여야 모듈 이름을 호출 가능
    namespaced: true,
        
    state: {
        deleteId: '',
    },
    mutations: {
        setDeleteId(state, payload) {
            state.deleteId = payload;
        },
        clearDeleteId(state) {
            state.deleteId = '';
        }
    },
    actions: {
        // d-4. 비동기 처리를 위한 async, await는 actions 함수에만 작동 가능
        async deleteProduct({state, commit}, payload) {
            console.log('payload delete id : ' + payload);

            commit('setDeleteId', payload);

            let param = {
                id: state.deleteId
            }

            try {
                // 외부 api 호출(백엔드와 통신)
                let response = await axios.post('http://localhost:8040/api/delete', param, {
                    header: {
                        'Content-Type': 'application/json; charset=utf-8'
                    }
                });
                console.log(response);
                alert(response.data);

            } catch(error) {
                console.log(error);
            }
        
        }
    }


}