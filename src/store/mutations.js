import {ADD_COUNTER,ADD_TO_CART} from "./mustations_const.js"

export default {
  // 参数1:state,2:payload
/*   addList(state, payload) {
    // //1.判断是否是同一个商品 (普通的遍历法)
    // let oldProduct = null;
    // for (let item of state.carList) {
    //   //payload新添加的商品
    //   if (item.iid === payload.iid) {
    //     oldProduct = item;
    //   }
    // }
    // console.log(oldProduct);
    // //2.判断oldProduct是否有值
    // if (oldProduct) {
    //   oldProduct.count += 1;
    // } else {
    //   payload.count = 1;
    //   state.carList.push(payload);
    // }

    //因为判断复制逻辑放在actions比较适合
    //1.查找之前是否有该商品
    // 1.1 find函数如果判断是值等于true则返回参数item
    let oldProduct = state.carList.find((item) => item.iid === payload.iid);
    console.log(oldProduct);

    if (oldProduct) {
      oldProduct.count += 1
    } else {
      payload.count = 1;
      state.carList.push(payload);
    }
  } */
  //mutations唯一的目的就是修改state中的状态
  //mutations中的每一个方法尽可能完成的事件比较单一一点
  [ADD_COUNTER](state,payload){
      payload.count++
  },
  [ADD_TO_CART](state,payload){
     state.carList.push(payload);
  }
}