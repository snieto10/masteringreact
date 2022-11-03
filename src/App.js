import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const apiEndpoint = "https://jsonplaceholder.typicode.com/posts";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function getUsers() {
      const { data: posts } = await axios.get(apiEndpoint);
      setPosts(posts);
    }

    getUsers();
  }, []);

  let handleAdd = async () => {
    let num = Math.floor(Math.random() * 10000);
    let id = num.toString();
    const obj = {
      title: "a",
      body: "b",
      id,
    };
    console.log(obj);

    setPosts([obj, ...posts]);
    const { data: post } = await axios.post(apiEndpoint, obj);
  };

  let handleUpdate = async (u) => {
    u.body = "UPDATED";
    console.log(u);

    const data = [...posts];
    const index = data.indexOf(u);
    data[index] = { ...u };
    setPosts(data);
    await axios.put(apiEndpoint + "/" + u.id, u);
  };

  return (
    <>
      <button onClick={handleAdd}>ADD</button>

      <table>
        <thead>
          <tr>
            <th className="table-width">Title</th>
            <th className="table-width">Update</th>
            <th className="table-width">Delete</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((u) => (
            <tr key={u.id}>
              <td>{u.title}</td>
              <td>{u.body}</td>
              <td>
                <button onClick={() => handleUpdate(u)}>UPDATE</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default App;
