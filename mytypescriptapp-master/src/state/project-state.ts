import {Project,ProjectStatus} from "../models/project.js";


// Project State Management : アプリケーションの状態管理をするクラスを作る
    type Listener<T> = (items: T[]) => void;

    class State<T> {
        //継承先からアクセスOK
        protected listeners: Listener<T>[] = [];  //Stateの型と一致

        addlistener(listenerFn: Listener<T>) {
            this.listeners.push(listenerFn);
        }
    }

    export class ProjectState extends State<Project> {

        private projects: Project[] = [];
        private static instance: ProjectState;

        private constructor() {
            super();
        }

        static getInstance() {
            if (this.instance) {
                return this.instance;
            }
            this.instance = new ProjectState();
            return this.instance;
        }

        //画面でPJが入力されたらリストに追加
        addProject(title: string, description: string, manday: number) {
            const newProject = new Project(
                Math.random().toString(),
                title,
                description,
                manday,
                ProjectStatus.Active,
            );

            this.projects.push(newProject);
            this.updateListeners();
        }

        // dragdrop時にpjのステータスを切り替える
        moveProject(projectId: string, newStatus: ProjectStatus) {
            const project = this.projects.find(prj => prj.id === projectId);
            if (project && project.status !== newStatus) { //statusが更新された時のみ
                project.status = newStatus;
                this.updateListeners(); //変更時にlistenerを呼ぶ（一覧再表示）
            }
        }

        private updateListeners() {
            for (const listenerFn of this.listeners) {
                listenerFn(this.projects.slice()); //projectsの配列のコピーを渡す
            }
        }
    }

    export const projectState = ProjectState.getInstance();

