import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

interface User {
    _id: string
    username: string
    email: string
    age: number
}
const Home = () => {
    const [users, setUsers] = useState<User[]>([])
    const fetchUser = async () => {
        try {
            const result = await axios.get(' https://todo-app1-30yx.onrender.com/user')
            if (result && result.data) setUsers(result.data)
        } catch (error) {
            console.log(error)
        }
    }
    //delete functions 
    const deleteUser = async (id: string) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;

        try {
            await axios.delete(` https://todo-app1-30yx.onrender.com/user/deleteUser/${id}`)
            setUsers(prevUsers => prevUsers.filter(user => user._id !== id))
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        // axios
        //     .get("http://localhost:4000/user")
        //     .then(result => setUsers(result.data))
        //     .catch(err => console.log(err))
        fetchUser();
    }, [])

    return (
        <div className="flex justify-center items-center bg-blue-600 min-h-screen">
            <div className="w-[35%] bg-white rounded-lg shadow-lg p-5">
                <h2 className="text-xl font-semibold mb-4 text-center">
                    User List
                </h2>
                <Link
                    to="/CreateUser"
                    className="bg-green-600 px-3 py-1 font-bold text-white mb-2 float-right rounded"
                >
                    Add +
                </Link>

                <table className="w-full border-collapse mt-4">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-2 border">Name</th>
                            <th className="p-2 border">Email</th>
                            <th className="p-2 border">Age</th>
                            <th className="p-2 border text-center">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map(user => (
                            <tr key={user._id} className="hover:bg-gray-50">
                                <td className="p-2 border">{user.username}</td>
                                <td className="p-2 border">{user.email}</td>
                                <td className="p-2 border">{user.age}</td>
                                <td className="p-2 border text-center space-x-2">
                                    <Link
                                        to={`/UpdateUser/${user._id}`}
                                        className="px-3 py-1 text-sm bg-blue-500 text-white rounded"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => deleteUser(user._id)}
                                        className="px-3 py-1 text-sm bg-red-500 text-white rounded">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Home
