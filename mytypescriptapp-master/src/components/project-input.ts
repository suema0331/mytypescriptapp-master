import Cmp from './base-component.js';
import * as Validation from '../util/validation.js';
import {autobind as Autobind} from  '../decorators/autobind.js';
import {projectState} from "../state/project-state.js";

// ProjectInput Class
    export class ProjectInput extends Cmp<HTMLDivElement, HTMLFormElement> {
        titleInputElement: HTMLInputElement;
        descriptionInputElement: HTMLInputElement;
        mandayInputElement: HTMLInputElement;

        constructor() {
            super('project-input', 'app', true, 'user-input');

            //入力フォームへの参照を得る
            this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement; //HTMLElement
            this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement; //HTMLElement
            this.mandayInputElement = this.element.querySelector('#manday') as HTMLInputElement; //HTMLElement

            this.configure();

        }

        //EventListenerでformがsubmitされた時にthis.submitHandler(レシーバ関数)を返す
        configure() {
            //this.element.addEventListener('submit', this.submitHandler); //thisはEventListenerの対象のForm
            //Uncaught TypeError: Cannot read property 'value' of undefined

            this.element.addEventListener('submit', this.submitHandler.bind(this)); //configureメソッドが呼ばれる場所でのオブジェクトをさす
        };

        renderContent() {
        };

        //3つの入力値を得て、バリデーションする
        private getherUserInput(): [string, string, number] | void { //タプルを返す
            const enterdTitle = this.titleInputElement.value;
            const enterdDescription = this.descriptionInputElement.value;
            const enterdManday = this.mandayInputElement.value;

            const titleValidatable: Validation.validatable = {
                value: enterdTitle,
                required: true,
            };
            const descriptionValidatable: Validation.validatable = {
                value: enterdDescription,
                required: true,
                minLength: 5,
            };
            const mandayValidatable: Validation.validatable = {
                value: +enterdManday, //numberに変換
                required: true,
                min: 1,
                max: 1000,
            };

            if (//enterdTitle.trim().length === 0 ||
                //enterdDescription.trim().length === 0 ||
                //enterdManday.trim().length === 0

                !Validation.validate(titleValidatable) ||
                !Validation.validate(descriptionValidatable) ||
                !Validation.validate(mandayValidatable)

            ) {// 一個でもfalseなら失敗
                alert('入力値が正しくありません。再度入力してください');
                return; //戻り値を返さない

            } else {
                return [enterdTitle, enterdDescription, +enterdManday];
            }
        }

        //入力したフォームを空にする
        private clearInputs() {
            this.titleInputElement.value = '';
            this.descriptionInputElement.value = '';
            this.mandayInputElement.value = '';
        };

        //レシーバ関数
        @Autobind
        private submitHandler(event: Event) {
            event.preventDefault(); // httpリクエストが送られない
            console.log(this.titleInputElement.value);
            const userInput = this.getherUserInput(); //ユーザの入力値をえる
            if (Array.isArray(userInput)) { //引数が配列かどうかチェック
                const [title, desc, manday] = userInput;
                projectState.addProject(title, desc, manday);
                //console.log(title,desc,manday); //入力値を取得できてる
                this.clearInputs(); //値をクリアする
            }
        }
    }


