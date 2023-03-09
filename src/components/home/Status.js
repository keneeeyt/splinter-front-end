import React from "react";
import Avatar from "../Avatar";
import { useSelector, useDispatch } from "react-redux";

import { TYPES } from "../../redux/action/notifyAction";
const Status = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <>
      <div className="mt-3 grid place-items-center">
        <div className="p-4 md:p-6 shadow-md bg-white rounded-xl md:w-[35rem] w-[24rem]">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <Avatar src={auth.user.avatar} />
            </div>
            <div
              className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full cursor-pointer"
              onClick={() => dispatch({ type: TYPES.STATUS, payload: true })}
            >
              <h3 className="md:text-lg text-sm text-gray-500">
                What`s on your mind, {auth.user.userName} ?
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* create post dialog  */}
    </>
  );
};

export default Status;
