import React, { useState } from "react";
import { useParams } from "react-router-dom";
import CryptoJS from "crypto-js";

const ClassOwnerDetail = () => {
  const { classId } = useParams();

  const bytes = CryptoJS.AES.decrypt(
    decodeURIComponent(classId),
    "secret-key-123"
  );

  const decryptedClassId = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

  return (
    <>
      <br />
      <br />
      {/* <div>{decryptedClassId}</div> */}
    </>
  );
};

export default ClassOwnerDetail;
