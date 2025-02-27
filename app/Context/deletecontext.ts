import React from "react";

interface Task {
    task: string;
    status: string;
    id: number;
}

interface DeleteProps {
    deletetask: boolean;
    setdeletetask: React.Dispatch<React.SetStateAction<boolean>>;
}

const deletecontext = React.createContext<Partial<DeleteProps | undefined>>(undefined)
export default deletecontext;