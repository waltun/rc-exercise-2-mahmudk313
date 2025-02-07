import { useState } from "react";

import "./App.css";

//import components
import Controls from "./Components/Controls";
import ListShow from "./Components/ListShow";
import AddBox from "./Components/AddBox";

function App() {
  const [addStatus, setAddStatus] = useState(false);
  const [usersState, setUsersState] = useState({
    users: [],
    usersListStatus: true,
  });

  //state changes here and get the props from AddBox component
  let addUser = (user) => {
    const date = new Date().toLocaleDateString("fa-IR");
    setUsersState((prevState) => {
      console.log(user);
      return {
        ...prevState,
        users: [
          ...prevState.users,
          {
            name: user.name,
            lastName: user.lastName,
            permission: user.permission,
            birthDate: user.birthDate,
            email: user.email,
            id: user.id,
            skill: user.skill,
            detail: user.detail,
            key: Date.now(),
            date: date,
          },
        ],
      };
    });
  };

  //changes the addStatus, get value from Controls component -> add Button
  const addStatusToggle = (status) => {
    setAddStatus(status);
  };

  let deleteUser = (key) => {
    setUsersState((prevState) => {
      return {
        ...prevState,
        users: prevState.users.filter((item) => item.key !== key),
      };
    });
  };

  let listShowToggle = (e) => {
    setUsersState((prevState) => {
      return {
        ...prevState,
        usersListStatus: !prevState.usersListStatus,
      };
    });
  };

  return (
    <main>
      <div className={addStatus ? "blur" : ""}>
        <Controls addStatus={addStatusToggle} listShowToggle={listShowToggle} />
        {usersState.usersListStatus ? (
          <ListShow state={usersState} delete={deleteUser} />
        ) : (
          ""
        )}
      </div>
      {addStatus ? <AddBox addStatus={addStatusToggle} add={addUser} /> : ""}
    </main>
  );
}

export default App;
