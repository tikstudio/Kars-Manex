import Contact from '../../Api';
import {define} from '../../helpers/redux-request'

export const SEND_MAIL = define('SEND_MAIL');

export function sendMessage(formData) {
    return SEND_MAIL.request(() => Contact.sendMail(formData)).takeLatest();
}
