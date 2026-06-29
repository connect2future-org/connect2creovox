import { Link } from "react-router-dom";

const NotFound = () => {

return(

<div className="min-h-screen flex flex-col justify-center items-center bg-[#faf6f0]">

<h1 className="text-8xl font-black text-pink-500">

404

</h1>

<h2 className="text-3xl font-bold mt-5">

Page Not Found

</h2>

<p className="text-gray-500 mt-3">

The page you are looking for doesn't exist.

</p>

<Link

to="/"

className="btn btn-primary mt-8"

>

Go Home

</Link>

</div>

);

};

export default NotFound;