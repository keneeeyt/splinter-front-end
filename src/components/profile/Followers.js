import React from "react";
import UserCard from "../UserCard";
import FollowBtn from "../FollowBtn";
import { useSelector } from "react-redux";

const Followers = ({ users, setShowFollowers }) => {
  const { auth } = useSelector((state) => state);
  console.log(users)
  return (
    <div className="fixed top-0 left-0 w-full h-[100vh] bg-[#0008] z-10 overflow-auto">
      <div className="flex justify-center px-6 py-8 mx-auto mt-[10rem] lg:py-0">
        <div className="w-full relative bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 lg:top-[0]">
        <div
            onClick={() => setShowFollowers(false)}
            className=" absolute w-full top-[-10px] px-4 py-2 text-xl text-[#F26F21] flex justify-end cursor-pointer"
          >
            &times;
          </div>
          <h5 className="text-center font-semibold p-2">Followers</h5>
          <hr />
          <div className="w-full">
          {
            
            users.length === 0 ?

            <h1 className="p-5 flex items-center justify-center">You have no followers</h1>
                
                :
                      
            users.map((user) => (

            <UserCard key={user._id} user={user} setShowFollowers={setShowFollowers}>
            {auth.user._id !== user._id && <FollowBtn user={user} />}
            </UserCard>

            ))
                    
          }
              

          </div>
        </div>
      </div>
    </div>
  );
};

export default Followers;
