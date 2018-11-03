export default class DataRepository {
  fetchNetRepository = (url) => {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(res => res.json())
        .then(res => { resolve(res) })
        .catch(error => { reject(error) })
    })
  }
}