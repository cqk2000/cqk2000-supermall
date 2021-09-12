import { ADD_COUNTER, ADD_TO_CART } from "./mustations_const.js"

export default {
  //参数一:context 上下文
  addList(context, payload) {
    //因为判断复制逻辑放在actions比较适合
    //1.查找之前是否有该商品
    // 1.1 find函数如果判断是值等于true则返回参数item
    let oldProduct = context.state.carList.find((item) => item.iid === payload.iid);
    return new Promise((resolve, reject) => {
      // console.log(oldProduct);
      if (oldProduct) { //+1
        // oldProduct.count += 1
        context.commit(ADD_COUNTER, oldProduct);
        resolve("商品数量+1")
      } else {//添加新的商品
        resolve("添加新的商品")
        payload.count = 1;
        // state.carList.push(payload);
        payload.checked = true;
        context.commit(ADD_TO_CART, payload);
      }
    })
  }
}