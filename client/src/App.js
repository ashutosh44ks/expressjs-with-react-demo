import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("hi");
  const [age, setAge] = useState(0);
  const [id, setId] = useState(0);
  const getUsers = async () => {
    try {
      const result = await axios("http://localhost:3000/api/getUsers");
      setUsers(result.data);
      console.log(result.data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);
  const addUser = async () => {
    try {
      const { data } = await axios.post("http://localhost:3000/api/addUser", {
        user: {
          name,
          age,
        },
      });
      console.log(data);
      setUsers([...users, data]);
    } catch (e) {
      console.log(e);
    }
  };
  const deleteUser = async () => {
    try {
      const { data } = await axios.delete(
        `http://localhost:3000/api/deleteUser?id=${id}`
      );
      console.log(data);
      setUsers(users.filter((user) => user.id !== +id));
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="App">
      <div>
        <h2>Current Users</h2>
        {users.map((user, index) => (
          <div key={index}>
            {user.name}, {user.age}, {user.id}
          </div>
        ))}
        <button onClick={getUsers}>refresh</button>
      </div>
      <div>
        <h2>Add User</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addUser();
          }}
        >
          <div>
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label>Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <button type="submit">Add</button>
        </form>
      </div>
      <div>
        <h2>Delete User</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            deleteUser();
          }}
        >
          <label>ID</label>
          <input value={id} onChange={(e) => setId(e.target.value)} />
          <button type="submit">Remove</button>
        </form>
      </div>
    </div>
  );
}

export default App;
