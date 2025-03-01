import { SubmitHandler, useForm } from "react-hook-form";
import { useSignInUserMutation } from "../redux/feature/users/usersApi";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/feature/users/userSlice";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

type Inputs = {
  email : string
  password: string
}

const SignIn = () => {

  const {register, handleSubmit, formState: { errors },} = useForm<Inputs>();
  const navigate = useNavigate();
  const [signInUser, {isSuccess}] = useSignInUserMutation();

  const dispatch = useDispatch();
  

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { email, password } = data;
    const res = await signInUser({ email, password } ).unwrap();
    dispatch(setUser({name: res.name, email:res.email}));
    localStorage.setItem("userName", res.name);
    localStorage.setItem("userEmail", res.email);
    localStorage.setItem("access-token", res.token);
  };

  useEffect(() => {
    if (isSuccess) {
      Swal.fire({
        position: "top",
        icon: "success",
        title: "Successfully Sign In",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate('/');
    }
  }, [isSuccess, navigate]);
  


  return (
    <div className="max-w-3xl mx-auto min-h-screen my-12">
      <div className="card bg-base-100 w-full shrink-0 shadow-2xl">
        <h2 className="text-5xl font-bold text-center pt-12 pb-6">
          Sign In Now !
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
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
            <button className="btn btn-primary">Sign In</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
