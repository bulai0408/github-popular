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
}