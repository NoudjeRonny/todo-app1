import axios from "axios"
import { useState } from "react"
import { useNavigate } from 'react-router-dom'

const CreateUser = () => {
    const [username, setUsername] = useState<string>("")
    const [age, setAge] = useState<number>(0)
    const [email, setEmail] = useState<string>("")
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            const result = await axios.post(
                "http://localhost:4000/user/createUser",
                { username, age, email }
            )
            console.log(result.data)
            navigate('/');
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="flex min-h-screen justify-center items-center bg-blue-600">
            <div className="w-[25%] bg-white rounded-2xl shadow-2xl p-5">
                <h2 className="text-center font-bold mb-4">Create User</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label>Name</label>
                        <input
                            type="text"
                            placeholder="Enter Name"
                            className="w-full border p-2 mt-1"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            className="w-full border p-2 mt-1"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label>Age</label>
                        <input
                            type="number"
                            className="w-full border p-2 mt-1"
                            value={age}
                            onChange={(e) => setAge(Number(e.target.value))}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white py-2 rounded"
                    >
                        Create
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CreateUser
