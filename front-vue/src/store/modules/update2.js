import axios from "axios";

export default {
    namespaced: true,
    actions: {
        async updateProduct({commit}, payload) {
            console.log('payload param: ' + payload);

            try {
                // 외부 api 호출(백엔드와 통신)
                let response = await axios.post('http://localhost:8040/api/update', payload, {
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    }
                });
                
                console.log(response);
                // response의 data로 backend에서 넘겨준 값을 가져온다.
                alert(response.data.resultMsg);
                
                commit('clearInputData/clearInputData', {}, { root: true });
            } catch(error) {
                console.log(error);
            }
        
        }
    }


}