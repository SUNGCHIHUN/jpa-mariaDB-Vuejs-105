/*
    s-8. axios는 외부 api 통신을 위한 자바스크립트 라이브러리
    axios 객체에는 httpMethod 함수가 구성되어 있음(get, post 등등)
    axios.get => get 방식
    axios.post => post 방식
*/

import axios from "axios"

// s-9. 스토어 구성
/*
    state : 브라우저의 로컬 스토리지 영역에 저장되는 내부객체(변수)들의 모임
    getters : state의 값을 변경하지 않지만, 해당 변수를 가공해 사용하는 내부 객체들
    mutations : state를 동기적으로 외부 직접 가공하는 함수들
    actions : vue component에서 비동기적으로 외부 api와의 통신을 담당하는 함수(CRUD)
*/
export default {
    // 반드시 namespaced 값이 ture이어야 해당 모듈 이름을 호출 가능
    namespaced : true,
    // state : 브라우저의 로컬 스토리지 영역에 저장되는 내부객체(변수)들의 모임
    state : {
        productList: []
    },
    getters: {
        productListFilter(state){
            state.productList.filter((x) => {
                x.price > 10000
            })
        }
    },
    // store 영역에서 state 값을 직접 동기적으로 변경하는 함수, actions 내부에서 사용됨 mutations에 선언된 메서드를 호출해서 사용됨, payload는 파라미터
    mutations: {
        setProductList(state, payload) {
            state.productList.push(payload)
        }, 
        clearProductList(state){
            state.productList.length = 0
        }
    },
    // vue 컴포넌트에서 호출하며, 비즈니스 로직을 처리하는 비동기 처리함수, api 통신을 담당(CRUD)
    actions: {
        // 비동기 처리를 위한 async, await는 actions 함수에만 적용가능(mutations에서는 불가)
        // state를 직접 가공하기 위해서 내부에서 호출된 mutation을 사용해 state를 변경한다. ex) commit('mutataion 함수명')
        async fetchList({ state, commit }){

            console.log('dispatch 호출')
            // commit은 mutations에 정의된 함수를 호출, clearProductList는 해당 state에 대한 초기화
            // commit('mutations 함수명')
            commit('clearProductList')

            try{
                let response = await axios.get('http://localhost:8040/api/product', {}, {
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                        // 'Access-Control-Allow-Origin': 'http://localhost',
                        // 'Access-Control-Allow-Headers': '*',
                        // 'Access-Control-Allow-Credentials': 'true'
                    }
                })
                console.log('response 확인: ', response)

                let temp = {}
                for (let newData of response.data){
                    for(const [key,value] of Object.entries(newData)){
                        temp[key] = value ?? ''
                    }
                    commit('setProductList',temp)   // mutation의 setProductList 호출, payload는 temp
                    temp = {}
                }
                console.log('state 확인 : ', state.productList)

            } catch(error){
                console.log(error)
            }
        }
    }
}