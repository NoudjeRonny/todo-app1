import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
const UpdateUser = () => {
    const { id } = useParams()
    const [username, setUsername] = useState<string>("")
    const [age, setAge] = useState<number>(0)
    const [email, setEmail] = useState<string>("")
    const navigate = useNavigate()


    const handleSubmit = async () => {
        if (!id) return; // ✅ prevent invalid request

        try {
            const result = await axios.get(
                `http://localhost:4000/user/getUser/${id}`
            );

            console.log(result.data); // log actual user
            setUsername(result.data.username)
            setAge(result.data.age)
            setEmail(result.data.email)
        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    };

    useEffect(() => {
        handleSubmit();
    }, [id]); // ✅ re-run when id changes

    const Update = async (e: React.FormEvent) => {
        try {
            e.preventDefault();
            const result = await axios.put(
                `http://localhost:4000/user/updateUser/${id}`,
                { username, age, email }
            )
            console.log(result.data)
            navigate('/');
        } catch (error) {
            console.error(error)
        }
    }


    return (
        <div className="flex min-h-screen justify-center items-center bg-blue-600 ">
            <div className="w-[25%] bg-white rounded-2xl shadow-2xl p-3">
                <h2 className="text-center bold ">Update User</h2>
                <form action="" onSubmit={Update}>
                    <div className="mb-2">
                        <label htmlFor="">Name</label>
                        <input type="text" placeholder="Enter Name"
                            value={username} className="w-full border-none outline-0 py-2 mt-2"
                            onChange={(e) => setUsername(e.target.value)} />
                        <label htmlFor="">Email</label>
                        <input type="email" placeholder="Enter Email"
                            value={email} className="w-full border-none py-2 outline-0 mt-2"
                            onChange={(e) => setEmail(e.target.value)} />
                        <label htmlFor="">Age</label>
                        <input type="number" placeholder="Enter Name"
                            value={age} className="w-full border-none py-2 outline mt-2"
                            onChange={(e) => setAge(Number(e.target.value))} />
                        <button  
                        type="submit"
                        className="px-3 py-1 text-sm bg-green-400 my-2 w-30 text-white rounded hover:bg-green-600 cursor-pointer"
                        >
                            
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UpdateUser