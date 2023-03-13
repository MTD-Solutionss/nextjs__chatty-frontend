import { floor, random } from 'lodash';
import { avatarColors } from '@utils/static.data';
export class Utils {
  static avatarColor() {
    return avatarColors[floor(random(0.9) * avatarColors.length)];
  }
}
