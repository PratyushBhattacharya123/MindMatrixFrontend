import React, { useState, useEffect } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { styles } from "@/styles/style";
import { useUpdatePasswordMutation } from "../../../redux/features/user/userApi";
import toast from "react-hot-toast";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setComfirmPassword] = useState("");
  const [updatePassword, { isSuccess, error }] = useUpdatePasswordMutation();

  const passwordChangeHandler = async (e: any) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      await updatePassword({ oldPassword, newPassword });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Password changed successfully");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);

  return (
    <div className="w-full pl-7 px-2 md:px-5 md:pl-0">
      <h1 className="block text-[25px] md:text-[30px] font-Poppins text-center font-[500] text-black dark:text-[#fff] pb-2">
        Change Password
      </h1>
      <div className="w-full">
        <form
          onSubmit={passwordChangeHandler}
          className="flex flex-col items-center"
        >
          <div className="w-[100%] md:w-[60%] mt-5">
            <Label className="block pb-1">Enter your old password</Label>
            <Input
              type="text"
              className={`${styles.input} !w-[95%]`}
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div className="w-[100%] md:w-[60%] mt-4">
            <Label className="block pb-1">Enter your new password</Label>
            <Input
              type="password"
              className={`${styles.input} !w-[95%]`}
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="w-[100%] md:w-[60%] mt-4">
            <Label className="block pb-1">Enter your confirm password</Label>
            <Input
              type="text"
              className={`${styles.input} !w-[95%]`}
              required
              value={confirmPassword}
              onChange={(e) => setComfirmPassword(e.target.value)}
            />
            <Input
              type="submit"
              className="w-[95%] md:w-[250px] h-[40px] flex items-center justify-center text-center dark:text-[#fff] text-black rounded-[6px] mt-8 cursor-pointer bg-gradient-to-r dark:from-slate-300/70 dark:to-slate-500/70 font-semibold from-gray-300/30 to-gray-900/50"
              required
              value="Update"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
