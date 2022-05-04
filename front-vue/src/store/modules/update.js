import axios from "axios";

export default {
    namespaced: true,
    actions: {
        async updateProduct({commit}, payload) {
            
            try{
                
                let response = await axios.post('http://localhost:8081/api/update', payload, {
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    }
                });
                
                console.log(response.data.resultMsg);

                commit('clearInputData/clearInputData', {}, { root: true });
            } catch(error) {
                console.log(error);
            }

        }
    }
}