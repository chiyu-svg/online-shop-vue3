/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
// 声明导出 json 模块
declare module '*.json' {
  const value: any;
  export default value;
}
 
