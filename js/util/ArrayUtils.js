export default class ArrayUtils {
  static updateArray(array, item) {
    for (var i = 0, len = array.length; i < len; i++) {
      var temp = array[i];
      if (temp === item) {
        array.splice(i, 1);
        return;
      }
    }
    array.push(item);
  }

  /**
   * 
   * @param {克隆数组} from 
   */
  static clone(from) {
    if (!from) return [];
    let newArray = [];
    for (let i = 0; i < from.length; i++) {
      newArray[i] = from[i]
    }
    return newArray;
  }

  /**
   * 判断两个数组的元素是否一一对应
   * @param {*} arr1 
   * @param {*} arr2 
   */
  static isEqual(arr1, arr2) {
    if (!(arr1 && arr2)) return false;
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr2.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  }
}