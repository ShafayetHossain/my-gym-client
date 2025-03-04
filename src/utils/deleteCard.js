import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const deleteCard = (id, cb) => {
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
      fetch(`https://my-gym-server.vercel.app/gym/${id}`, {
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
              cb();
            });
          } else {
            Swal.fire({
              title: "Opps!",
              text: "file delete failed",
              icon: "error",
            });
          }
        });
    }
  });
};

export default deleteCard;
