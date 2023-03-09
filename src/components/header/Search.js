import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getData } from "../../utils/fetchData";
import { TYPES } from "../../redux/action/notifyAction";
import { Link } from "react-router-dom";
import UserCard from "../UserCard";
import loadIcon from "../../images/loading.gif";

const Search = () => {
  const [search, setSearch] = useState("");

  const [users, setUsers] = useState([]);
  const { auth } = useSelector((state) => state);
  const [load, setLoad] = useState(false);
  const dispatch = useDispatch();

  const handleClose = () => {
    setSearch("");
    setUsers([]);
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    if (!search) return

    setLoad(true);
    await getData(`search?userName=${search}`, auth.token)
      .then((data) => {
        setUsers(data.data.users);
        setLoad(false);
      })
      .catch((err) => {
        dispatch({
          type: TYPES.NOTIFY,
          payload: { error: err.response.data.msg },
        });
      });
  };
  return (
    <div className="flex items-center justify-center md:pl-5">
      <form className="mt-1" onSubmit={handleSearch}>
        <div className="relative text-gray-400 focus-within:text-gray-400">
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <button
              type="submit"
              className={`p-1 focus:outline-none focus:shadow-outline absolute z-50 ${search ? `ml-1` : ''}`}
            >
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                className="w-6 h-6"
              >
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </button>
          </span>
          <div
            className={
              search
                ? `transition duration-300 flex justify-center items-center py-1  drop-shadow-lg`
                : ""
            }
          >
            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value.toLocaleLowerCase().replace(/ /s, ""))
              }
              className="py-2 text-sm text-black bg-gray-100 rounded-full w-[210px] border-none pl-10 outline-none focus:ring-0 focus:text-gray-900 relative"
              placeholder="Search Splinter"
              autoComplete="off"
            />
          </div>
          <div
            onClick={handleClose}
            className="absolute top-[.3rem] text-2xl text-red-600 z-50 cursor-pointer left-[12.4rem]"
            style={{ opacity: users.length === 0 ? 0 : 1 }}
          >
            &times;
          </div>
          {users.length === 0
            ? load && (
                <img
                  src={loadIcon}
                  alt="loading"
                  className="absolute top-[50%] right-[14px] w-[15px] h-[15px] translate-y-[-50%] "
                />
              )
            : null}
        </div>

        <div className="users absolute w-[6%] min-w-[218px] bg-white">
          {search &&
            users.map((user, index) => (
              <UserCard user={user} key={user._id} handleClose={handleClose} />
            ))}
        </div>
      </form>
    </div>
  );
};

export default Search;
