import { useState } from "react";
import { FaCheck, FaCheckDouble, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import { useContext } from "react";
import { ContextProvider } from "./Provider";
import { Link, useLocation, useNavigate } from "react-router-dom";




const CardSchedule = ({ user, users, index, setUsers }) => {

  const navigate = useNavigate();
  const {userAcount } = useContext(ContextProvider);
  const { _id, title, day, date, time, completeTask } = user;
  const [check, setCheck] = useState(completeTask);




  const formatTime = (timeString) => {
    let [hours, minutes] = timeString.split(":");
    hours = parseInt(hours);
    let period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours}:${minutes} ${period}`;
  };




  const handleDelete = (id) => {
    if (!userAcount) {
      navigate("/sign-in", { state: { cardId: id } });
    } else {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          fetch(`http://localhost:3000/gym/${id}`, {
            method: "DELETE",
          })
            .then((res) => res.json())
            .then((result) => {
              if (result.deletedCount > 0) {
                Swal.fire({
                  title: "Deleted!",
                  text: "Your file has been deleted.",
                  icon: "success",
                }).then(() => {
                  const remaining = users.filter((user) => user._id != id);
                  setUsers(remaining);
                });
              }
            });
        }
      });
    }
  };




  const handleCheckTask = (id) => {

    const updateTask = { check: !check };
    fetch(`http://localhost:3000/gymtask/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateTask),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.modifiedCount > 0) {
          setCheck(!check);
        }
      });
  };




  return (
    <>
      <tr className="">
        <td>{index + 1}</td>
        <td>{title}</td>
        <td>{day}</td>
        <td>{date}</td>
        <td>{formatTime(time)}</td>
        <td className="flex justify-evenly items-center">
          <button onClick={() => handleDelete(_id)}>
            <MdDelete className="text-red-500" size={25} />
          </button>
          <Link to={`/update-schedule/${_id}`}>
            <FaEdit className="text-yellow-500" size={25} />
          </Link>
          <button disabled={!userAcount} onClick={() => handleCheckTask(_id)}>
            {check ? (
              <FaCheckDouble className="text-green-500" size={25} />
            ) : (
              <FaCheck size={25} />
            )}
            
          </button>
        </td>
      </tr>
    </>
  );
};

export default CardSchedule;
