import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProfileUsers } from "../../redux/action/profileAction";
import EditProfile from "./EditProfile";
import { Link } from "react-router-dom";
import FollowBtn from "../FollowBtn";
import Followers from "./Followers";
import Following from "./Following";
import { TYPES } from "../../redux/action/notifyAction";

const Info = () => {
  const { id } = useParams();
  const { auth, profile, theme } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [userData, setUserData] = useState([]);
  const [onEdit, setOnEdit] = useState(false);

  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);

  useEffect(() => {
    if (id === auth.user._id) {
      setUserData([auth.user]);
    } else {
      dispatch(getProfileUsers({ users: profile.users, id, auth }));
      const newData = profile.users.filter((user) => user._id === id);
      setUserData(newData);
    }
  }, [id, auth, dispatch, profile.users]);

  useEffect(() => {
    if(showFollowers || showFollowing || onEdit){
      dispatch({type: TYPES.MODAL, payload: true})
    } else {
      dispatch({type: TYPES.MODAL, payload: false})
    }
  },[showFollowers, showFollowing, onEdit])

  return (
    <div className="info mt-[90px]">
      {userData.map((user) => (
        <div className="" key={user._id}>
          <main className="bg-gray-100 bg-opacity-25">
            <div className="lg:w-8/12 lg:mx-auto mb-8">
              <header className="flex flex-wrap items-center p-4 md:py-8">
                <div className="md:w-3/12 md:ml-16">
                  {/* <!-- profile image --> */}
                  <img
                 

                    src={user.avatar}
                    className={`info_profile  object-cover ${theme ? 'invert z-[-5]' : ''}`}
                    alt="avatar"
                   />
                </div>
                {/* <!-- profile meta --> */}
                <div className="w-8/12 md:w-7/12 ml-4">
                  <div className="md:flex flex-row md:flex-wrap items-center mb-4">
                    <h2 className="text-3xl inline-block font-light md:mr-2 mb-2 sm:mb-0">
                      {user.userName}
                    </h2>

                    {/* <!-- badge --> */}
                    <span
                      className="inline-block fas fa-certificate fa-lg text-blue-500 
                             relative mr-6 text-xl transform -translate-y-2"
                      aria-hidden="true"
                    >
                      <i
                        className="fas fa-check text-white text-xs absolute inset-x-0
                             ml-1 mt-px"
                      ></i>
                    </span>

                    {/* <!-- Edit button --> */}
                    {user._id === auth.user._id ? (
                      <button
                        onClick={() => setOnEdit(true)}
                        className="bg-[#F37223] px-2 hover:bg-[#F89C1C] py-1 
                      text-white font-semibold text-xl rounded  text-center 
                      sm:inline-block block"
                      >
                        Edit Profile
                      </button>
                    ) : (
                      <FollowBtn user={user} />
                    )}
                  </div>

                  {/* <!-- post, following, followers list for medium screens --> */}
                  <ul className=" hidden md:flex space-x-8 mb-4">
                    <li>
                      <span className="font-semibold">0</span>
                      <p className="cursor-pointer hover:underline text-[#F89C1C]">
                        posts
                      </p>
                    </li>

                    <li>
                      <span className="font-semibold">
                        {user.followers.length}
                      </span>
                      <p
                        className="cursor-pointer hover:underline text-[#F89C1C]"
                        onClick={() => setShowFollowers(true)}
                      >
                        followers
                      </p>
                    </li>
                    <li>
                      <span className="font-semibold">
                        {user.following.length}
                      </span>
                      <p
                        className="cursor-pointer hover:underline text-[#F89C1C]"
                        onClick={() => setShowFollowing(true)}
                      >
                        following
                      </p>
                    </li>
                  </ul>

                  {/* <!-- user meta form medium screens --> */}
                  <div className="hidden md:block">
                    <h1 className="font-semibold">{user.fullName}</h1>
                    <p>
                      <span>{user.email}</span>
                    </p>
                    <p>
                      <Link
                        to={user.website}
                        className="text-blue-400 hover:underline"
                      >
                        {user.website}
                      </Link>
                    </p>
                    <p>{user.bio}</p>
                  </div>
                </div>
                {/* <!-- user meta form small screens --> */}
                <div className="md:hidden text-lg my-2">
                  <h1 className="font-semibold">{user.fullName}</h1>
                  <p>
                    <span>{user.email}</span>
                  </p>
                  <p>
                    <Link
                      to={user.website}
                      className="text-blue-400 hover:underline"
                    >
                      {user.website}
                    </Link>
                  </p>
                  <p>{user.bio}</p>
                </div>
                {onEdit && <EditProfile user={user} setOnEdit={setOnEdit} />}
                {showFollowers && (
                  <Followers users={user.followers} setShowFollowers={setShowFollowers} />
                )}
                
                {showFollowing && (
                  <Following users={user.following} setShowFollowing={setShowFollowing} />
                )}
              </header>

              {/* <!-- posts --> */}
              <div className="px-px md:px-3">
                {/* <!-- user following for mobile only --> */}
                <ul
                  className="flex md:hidden justify-around space-x-8 border-t 
              text-center p-2 text-gray-600 leading-snug text-md"
                >
                  <li>
                    <span className="font-semibold text-gray-800 block">0</span>
                    <p className="cursor-pointer hover:underline text-[#F89C1C]">
                      posts
                    </p>
                  </li>

                  <li>
                    <span className="font-semibold text-gray-800 block ">
                      {user.followers.length}{" "}
                    </span>
                    <p className="cursor-pointer hover:underline text-[#F89C1C]" onClick={() => setShowFollowers(true)} >
                      followers
                    </p>
                  </li>
                  <li>
                    <span className="font-semibold text-gray-800 block">
                      {user.following.length}{" "}
                    </span>
                    <p className="cursor-pointer hover:underline text-[#F89C1C]" onClick={() => setShowFollowing(true)}>
                      following
                    </p>
                  </li>
                </ul>

                {/* <!-- insta freatures --> */}
                <ul
                  className="flex items-center justify-around md:justify-center space-x-[-30px]  md:space-x-12
                  uppercase tracking-widest font-semibold text-xs text-gray-600
                  border-t"
                >
                  {/* <!-- posts tab is active --> */}
                </ul>
                {/* <!-- flexbox grid --> */}
                <div className="flex flex-wrap -mx-px md:-mx-3">
                  {/* <!-- column --> */}
                  <div className="w-1/3 p-px md:px-3">
                    {/* <!-- post 1--> */}
                    <Link>
                      <article className="post bg-gray-100 text-white relative pb-full md:mb-6">
                        {/* <!-- post image--> */}
                        <img
                          className="w-full h-full absolute left-0 top-0 object-cover"
                          src="https://images.unsplash.com/photo-1502791451862-7bd8c1df43a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                          alt="img"
                        />

                        <i className="fas fa-square absolute right-0 top-0 m-1"></i>
                        {/* <!-- overlay--> */}
                        <div
                          className="overlay bg-gray-800 bg-opacity-25 w-full h-full absolute 
                              left-0 top-0 hidden"
                        >
                          <div
                            className="flex justify-center items-center 
                                  space-x-4 h-full"
                          >
                            <span className="p-2">
                              <i className="fas fa-heart"></i>
                              412K
                            </span>

                            <span className="p-2">
                              <i className="fas fa-comment"></i>
                              2,909
                            </span>
                          </div>
                        </div>
                      </article>
                    </Link>
                  </div>

                  <div className="w-1/3 p-px md:px-3">
                    <Link>
                      {/* <!-- post 2 --> */}
                      <article className="post bg-gray-100 text-white relative pb-full md:mb-6">
                        <img
                          className="w-full h-full absolute left-0 top-0 object-cover"
                          src="https://images.unsplash.com/photo-1498409570040-05bf6d3dd5b5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                          alt="img"
                        />

                        {/* <!-- overlay--> */}
                        <div
                          className="overlay bg-gray-800 bg-opacity-25 w-full h-full absolute 
                              left-0 top-0 hidden"
                        >
                          <div
                            className="flex justify-center items-center 
                                  space-x-4 h-full"
                          >
                            <span className="p-2">
                              <i className="fas fa-heart"></i>
                              412K
                            </span>

                            <span className="p-2">
                              <i className="fas fa-comment"></i>
                              1,993
                            </span>
                          </div>
                        </div>
                      </article>
                    </Link>
                  </div>

                  <div className="w-1/3 p-px md:px-3">
                    <Link>
                      <article className="post bg-gray-100 text-white relative pb-full  md:mb-6">
                        <img
                          className="w-full h-full absolute left-0 top-0 object-cover"
                          src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                          alt="img"
                        />
                        {/* <!-- overlay--> */}
                        <div
                          className="overlay bg-gray-800 bg-opacity-25 w-full h-full absolute 
                              left-0 top-0 hidden"
                        >
                          <div
                            className="flex justify-center items-center 
                                  space-x-4 h-full"
                          >
                            <span className="p-2">
                              <i className="fas fa-heart"></i>
                              112K
                            </span>

                            <span className="p-2">
                              <i className="fas fa-comment"></i>
                              2,090
                            </span>
                          </div>
                        </div>
                      </article>
                    </Link>
                  </div>

                  <div className="w-1/3 p-px md:px-3">
                    <Link>
                      <article className="post bg-gray-100 text-white relative pb-full md:mb-6">
                        <img
                          className="w-full h-full absolute left-0 top-0 object-cover"
                          src="https://images.unsplash.com/photo-1533105079780-92b9be482077?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                          alt="img"
                        />

                        <i className="fas fa-video absolute right-0 top-0 m-1"></i>

                        {/* <!-- overlay--> */}
                        <div
                          className="overlay bg-gray-800 bg-opacity-25 w-full h-full absolute 
                              left-0 top-0 hidden"
                        >
                          <div
                            className="flex justify-center items-center 
                                  space-x-4 h-full"
                          >
                            <span className="p-2">
                              <i className="fas fa-heart"></i>
                              841K
                            </span>

                            <span className="p-2">
                              <i className="fas fa-comment"></i>
                              909
                            </span>
                          </div>
                        </div>
                      </article>
                    </Link>
                  </div>

                  <div className="w-1/3 p-px md:px-3">
                    <Link>
                      <article className="post bg-gray-100 text-white relative pb-full md:mb-6">
                        <img
                          className="w-full h-full absolute left-0 top-0 object-cover"
                          src="https://images.unsplash.com/photo-1475688621402-4257c812d6db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80"
                          alt="img"
                        />
                        {/* <!-- overlay--> */}
                        <div
                          className="overlay bg-gray-800 bg-opacity-25 w-full h-full absolute 
                              left-0 top-0 hidden"
                        >
                          <div
                            className="flex justify-center items-center 
                                  space-x-4 h-full"
                          >
                            <span className="p-2">
                              <i className="fas fa-heart"></i>
                              120K
                            </span>

                            <span className="p-2">
                              <i className="fas fa-comment"></i>
                              3,909
                            </span>
                          </div>
                        </div>
                      </article>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      ))}
    </div>
  );
};

export default Info;
