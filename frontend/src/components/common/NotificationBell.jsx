import { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";
import api from "../../utils/api";

const NotificationBell = () => {

const [notifications,
setNotifications]
=
useState([]);

const [open,setOpen]
=
useState(false);

useEffect(()=>{

fetchNotifications();

},[]);

const fetchNotifications =
async()=>{

try{

const response =
await api.get(
"/api/notifications/my"
);

setNotifications(
response.data.notifications
);

}
catch(err){

console.log(err);

}

};

const unreadCount =
notifications.filter(
n=>!n.read
).length;

return(

<div className="relative">

<button
onClick={()=>
setOpen(!open)
}
className="relative"
>

<FaBell
className="
text-xl
text-gray-700
"
/>

{
unreadCount>0
&&
(
<span
className="
absolute
-top-2
-right-2
bg-pink-500
text-white
text-xs
rounded-full
w-5
h-5
flex
items-center
justify-center
"
>
{unreadCount}
</span>
)
}

</button>

{
open
&&
(
<div
className="
absolute
right-0
mt-3
w-80
bg-white
shadow-xl
rounded-2xl
p-4
z-50
"
>

<h3
className="
font-bold
mb-3
"
>
Notifications
</h3>

{
notifications.map(
(notification)=>(
<div
key={
notification._id
}
className="
border-b
py-3
"
>

<p
className="
font-semibold
"
>
{
notification.title
}
</p>

<p
className="
text-sm
text-gray-500
"
>
{
notification.message
}
</p>

</div>
)
)
}

</div>
)
}

</div>

);

};

export default NotificationBell;