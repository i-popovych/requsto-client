import { toast } from 'react-toastify';

export class Notification {
  static success(message: string) {
    toast.success(message);
  }

  static error(message: string) {
    toast.error(message);
  }
}
