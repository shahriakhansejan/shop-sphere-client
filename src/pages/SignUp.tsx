import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { useCreateUserMutation } from "../redux/feature/users/usersApi";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/feature/users/userSlice";
import moment from "moment";

type Inputs = {
  name: string;
  email: string;
  password: string;
  created_at: string;
};


const SignUp = () => {
  const { register, handleSubmit, formState: { errors }, } = useForm<Inputs>();
  const navigate = useNavigate();

  const [createUser, { isSuccess }] = useCreateUserMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      navigate('/')
      Swal.fire({
        position: "top",
        icon: "success",
        title: "Successfully Signed Up",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }, [isSuccess, navigate]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { name, email, password } = data;
    const res = await createUser({ name, email, password, created_at: moment().format("MM-DD-YYYY") }).unwrap();
    dispatch(setUser({name: res.name, email: res.email}))
    localStorage.setItem("userName", res.name);
    localStorage.setItem("userEmail", res.email);
    localStorage.setItem("access-token", res.token);
  };

  return (
    <div className="max-w-3xl mx-auto min-h-screen my-12">
      <div className="card bg-base-100 w-full shrink-0 shadow-2xl">
        <h2 className="text-5xl font-bold text-center pt-12 pb-6">
          Please Sign Up !
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="Your Name"
              className="input input-bordered"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className="text-red-500">Name is required</span>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Your Email"
              className="input input-bordered"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-red-500">Email is required</span>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              className="input input-bordered"
              {...register("password", { required: true })}
            />
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary">Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
