import { Types } from 'mongoose';
import _ from 'lodash';
export function convertToObjectId(id: string) {
  return new Types.ObjectId(id);
}
export function getFields({ fields = [], object = {} }: { fields: string[]; object: any }) {
  return _.pick(object, fields);
}
