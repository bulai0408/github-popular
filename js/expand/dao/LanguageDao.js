import { AsyncStorage } from 'react-native'
import keys from '../../../res/data/keys.json';

const FLAG_LANGUAGE = { flag_langugage: 'flag_language_language', flag_key: 'flag_language_key' };

class LanguageDao {
  constructor(flag) {
    this.flag = flag;
  }
  fetch = () => {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(this.flag, (error, result) => {
        if (error) {
          reject(error);
        } else {
          if (result) {
            try {
              resolve(JSON.parse(result));
            }
            catch (error) {
              reject(error)
            }
          } else {
            var data = this.flag === FLAG_LANGUAGE.flag_key ? keys : null;
            this.save(data);
            resolve(data);
          }
        }
      });
    })
  }

  save = (data) => {
    try {
      AsyncStorage.save(this.flag, JSON.stringify(data));
    } catch (error) {

    }
  }
}

export {
  FLAG_LANGUAGE,
  LanguageDao
}