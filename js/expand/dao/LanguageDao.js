import { AsyncStorage } from 'react-native'
import keys from '../../../res/data/keys.json';

export const FLAG_LANGUAGE = { flag_langugage: 'language_dao_language', flag_key: 'language_dao_key' };
// export const FLAG_LANGUAGE = { flag_langugage: 'flag_language_language', flag_key: 'flag_language_key' };

export default class LanguageDao {
  constructor(flag) {
    this.flag = flag;
  }
  fetch = () => {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(this.flag, (error, result) => {
        if (error) {
          reject(error);
          return;
        }
        if (!result) {
          var data = this.flag === FLAG_LANGUAGE.flag_key ? keys : null;
          this.save(data);
          resolve(data);
        } else {
          try {
            resolve(JSON.parse(result));
          }
          catch (error) {
            reject(error)
          }
        }
      });
    })
  }

  save = (objectData) => {
    var stringData = JSON.stringify(objectData);
    console.log(objectData);
    try {
      AsyncStorage.setItem(this.flag, stringData);
    } catch (error) {

    }
  }
}