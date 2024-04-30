import React, { useEffect, useState } from "react";
import "./User.css";
import axios from "axios";

function Users() {
  const [users, setUsers] = useState([]);
  const [toggleState, setToggleState] = useState(0);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [userId, setID] = useState("");
  axios.defaults.withCredentials = true;

  // BOX COLOUR'S
  const colors = [
    "#ffd2bf",
    "#9ff5ce",
    "#f3b8ee",
    "#d8bcff",
    "#a2e2fd",
    "#feb8b8",
  ];

  useEffect(() => {
    axios
      .get("https://app-backend-five-xi.vercel.app/", { withCredentials: true })
      .then((result) => setUsers(result.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete("https://app-backend-five-xi.vercel.app/deleteUser/" + id)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((errr) => console.log(errr));
  };
  const handleSubmitcreate = (e) => {
    e.preventDefault();
    axios
      .post("https://app-backend-five-xi.vercel.app/createUser", {
        name,
        date,
      })
      .then((result) => {
        console.log(result);
        window.location.reload();
        toggleTab(0);
      })
      .catch((err) => console.log(err));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`https://app-backend-five-xi.vercel.app/User/${userId}`, {
        name,
        date,
      })
      .then((result) => {
        console.log(result);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  //   TO RENDER

  return (
    <>
      {/* TO ADD A NEW DATA */}
      <header className="header">
        <button
          className="add-btn"
          onClick={() => setToggleState(1)}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            color="#000000"
            strokeWidth="1.5"
            aria-label="NEW"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM12.75 8C12.75 7.58579 12.4142 7.25 12 7.25C11.5858 7.25 11.25 7.58579 11.25 8V11.25H8C7.58579 11.25 7.25 11.5858 7.25 12C7.25 12.4142 7.58579 12.75 8 12.75H11.25V16C11.25 16.4142 11.5858 16.75 12 16.75C12.4142 16.75 12.75 16.4142 12.75 16V12.75H16C16.4142 12.75 16.75 12.4142 16.75 12C16.75 11.5858 16.4142 11.25 16 11.25H12.75V8Z"
              fill="#000000"
            ></path>
          </svg>
        </button>
      </header>

      {/* TO DISPLAY DATA */}
      <div
        className="container"
        id="container"
      >
        {users.map((user, index) => (
          <div
            className="box"
            style={{ backgroundColor: colors[index % colors.length] }}
          >
            <p>{user.name}</p>
            <span className="date">{user.date}</span>
            <div className="button-container">
              <button
                className="box-btn"
                onClick={() => {
                  setName(user.name);
                  setDate(user.date);
                  setToggleState(2);
                  setID(user._id);
                }}
              >
                <svg
                  width="28px"
                  height="28px"
                  stroke-width="1.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  color="#000000"
                  aria-label="UPDATE"
                >
                  <path
                    d="M10.2361 8C10.7111 7.46924 11 6.76835 11 6C11 4.34315 9.65685 3 8 3C6.34315 3 5 4.34315 5 6C5 7.65685 6.34315 9 8 9C8.8885 9 9.68679 8.61375 10.2361 8ZM10.2361 8L20 16"
                    stroke="#000000"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M10.2361 16C10.7111 16.5308 11 17.2316 11 18C11 19.6569 9.65685 21 8 21C6.34315 21 5 19.6569 5 18C5 16.3431 6.34315 15 8 15C8.8885 15 9.68679 15.3863 10.2361 16ZM10.2361 16L20 8"
                    stroke="#000000"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
              </button>
              <button
                className="delete-btn"
                onClick={(e) => handleDelete(user._id)}
              >
                <svg
                  stroke-width="1.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  color="#000000"
                  aria-label="DELETE"
                >
                  <path
                    d="M8 12H16"
                    stroke="#000000"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    stroke="#000000"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* FOR ADDING DATA */}
      <div
        className={
          toggleState === 1 ? "services_modal active-modal" : "services_modal"
        }
      >
        <div className="services_modal-content">
          <h3 className="services_modal-title">Add User</h3>

          <form>
            <div className="mb-2">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Enter Name"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="date">Date</label>
              <input
                type="text"
                id="date"
                placeholder="Enter Date"
                className="form-control"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <button
              onClick={handleSubmitcreate}
              className="input-btn"
            >
              <svg
                width="28px"
                height="28px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                color="#000000"
                strokeWidth="1.5"
                aria-label="ADD"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM12.75 8C12.75 7.58579 12.4142 7.25 12 7.25C11.5858 7.25 11.25 7.58579 11.25 8V11.25H8C7.58579 11.25 7.25 11.5858 7.25 12C7.25 12.4142 7.58579 12.75 8 12.75H11.25V16C11.25 16.4142 11.5858 16.75 12 16.75C12.4142 16.75 12.75 16.4142 12.75 16V12.75H16C16.4142 12.75 16.75 12.4142 16.75 12C16.75 11.5858 16.4142 11.25 16 11.25H12.75V8Z"
                  fill="#000000"
                ></path>
              </svg>
            </button>
            <button
              onClick={() => setToggleState(0)}
              className="close-btn"
            >
              <svg
                width="28px"
                height="28px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                color="#000000"
                stroke-width="1.5"
                aria-label="CLOSE"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM9.70164 8.64124C9.40875 8.34835 8.93388 8.34835 8.64098 8.64124C8.34809 8.93414 8.34809 9.40901 8.64098 9.7019L10.9391 12L8.64098 14.2981C8.34809 14.591 8.34809 15.0659 8.64098 15.3588C8.93388 15.6517 9.40875 15.6517 9.70164 15.3588L11.9997 13.0607L14.2978 15.3588C14.5907 15.6517 15.0656 15.6517 15.3585 15.3588C15.6514 15.0659 15.6514 14.591 15.3585 14.2981L13.0604 12L15.3585 9.7019C15.6514 9.40901 15.6514 8.93414 15.3585 8.64124C15.0656 8.34835 14.5907 8.34835 14.2978 8.64124L11.9997 10.9393L9.70164 8.64124Z"
                  fill="#000000"
                ></path>
              </svg>
            </button>
          </form>
        </div>
      </div>

      {/* FOR UPDATING DATA */}
      <div
        className={
          toggleState === 2 ? "services_modal active-modal" : "services_modal"
        }
      >
        <div className="services_modal-content">
          <h3 className="services_modal-title">Update User</h3>

          <form>
            <div className="mb-2">
              <label htmlFor="updateName">Name</label>
              <input
                type="text"
                id="updateName"
                placeholder="Enter Name"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="updateDate">Date</label>
              <input
                type="text"
                id="updateDate"
                placeholder="Enter Date"
                className="form-control"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="input-btn"
              onClick={handleSubmit}
            >
              <svg
                width="28px"
                height="28px"
                stroke-width="1.5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                color="#000000"
                aria-label="UPDATE"
              >
                <path
                  d="M1.5 12.5L5.57574 16.5757C5.81005 16.8101 6.18995 16.8101 6.42426 16.5757L9 14"
                  stroke="#000000"
                  stroke-width="1.5"
                  stroke-linecap="round"
                ></path>
                <path
                  d="M16 7L12 11"
                  stroke="#000000"
                  stroke-width="1.5"
                  stroke-linecap="round"
                ></path>
                <path
                  d="M7 12L11.5757 16.5757C11.8101 16.8101 12.1899 16.8101 12.4243 16.5757L22 7"
                  stroke="#000000"
                  stroke-width="1.5"
                  stroke-linecap="round"
                ></path>
              </svg>
            </button>
            <button
              onClick={() => setToggleState(0)}
              className="close-btn"
            >
              <svg
                width="28px"
                height="28px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                color="#000000"
                stroke-width="1.5"
                aria-label="CLOSE"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM9.70164 8.64124C9.40875 8.34835 8.93388 8.34835 8.64098 8.64124C8.34809 8.93414 8.34809 9.40901 8.64098 9.7019L10.9391 12L8.64098 14.2981C8.34809 14.591 8.34809 15.0659 8.64098 15.3588C8.93388 15.6517 9.40875 15.6517 9.70164 15.3588L11.9997 13.0607L14.2978 15.3588C14.5907 15.6517 15.0656 15.6517 15.3585 15.3588C15.6514 15.0659 15.6514 14.591 15.3585 14.2981L13.0604 12L15.3585 9.7019C15.6514 9.40901 15.6514 8.93414 15.3585 8.64124C15.0656 8.34835 14.5907 8.34835 14.2978 8.64124L11.9997 10.9393L9.70164 8.64124Z"
                  fill="#000000"
                ></path>
              </svg>
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Users;
