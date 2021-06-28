import React, { useEffect, useState } from "react";
import firebaseClient from "../firebaseClient";
import firebase from "firebase/app";
import Nav from "../components/nav";

export default function Login() {
  firebaseClient();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [phone, setPhone] = useState("");

  const handleClick = () => {
    var recaptcha = new firebase.auth.RecaptchaVerifier("recaptcha");
    let number = phone;
    firebase
      .auth()
      .signInWithPhoneNumber(number, recaptcha)
      .then(function (e) {
        var code = prompt("Enter the otp", "");

        if (code === null) return;

        e.confirm(code)
          .then(function (result) {
            console.log(result.user);

            document.querySelector("label").textContent +=
              result.user.phoneNumber + "Number verified";
          })
          .catch(function (error) {
            console.error(error);
          });
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <div>
      <Nav />
      <div className="bg-white shadow-md rounded px-8 pt-14 pb-8 mb-4 flex flex-col">
        <div className="bg-white shadow-md rounded px-8 pt-14 pb-8 mb-4 flex flex-col  text-grey-darker text-sm font-bold ">
          <label className="text-center pb-3">
            Enter Your Mobile Number To Sign-In
          </label>
          <div id="recaptcha"></div>
          <input
            className="text-center  shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
            placeholder="Mobile Number"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
          />
          <button
            className="text-center bg-red-700 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded pb-2"
            onClick={handleClick}
          >
            Get otp
          </button>
        </div>
        <div className="mb-4">
          <label
            className="block text-grey-darker text-sm font-bold mb-2"
            for="useremail"
          >
            UserEmail
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
            placeholder="Username"
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="email"
            value={email}
            aria-describedby="email-helper-text"
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-grey-darker text-sm font-bold mb-2"
            for="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
            placeholder="******************"
            onChange={(e) => setPass(e.target.value)}
            type="password"
            id="pass"
            value={pass}
            aria-describedby="password-helper-text"
          />
          <p className="text-red text-xs italic">Please choose a password.</p>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-700 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded"
            type="button"
            onClick={async () => {
              await firebase
                .auth()
                .createUserWithEmailAndPassword(email, pass)
                .then(function (firebaseUser) {
                  window.location.href = "/";
                })
                .catch(function (error) {
                  const message = error.message;
                });
            }}
          >
            Sign In
          </button>
          <a
            className="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker"
            href="#"
          >
            Forgot Password?
          </a>
        </div>
      </div>
    </div>
  );
}
