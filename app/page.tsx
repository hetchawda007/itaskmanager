"use client"
import { FiTrash } from "react-icons/fi"
import { FaFire } from "react-icons/fa"
import { motion } from "motion/react"
import { useState, useEffect } from "react";
import { IconContext } from "react-icons";
import context from "./Context/context";
import Taskwrapper from "./Components/Taskwrapper";
import dragcontext from "./Context/dragcontext";
import deletecontext from "./Context/deletecontext";
import { getTasks } from "@/Server/useractions";
interface TaskProps {
  task: string,
  status: string,
  id: number
}

export default function Home() {
  const [dragtask, setdragtask] = useState<TaskProps>({ task: '', status: '', id: 0 })
  const [deletetask, setdeletetask] = useState<boolean>(false)
  const [deleteelement, setdeleteelement] = useState<boolean>(false)

  const D_enter = () => {
    setdeleteelement(true)
  }
  const D_Leave = () => {
    setdeletetask(true)
    setdeleteelement(false)
  }

  const [Tasks, setTasks] = useState<TaskProps[]>([])

  useEffect(() => {
    const gettasks = async () => {
      let tasksResponse = await getTasks("het chawda");
      setTasks(tasksResponse)
    }
    gettasks();
  }, [])

  return (
    <deletecontext.Provider value={{ deletetask, setdeletetask }}>
      <dragcontext.Provider value={{ dragtask, setdragtask }}>
        <context.Provider value={{ Tasks, setTasks }}>
          <div className="flex text-white gap-5 p-32 bg-neutral-900 h-[92vh] w-full justify-center items-center">
            <Taskwrapper status="Current" />
            <Taskwrapper status="Inprogress" />
            <Taskwrapper status="Completed" />
            <IconContext.Provider value={{ color: "#6e6e6e", size: "2em" }}>
              {deleteelement === false && <div onDragEnter={D_enter} className="w-[25%] h-72 border self-start bg-[#262626] border-neutral-600 flex justify-center items-center rounded-lg">
                <FiTrash />
              </div>}
            </IconContext.Provider>
            <IconContext.Provider value={{ color: "red", size: "2em" }}>
              {deleteelement === true && <div onDragLeave={D_Leave} className="w-[25%] h-72 border self-start bg-red-950 border-red-600 flex justify-center items-center rounded-lg">
                <motion.div
                  initial={{ y: 0 }}
                  animate={{ y: [0, 5, -5, 0] }}
                  transition={{ repeat: Infinity, ease: "easeInOut", duration: 1 }}
                >
                  <FaFire />
                </motion.div>
              </div>}
            </IconContext.Provider>
          </div >
        </context.Provider>
      </dragcontext.Provider>
    </deletecontext.Provider>
  );
}
