import moment from "moment";
import { useGetUsersQuery, useUpdateRoleMutation } from "../../redux/feature/users/usersApi";
import Swal from "sweetalert2";

const Users = () => {
  const { data: users, isLoading } = useGetUsersQuery();
  const [ updateRole ] = useUpdateRoleMutation();
  

  const handleUpdateRole = (id: string , newRole: string) => {
    Swal.fire({
        title: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, make it!"
      }).then((result) => {
        if (result.isConfirmed) {
            updateRole({id, newRole})
          }
      });
  }

  if (isLoading) {
    return (
      <progress className="progress progress-primary w-full mx-4"></progress>
    );
  }
  return (
    <div className="my-12">
      <h2 className="text-4xl text-center text-sky-400 font-bold">All Users</h2>

      <div className="mt-8">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Member Since</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user, idx) => (
                <tr key={user._id}>
                  <th>{idx + 1}.</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{moment(`${user.created_at}`, "MM-DD-YYYY").format(
                      "DD MMMM 'YY"
                    )}</td>
                  <td>
                    {user.role === "admin" ? (
                      <button
                      onClick={()=> handleUpdateRole(user._id,'user')}
                        className="btn btn-accent btn-sm text-xs"
                        title="remove from Admin"
                      >
                        Admin
                      </button>
                    ) : (
                      <button
                      onClick={()=> handleUpdateRole(user._id,'admin')}
                        className="btn btn-neutral btn-sm text-xs"
                        title="make Admin"
                      >
                        User
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
