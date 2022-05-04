import axios from "axios";

export default {
    namespaced: true,
    actions: {
        async updateProduct({commit}, payload) {
            
            try{
                
                const response = await axios.post('http://localhost:8081/api/update', payload, {
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    }
                });
                
                console.log(response);

                commit('clearInputData/clearInputData', {}, { root: true });
            } catch(error) {
                console.log(error);
            }

        }
    }
}