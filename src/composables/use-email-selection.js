import { reactive } from "vue";
import axios from "axios";

const emails = reactive(new Set());
export default function() {
  const toggle = (email) => {
    if (emails.has(email)) {
      emails.delete(email);
    } else {
      emails.add(email);
    }
  };
  const clear = () => emails.clear();
  const addMultiple = (newEmails) => {
    newEmails.forEach((email) => emails.add(email));
  };

  const forSelected = (fn) => {
    emails.forEach((email) => {
      fn(email);
      axios.put(`http://localhost:3000/emails/${email.id}`, email);
    });
  };

  const markUnread = () => forSelected((e) => (e.read = false));
  const markRead = () => forSelected((e) => (e.read = true));
  const archive = () => {
    forSelected((e) => (e.archived = true));
    clear();
  };
  return { emails, toggle, clear, addMultiple, markUnread, markRead, archive };
}
