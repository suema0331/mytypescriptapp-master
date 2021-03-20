// Component Class
// 画面表示するための汎用的な処理

    export default abstract class Component<T extends HTMLElement, U extends HTMLElement> {
        templateElement: HTMLTemplateElement;
        hostElement: T; //クラスごとに異なる型を指定可能
        element: U;

        constructor(templateId: string,
                    hostElementId: string,
                    insertAtStart: boolean,
                    newElementId?: string, //任意の引数は最後
        ) {
            this.templateElement = document.getElementById(templateId)! as HTMLTemplateElement;　//templateElementへの参照
            this.hostElement = document.getElementById(hostElementId)! as T;  //親要素への参照

            //インスタンス作成時にテンプレートに表示する
            const importedNode = document.importNode(this.templateElement.content, true); //templateタグの内側のタグを取得、子要素も取得する
            //DOMに追加したい具体的な要素を格納
            this.element = importedNode.firstElementChild as U;
            if (newElementId) {
                this.element.id = newElementId; //テンプレートリテラルでstyleを当てる
            }

            this.attach(insertAtStart);
        }

        abstract configure(): void;

        abstract renderContent(): void;

        //hostElementに要素を追加
        private attach(insertAtBeginniing: boolean) {
            this.hostElement.insertAdjacentElement(
                insertAtBeginniing ? 'afterbegin' : 'beforeend',
                this.element);
        }
    }
