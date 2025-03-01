import { useSelector } from "react-redux";
import { RootState } from "../redux/store";


const Home = () => {
    const { email, name } = useSelector((state: RootState)=> state.user);

    return (
        <div className="min-h-screen">
            <h3>This is Home</h3>
            <h4>Email : {email}</h4>
            <h4>Name : {name}</h4>
        </div>
    );
};

export default Home;