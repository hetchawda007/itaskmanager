import React from "react";

interface Task {
    task: string;
    status: string;
    id: number;
}

interface DragProps {
    dragtask: Task;
    setdragtask: React.Dispatch<React.SetStateAction<Task>>;
}

const dragcontext = React.createContext<DragProps | undefined>(undefined)
export default dragcontext;