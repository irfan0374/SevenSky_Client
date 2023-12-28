import React, { useEffect, useRef, useState } from "react";
import Loading from "../../../Component/Loading/Loading";
import LoginPage from "../../../Component/userComponent.js/LoginPage";
import SignupPage from "../../../Component/userComponent.js/SignupPage";

import {
  Tabs,
  TabsHeader,
  Tab,
  TabsBody,
  TabPanel,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
} from "@heroicons/react/24/solid";

export function RegisterPage() {

  const data = [
    {
      label: "Login",
      value: "Login",
      icon: UserCircleIcon,
      desc:
        <LoginPage />
    },
    // SIGNUP FROM
    {
      label: "SignUp",
      value: "SignUp",
      icon: UserCircleIcon,
      desc:
        <SignupPage />

    },

  ];
  return (
    <Tabs value="Login">
      <TabsHeader className="w-96 mx-auto flex justify-center">
        {data.map(({ label, value, icon }) => (
          <Tab
            key={value}
            value={value}
            className="w-40"
          >
            <div className="flex items-center gap-2">
              {React.createElement(icon, { className: "w-5 h-5" })}
              {label}
            </div>
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        {data.map(({ value, desc }) => (
          <TabPanel key={value} value={value}>
            {desc}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
}