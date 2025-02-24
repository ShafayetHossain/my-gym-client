import React from "react";
import { useLoaderData } from "react-router-dom";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const UpdateUser = () => {
  const userData = useLoaderData();
  const navigate = useNavigate();

  const { _id, title, day, date, time } = userData;

  const handleUpdateSchedule = (event) => {
    event.preventDefault();

    const form = event.target;
    const title = form.title.value;
    const day = form.day.value;
    const date = form.date.value;
    const time = form.time.value;

    const updateSchedule = { title, day, date, time };

    fetch(`http://localhost:3000/gym/${_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateSchedule),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.modifiedCount > 0) {
          Swal.fire({
            title: "Good job!",
            text: "User Update Successfully!",
            icon: "success",
          }).then(() => navigate("/all-schedule"));
        } else {
          Swal.fire({
            title: "OOps!",
            text: "User Update Failed!",
            icon: "error",
          });
        }
      });
  };

  return (
    <div className="w-10/12 mx-auto py-5">
      <div className="bg-[#F4F3F0] py-5">
        <div className="p-5 flex flex-col items-center justify-center">
          <div className="max-w-[756px] text-[#374151]">
            <div className="text-center ">
              <h1 className="rancho-font text-4xl">Add Gym Schedule</h1>
            </div>
          </div>

          <form
            onSubmit={handleUpdateSchedule}
            action=""
            method="post"
            className="w-10/12 mx-auto"
          >
            <div className="flex justify-center items-center py-4 gap-x-2">
              <div className="w-full flex flex-col justify-center items-center">
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text text-[#374151] font-semibold text-xl">
                      Title
                    </span>
                  </div>
                  <input
                    required
                    type="text"
                    name="title"
                    defaultValue={title}
                    placeholder="Enter Title"
                    className="input input-bordered w-full bg-white placeholder-black text-black"
                  />
                </label>

                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text text-[#374151] font-semibold text-xl">
                      Day
                    </span>
                  </div>
                  <select
                    required
                    id="day"
                    name="day"
                    className="input input-bordered w-full bg-white text-black"
                  >
                    <option value={day} defaultValue={day} selected>
                      {day}
                    </option>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                    <option value="Sunday">Sunday</option>
                  </select>
                </label>
              </div>

              <div className="w-full flex flex-col justify-center items-center">
                <label className="form-control w-full ">
                  <div className="label">
                    <span className="label-text text-[#374151] font-semibold text-xl">
                      Date
                    </span>
                  </div>

                  <input
                    required
                    type="date"
                    name="date"
                    defaultValue={date}
                    placeholder="Enter Coffee Chef"
                    className="input input-bordered w-full bg-white text-black"
                  />
                </label>

                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text text-[#374151] font-semibold text-xl">
                      Time
                    </span>
                  </div>
                  <input
                    required
                    type="time"
                    name="time"
                    defaultValue={time}
                    className="input input-bordered w-full bg-white text-black"
                  />
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="rancho-font bg-[#D2B48C] text-[#331A15] px-4 py-2 text-2xl flex justify-center items-center w-full rounded-xl"
            >
              Update Schedule
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
