import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const UpdateUser = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [age, setAge] = useState<number>(0);

    // Fetch the user data from backend
    const fetchUser = async () => {
        if (!id) return;

        try {
            const res = await axios.get(
                `https://todo-app1-30yx.onrender.com/user/getUser/${id}`
            );
            setUsername(res.data.username);
            setEmail(res.data.email);
            setAge(res.data.age);
        } catch (error: any) {
            // Type-safe error handling
            console.error(error.response?.data || error.message || error);
        }
    };

    useEffect(() => {
        fetchUser();
    }, [id]);

    // Update the user on backend
    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!id) return;

        try {
            const res = await axios.put(
                `https://todo-app1-30yx.onrender.com/user/updateUser/${id}`,
                { username, email, age }
            );
            console.log(res.data);
            navigate("/"); // Go back to home after update
        } catch (error: any) {
            console.error(error.response?.data || error.message || error);
        }
    };

    return (
        <div className="flex min-h-screen justify-center items-center bg-blue-600">
            <div className="w-[25%] bg-white rounded-2xl shadow-2xl p-4">
                <h2 className="text-center font-bold mb-4">Update User</h2>
                <form onSubmit={handleUpdate}>
                    <div className="mb-3">
                        <label className="block mb-1">Name</label>
                        <input
                            type="text"
                            placeholder="Enter Name"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full border py-2 px-2 rounded outline-none"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="block mb-1">Email</label>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border py-2 px-2 rounded outline-none"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="block mb-1">Age</label>
                        <input
                            type="number"
                            placeholder="Enter Age"
                            value={age}
                            onChange={(e) => setAge(Number(e.target.value))}
                            className="w-full border py-2 px-2 rounded outline-none"
                            required
                            min={0}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded"
                    >
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateUser;
