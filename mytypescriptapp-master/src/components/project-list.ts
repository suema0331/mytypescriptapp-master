import {DragTarget} from '../models/drag-drop.js';
import {Project,ProjectStatus} from "../models/project.js";
import Component from "./base-component.js";
import {autobind} from "../decorators/autobind.js";
import {projectState} from "../state/project-state.js";
import {ProjectItem} from "./project-item.js";

// ProjectList Class
    export class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget {

        assignedProjects: Project[];

        //必要な要素への参照
        constructor(private type: 'active' | 'finished') { //自動でプロパティ作成
            super('project-list', 'app', false, `${type}-projects`)

            this.assignedProjects = [];

            this.configure();
            this.renderContent();
        }

        @autobind
        dragOverHandler(event: DragEvent) {
            // テキストであることを確認
            if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
                //このeventに対し、dragdropのみが許可される
                event.preventDefault();

                //箱の背景色を変える
                const listEl = this.element.querySelector('ul')!;
                listEl.classList.add('droppable');

            }
        }

        @autobind
        dropHandler(event: DragEvent) {
            //console.log(event.dataTransfer!.getData('text/plain')); //prjid 0.0665393122122177
            const prjId = event.dataTransfer!.getData('text/plain');
            projectState.moveProject(prjId,
                this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Fiinished);
        }

        @autobind
        dragLeaveHandler(_event: DragEvent) {
            //リストから離れた時にスタイルを戻す
            const listEl = this.element.querySelector('ul')!;
            listEl.classList.remove('droppable');
        }

        //listenerの設定
        configure() {

            this.element.addEventListener('dragover', this.dragOverHandler);
            this.element.addEventListener('drop', this.dropHandler);
            this.element.addEventListener('dragleave', this.dragLeaveHandler);

            //状態変更があれば、listenerの関数を呼ぶ
            projectState.addlistener((projects: Project[]) => {
                const relevantProjects = projects.filter(prj => {
                    //filter関数の返り値がtrueの場合、filter後の配列に含める。元の配列は変化しない
                    if (this.type === 'active') {
                        return prj.status === ProjectStatus.Active; //activeだったら、activeのもののみ返す
                    }
                    return prj.status === ProjectStatus.Fiinished; //finishedのみ取得
                });
                this.assignedProjects = relevantProjects; //受け取った変更が加えられた配列を受け取る
                this.renderProjects(); //新しいPJが追加された時にレンダ
            });
        }

        //ulにidをつける
        renderContent() { //abstrucyメソッドなので、public
            const listId = `${this.type}-projects-list`;
            this.element.querySelector('ul')!.id = listId;
            this.element.querySelector('h2')!.textContent =
                this.type === 'active' ? '実行中プロジェクト' : '完了プロジェクト';
        }

        private renderProjects() {
            const listEl = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement;
            listEl.innerHTML = ''; //毎回クリア
            for (const prjItem of this.assignedProjects) {

                new ProjectItem(listEl.id, prjItem); //インスタンス作成することで、画面に要素を追加
            }
        }
    }
