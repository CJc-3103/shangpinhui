// 重写函数
// // 工具函数
// function isObject(obj) {
//     return obj !== null && typeof obj === 'object'
// }

// function isValidMap(map) {
//     return Array.isArray(map) || isObject(map)
// }

// // 一致性处理
// function normalizeNamespace(fn) {
//     return function (store, namespace, map) {
//         if (typeof namespace !== 'string') {
//             map = namespace;
//             namespace = '';
//         } else if (namespace.charAt(namespace.length - 1) !== '/') {
//             namespace += '/';
//         }
//         return fn(store, namespace, map)
//     }
// }
// function normalizeMap(map) {
//     if (!isValidMap(map)) {
//         return []
//     }
//     return Array.isArray(map)
//         ? map.map(function (key) { return ({ key: key, val: key }); })
//         : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
// }

// // 获取模块（也就是命名空间）
// function getModuleByNamespace(store, helper, namespace) {
//     var module = store._modulesNamespaceMap[namespace];
//     if (!module) {
//         console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
//     }
//     return module
// }

// // 最终的导出函数
// export const mapState = normalizeNamespace(function (store, namespace, states) {
//     var res = {};
//     if (!isValidMap(states)) {
//         console.error('[vuex] mapState: mapper parameter must be either an Array or an Object');
//     }
//     normalizeMap(states).forEach(function (ref) {
//         var key = ref.key;
//         var val = ref.val;

//         res[key] = (function mappedState() {
//             var state = store.state;
//             var getters = store.getters;
//             if (namespace) {
//                 var module = getModuleByNamespace(store, 'mapState', namespace);
//                 if (!module) {
//                     return
//                 }
//                 state = module.context.state;
//                 getters = module.context.getters;
//             }
//             return typeof val === 'function'
//                 ? val.call(this, state, getters)
//                 : state[val]
//         })();
//         // mark vuex getter for devtools
//         // res[key].vuex = true;
//     });
//     return res;
//     // 以上是方法 1，通过 IIFE 方式直接获取返回值

//     // 方法 2
//     // res 的属性都是函数，因此需要调用并得到返回值
//     // let statesResult = {};
//     // Object.entries(res).forEach(([key, mapFunc]) => {
//     //     statesResult[key] = mapFunc();
//     // })
//     // return statesResult;
// });

import { mapState as vuexMapState, mapMutations as vuexMapMutations } from 'vuex'

export const mapState = (store, namespace, states) => {
    const mappedStates = vuexMapState(namespace, states);
    let statesResult = {};
    Object.entries(mappedStates).forEach(([key, mapFunc]) => {
        statesResult[key] = mapFunc.call({ '$store': store });
    })
    return statesResult;
}

export const mapMutations = (store, namespace, mutations) => {
    const mappedMutations = vuexMapMutations(namespace, mutations);
    let mutationsResult = {};
    Object.entries(mappedMutations).forEach(([key, mapFunc]) => {
        mutationsResult[key] = mapFunc.bind({ '$store': store });
    })
    return mutationsResult;
}