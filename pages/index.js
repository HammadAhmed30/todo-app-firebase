import { AiOutlinePlus } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import { GoSignOut } from "react-icons/go";
import { useAuth } from "@/firebase/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { collection, addDoc, where, query, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";

const arr = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
];




export default function Home() {
    // States
    const [todoInput, setTodoInput] = useState(null)
    const [todos, setTodos] = useState([])

    // Initialization
    const router = useRouter()
    const { authUser, isLoading, signOutHandler } = useAuth()

    // useEffect
    useEffect(() => {
        if (!isLoading && !authUser) {
            router.push("/login")
        }
        else if (!!authUser) {
            fetchTodos()
        }
    }, [authUser, isLoading, todos])

    // Functions

    const addTodo = async () => {
        try {
            if (todoInput === "") {
                return;
            }
            const docRef = await addDoc(collection(db, "todos"), {
                owner: authUser.uid,
                content: todoInput,
                completed: false
            });
        } catch (error) {
            console.log(error)
        }
    }
    const fetchTodos = async () => {
        try {
            let data = []
            const q = query(collection(db, "todos"), where("owner", "==", authUser.uid));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                data.push({ ...doc.data(), id: doc.id })
            });
            setTodos(data)

        } catch (error) {
            console.log(error)
        }
    }

    const deleteTodo = async (docId) =>{
        try {
            let permission = confirm("Are you sure!")
            if(permission){
                await deleteDoc(doc(db, "todos", docId))
                fetchTodos()
                return;
            }
        } catch (error) {
            console.log(error)
        }
    }

    const onCompleteTodoTask = async (event ,docId)=>{
        try {
            await updateDoc(doc(db,"todos",docId),{
                completed : event.target.checked
            })
            fetchTodos()
        } catch (error) {
            console.log(error)
        }
    }


    return isLoading ? "Loading" : (
        <main className="">
            <div className="bg-black text-white w-44 py-4 mt-10 rounded-lg transition-transform hover:bg-black/[0.8] active:scale-90 flex items-center justify-center gap-2 font-medium shadow-md fixed bottom-5 right-5 cursor-pointer" onClick={signOutHandler}>
                <GoSignOut size={18} />
                <span>Logout</span>
            </div>
            <div className="max-w-3xl mx-auto mt-10 p-8">
                <div className="bg-white -m-6 p-3 sticky top-0">
                    <div className="flex justify-center flex-col items-center">
                        <span className="text-7xl mb-10">📝</span>
                        <h1 className="text-5xl md:text-7xl font-bold">
                            ToooDooo's
                        </h1>
                    </div>
                    <div className="flex items-center gap-2 mt-10">
                        <input
                            placeholder={`👋 Hello name, What to do Today?`}
                            type="text"
                            className="font-semibold placeholder:text-gray-500 border-[2px] border-black h-[60px] grow shadow-sm rounded-md px-4 focus-visible:outline-yellow-400 text-lg transition-all duration-300"
                            autoFocus
                            value={todoInput}
                            onChange={(e) => setTodoInput(e.target.value)}
                        />
                        <button className="w-[60px] h-[60px] rounded-md bg-black flex justify-center items-center cursor-pointer transition-all duration-300 hover:bg-black/[0.8]" onClick={()=>{
                            setTodoInput("")
                            addTodo()
                        }}>
                            <AiOutlinePlus size={30} color="#fff" />
                        </button>
                    </div>
                </div>
                <div className="my-10">
                    {todos?.map((todo, index) => (
                        <div key={index} className="flex items-center justify-between mt-4">
                            <div className="flex items-center gap-3">
                                <input
                                    id={`todo-${todo.id}`}
                                    type="checkbox"
                                    className={`w-4 h-4 accent-green-400 rounded-lg`}
                                    checked={todo.completed}
                                    onChange={(e)=>{
                                        onCompleteTodoTask(e, todo.id)
                                    }}
                                />
                                <label
                                    htmlFor={`todo-${todo.id}`}
                                    className={`font-medium  ${todo.completed ? "line-through" : ""}`}
                                >
                                    {todo.content}
                                </label>
                            </div>

                            <div className="flex items-center gap-3">
                                <MdDeleteForever
                                onClick={()=>{
                                    deleteTodo(todo.id)
                                }}
                                    size={24}
                                    className="text-red-400 hover:text-red-600 cursor-pointer"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
