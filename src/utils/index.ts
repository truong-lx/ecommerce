import { Types } from 'mongoose';
export function convertToObjectId(id: string) {
  return new Types.ObjectId(id);
}
