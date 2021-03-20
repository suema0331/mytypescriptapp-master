// Drag & Drop
    export interface Draggable{ //
        dragStartHandler(event: DragEvent):void;
        dragEndHandler(event: DragEvent):void;
    }

    export interface DragTarget{ //ドロップ場所対象
        dragOverHandler(event: DragEvent):void; //ブラウザにドラッグドロップをする時にdropできる場所か判断
        dropHandler(event: DragEvent):void; //drop時に呼ばれる。画面、データの更新など
        dragLeaveHandler(event: DragEvent):void; //visualのFBを行い、表示を変更
    }


