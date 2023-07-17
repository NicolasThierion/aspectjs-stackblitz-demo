// Import stylesheets
import './style.css';
import './aop';
import { Validated } from './annotations/validated.annotation';
// Write TypeScript code!
const appDiv: HTMLElement = document.getElementById('app');

class Controller {
  submitForm(@Validated() comment: Comment) {
    console.log('submit');
    return false;
  }
}

(window as any).controller = new Controller();
