import { Types } from 'mongoose';
import _ from 'lodash';
export function convertToObjectId(id: string) {
  return new Types.ObjectId(id);
}
export function getFields({ fields = [], object = {} }: { fields: string[]; object: any }) {
  return _.pick(object, fields);
}
export function getSelectData(select = []) {
  return Object.fromEntries(select.map(item => [item, 1]));
}
export function getUnSelectData(select = []) {
  return Object.fromEntries(select.map(item => [item, 0]));
}
export function removeUndefinedAndNullObject(obj) {
  Object.keys(obj).forEach(key => {
    if (obj[key] == null || obj[key] == undefined) delete obj[key];
  });
  return obj;
}

export function updateNestedObjectParser(obj) {
  const final = {};
  Object.keys(obj).forEach(key => {
    if (typeof obj[key] == 'object' && !Array.isArray(obj[key])) {
      const response = updateNestedObjectParser(obj[key]);
      Object.keys(response).forEach(subKey => {
        final[`${key}.${subKey}`] = response[subKey];
      });
    } else {
      final[key] = obj[key];
    }
  });
  return final;
}
