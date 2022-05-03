import { createApp } from 'vue'
import App from './App.vue'
// s-4. 만들어진 store 모듈을 불러온다. 페이지 하단으로 이동
import store from './store/index'

// r-3. 만들어진 router 모듈을 불러온다. 페이지 하단으로 이동
import router from './router/index'
import 'bootstrap/dist/css/bootstrap.min.css'

/*
 s-1. store 구성
 터미널에서 npm install vuex@next -- save를 입력

 src 하위에 store 폴더를 만들고
 그 하위에 index.js 파일과 modules 폴더를 만든다.
 각 모듈 파일 생성

 src/store/index.js 파일을 열어 기본 store 구성
*/

/*
    r-1. vue-router 구성
    vue-router는 SPA(Single Page App)에서 생성된 DOM의 일부를 
    url 주소 변경을 감지해 설정한 element에서 부분 렌더링을 할 수 있게 하는 plugin이다.

    터미널에서 npm install vue-router --save를 입력

    src 하위에 router 폴더를 만들고
    그 하위에 index.js를 만든다.

    src/router/index.js 파일을 열어 기본 store 구성
 */

// s-5. r-4
createApp(App).use(store).use(router).mount('#app');