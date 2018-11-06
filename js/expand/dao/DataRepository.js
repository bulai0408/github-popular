import { AsyncStorage } from 'react-native'

export default class DataRepository {
  fetchRepository(url) {
    return new Promise((resolve, reject) => {
      //获取本地的数据
      this.fetchLocalRepository(url)
        .then(res => {
          if (res) { resolve(res) }
          else {
            this.fetchNetRepository(url)
              .then(res => {
                resolve(res);
              })
              .catch(error => resolve(error))
          }
        })
        .catch(error => {
          this.fetchNetRepository(url)
            .then(res => {
              if (!res) {
                reject(new Error('数据为空'));
                return;
              }
              resolve(res.items);
              this.saveRepository(url, res.items);
            })
            .catch(e => resolve(e))
        })
    })
  }

  saveRepository(url, items, callback) {
    if (!url || !items) return;
    let wrapData = { items, update_time: new Date().getTime() };
    AsyncStorage.setItem(url, JSON.stringify(wrapData), callback);
  }

  /**
   * 判断数据是否过时
   * @param {数据的时间戳} time 
   */
  checkData(time) {
    let cDate = new Date();
    let tDate = new Date();
    tDate.setTime(time);
    if (cDate.getMonth() !== tDate.getMonth()) return false;
    if (cDate.getDay() !== tDate.getDay()) return false;
    if (cDate.getHours() - tDate.getHours() > 4) return false;
    return true;
  }

  fetchLocalRepository(url) {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(url, (error, result) => {
        if (!error) {
          try {
            resolve(JSON.parse(result))
          }
          catch (e) {
            reject(e)
          }
        } else {
          reject(error)
        }
      })
    });
  }

  fetchNetRepository = (url) => {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(res => res.json())
        .then(res => { resolve(res) })
        .catch(error => { reject(error) })
    })
  }
}