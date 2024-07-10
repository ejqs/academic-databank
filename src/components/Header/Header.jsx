import React from "react";
import AuthButton from "@components/auth-button";
import config from "@/config";
import "./Header.css";

export default function Header() {
  return (
    <>
      {config.appName}
      <div className="container">
        <div className="items-1 item">1</div>
        <div className="items-2 item">2</div>
        <div className="items-3 item">3</div>
        <div className="items-4 item">4</div>
        <div className="items-5 item">5</div>
      </div>
      <AuthButton></AuthButton>
    </>
  );
}
