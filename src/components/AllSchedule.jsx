import { useState } from "react";
import CardSchedule from "./CardSchedule";
import { useLoaderData } from "react-router-dom";

const AllSchedule = () => {
  const usersData = useLoaderData();
  const [users, setUsers] = useState(usersData);

  const handleSearch = (event) => {
    const searchData = event.target.value;
    fetch(`https://my-gym-server.vercel.app/gym?searchParams=${searchData}`)
      .then((res) => res.json())
      .then((data) => setUsers(data));
  };

  return (
    <div className="w-10/12 mx-auto py-5">
      <div className="bg-[#F4F3F0] py-5">
        <div className="overflow-x-auto">
          <h1 className="text-center font-bold text-3xl text-black">
            Total User : {users.length}
          </h1>{" "}
          <hr />
          <br />
          <div className="join flex justify-center items-center">
            <input
              onChange={handleSearch}
              className="input input-bordered join-item bg-[#F4F3F0] outline outline-1 outline-slate-500"
              placeholder="Search By Title"
            />
          </div>
          <table className="table text-black">
            {/* head */}
            <thead className="text-black font-bold text-center">
              <tr>
                <th>Serial</th>
                <th>Title</th>
                <th>Day</th>
                <th>Date</th>
                <th>Time</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {users.map((user, index) => (
                <CardSchedule
                  key={user._id}
                  users={users}
                  user={user}
                  index={index}
                  setUsers={setUsers}
                ></CardSchedule>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllSchedule;
