import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BiCamera } from "react-icons/bi";
import { checkImage } from "../../utils/imageUpload";
import { TYPES } from '../../redux/action/notifyAction'

const EditProfile = ({ user, setOnEdit }) => {
  const initState = {
    fullName: "",
    mobile: "",
    website: "",
    bio: "",
    gender: "",
    address: "",
  };
  const [userData, setUserData] = useState(initState);
  const { fullName, mobile, website, bio, address } = userData;

  const [avatar, setAvatar] = useState("");
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const changeAvatar = (event) => {
        const file = event.target.files[0]
        const err = checkImage(file)
        if(err) return dispatch({type:TYPES.NOTIFY, payload: {error: err}})
        setAvatar(file)
  };
  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  return (
    <div className="fixed top-0 left-0 w-full h-[100vh] bg-[#0008] z-10 overflow-auto">
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div
          onClick={() => setOnEdit(false)}
          className="w-full px-4 py-2 text-xl text-[#F26F21] flex justify-end cursor-pointer"
        >
          	&times;
        </div>
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <form className="space-y-4 md:space-y-6">
            <div className="info_avatar">
              <img
                src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar}
                alt="avatar"
                style={{ width: "100px" }}
              />
              <span>
                <BiCamera className="mx-auto"/>
                <p>Change</p>
                <input
                  type="file"
                  name="file"
                  id="file_up"
                  accept="image/*"
                  onChange={changeAvatar}
                />
              </span>
            </div>

            <div className="form_group">
              <div className="relative">
                <input
                  onChange={handleInput}
                  value={fullName}
                  type="text"
                  name="fullName"
                  className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-[#F26F21] focus:ring-[#F89C1C] focus:outline-none focus:ring focus:ring-opacity-40"
                  placeholder="Enter Fullname"
                />
                <small
                  className="text-red-600 absolute"
                  style={{
                    top: "50%",
                    right: "5px",
                    transform: "translateY(-50%)",
                  }}
                >
                  {fullName.length}/25
                </small>
              </div>
              <div>
                <input
                  value={mobile}
                  onChange={handleInput}
                  type="text"
                  name="mobile"
                  className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-[#F26F21] focus:ring-[#F89C1C] focus:outline-none focus:ring focus:ring-opacity-40"
                  placeholder="Mobile Number"
                />
              </div>
              <div>
                <input
                  onChange={handleInput}
                  value={address}
                  type="email"
                  name="address"
                  className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-[#F26F21] focus:ring-[#F89C1C] focus:outline-none focus:ring focus:ring-opacity-40"
                  placeholder="Address"
                />
              </div>
              <div className="mb-2 relative">
                <input
                  onChange={handleInput}
                  value={website}
                  type="text"
                  name="website"
                  id="password"
                  placeholder="Your Website"
                  className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-[#F26F21] focus:ring-[#F89C1C] focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>

              <div className="">
                <textarea
                  onChange={handleInput}
                  value={bio}
                  type="text"
                  name="bio"
                  id="confirm-password"
                  placeholder="Tell us about yourself"
                  className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-[#F26F21] focus:ring-[#F89C1C] focus:outline-none focus:ring focus:ring-opacity-40"
                ></textarea>
                <small className="text-red-600 block text-right">
                  {bio.length}/100
                </small>
              </div>
              <div>
                <select
                  name="gender"
                  onChange={handleInput}
                  className="mb-5 w-full rounded-lg focus:ring-0 focus:border-[#F89C1C]"
                >
                  <option>UPDATE GENDER</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[#F26F21] rounded-md hover:bg-[#F89C1C] focus:outline-none focus:bg-[#F26F21] disabled:opacity-30"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
};

export default EditProfile;
